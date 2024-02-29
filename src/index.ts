import { ClassArray } from './ClassArray';
import { ElementUtils } from './ElementUtils';
import { ElementalArray } from './ElementalArray';
import { RefObject } from './RefObject';
import { AttributeObject, ElementType, Rule } from './types';

export type { InputType, AttributeObject, ElementType } from './types';
export { ElementalFactory } from './ElementalFactory';
export { RefObject } from './RefObject';
export { Rule } from './types';

export class Elemental<T> {
  type: ElementType;

  parent: Elemental<any> | HTMLElement | null = null;

  children: ElementalArray<any> = new ElementalArray();

  onUnmount: undefined | ((element: Elemental<T>) => void);

  #element: HTMLElement;

  #isRoot: boolean = false;

  #rules: Rule[] = [];

  get rules() {
    return [...this.#rules];
  }

  constructor(type: ElementType, classes: ClassArray, attributes: AttributeObject) {
    this.type = type;

    this.#element = document.createElement(type);
    this.update(classes, attributes);
  }

  #executeRules() {
    this.#rules.forEach((rule) => {
      rule.selectors.forEach(selector => {
        if(this.#element.matches(selector)) {
          rule.action(selector, this);
        }
      });
    });
  }

  update(classes: ClassArray, attributes: AttributeObject) {
    ElementUtils.updateElement(this.#element, classes, attributes);
    this.#executeRules();
    return this;
  }

  text(text: string) {
    ElementUtils.setText(this.#element, text);
    return this;
  }

  innerHTML(html: string) {
    ElementUtils.setInnerHTML(this.#element, html);
    return this;
  }

  replaceClasses(remove: ClassArray | string, add: ClassArray | string) {
    ElementUtils.replaceClasses(this.#element, remove, add);
    this.#executeRules();
    return this;
  }

  setAttribute(key: string, value: string) {
    this.#element.setAttribute(key, value);
    this.#executeRules();
    return this;
  }

  on(event: string, func: () => void) {
    this.#element.addEventListener(event, func);
    return this;
  }

  off(event: string, func: () => void) {
    this.#element.removeEventListener(event, func);
    return this;
  }

  init(func: (element: Elemental<T>) => void) {
    func(this);
    return this;
  }

  getElement() {
    return this.#element;
  }

  appendTo(parent: HTMLElement | Elemental<any>) {
    this.parent = parent;
    this.#isRoot = parent instanceof Elemental;
    if(parent instanceof Elemental) {
      parent.children.add(this);
      parent.#element.appendChild(this.#element);
    } else {
      parent.appendChild(this.#element);
    }
    return this;
  }

  append(elementOrElements: Elemental<any> | Elemental<any>[]) {
    if (Array.isArray(elementOrElements)) {
      elementOrElements.forEach((element) => {
        element.appendTo(this);
        this.children.add(element);
      });
    } else {
      elementOrElements.appendTo(this);
      this.children.add(elementOrElements);
    }

    return this;
  }

  remove() {
    this.#element.remove();
    this.children.forEach((child) => child.remove());
    
    if (!this.#isRoot && this.parent instanceof Elemental) {
      this.parent.children = new ElementalArray(Array.from(this.parent.children).filter((child) => child !== this));
    }
    
    this.parent = null;

    if(typeof this.onUnmount === 'function') {
      this.onUnmount(this);
    }

    return this;
  }

  query(selector: string): ElementalArray<any> {
    const retVal = new ElementalArray();
    
    for(const child of this.children) {
      if(child instanceof Elemental) {
        if(child.getElement().matches(selector))
          retVal.add(child);

        if(child.children.size > 0) {
          child.query(selector).forEach(element => retVal.add(element));
        }
      }
    }

    return retVal;
  }

  id(elementId: string) {
    this.#element.id = elementId;
    return this;
  }

  ref(refObject: RefObject<T>) {
    refObject.element = this;
    return this;
  };

  addRules(rules: Rule[]) {
    this.#rules.push(...rules);
    return this;
  }

  removeRules(rules: Rule[]) {
    this.#rules = this.#rules.filter((rule) => !rules.includes(rule));
    return this;
  }

  getValue() {
    if((this.#element instanceof HTMLInputElement) || (this.#element instanceof HTMLTextAreaElement)) {
      return this.#element.value;
    }

    return '';
  }

  setValue(value: string) {
    if((this.#element instanceof HTMLInputElement) || (this.#element instanceof HTMLTextAreaElement)) {
      this.#element.value = value;
    }

    return this;
  }
}
