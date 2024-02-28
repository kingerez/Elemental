import { ClassArray } from './ClassArray';
import { AttributeObject } from './types';

export class ElementUtils {
  static updateElement(element: HTMLElement, classes: ClassArray, attributes: AttributeObject) {
    element.className = classes.join(' ');
    
    Object.entries(attributes).forEach(([key, value]) => {
      element.setAttribute(key, value);
    });
  }

  static setText(element: HTMLElement, text: string) {
    element.textContent = text;
  }

  static setInnerHTML(element: HTMLElement, html: string) {
    element.innerHTML = html;
  }

  static replaceClasses(element: HTMLElement, remove: ClassArray | string, add: ClassArray | string) {
    element.classList.remove(...ClassArray.from(remove));
    element.classList.add(...ClassArray.from(add));
  }
}