import { ClassArray } from './ClassArray';
import { Elemental } from '.';
import { AttributeObject, InputType, ListType } from './types';

export class ElementalFactory {
  static DIV = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLDivElement>('div', classes, attributes);

  static SPAN = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLSpanElement>('span', classes, attributes);

  static H1 = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLHeadingElement>('h1', classes, attributes);

  static H2 = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLHeadingElement>('h2', classes, attributes);

  static H3 = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLHeadingElement>('h3', classes, attributes);

  static H4 = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLHeadingElement>('h4', classes, attributes);

  static BUTTON = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLButtonElement>('button', classes, attributes);

  static INPUT = (inputType: InputType, classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLInputElement>('input', classes, { type: inputType, ...attributes });

  static LIST = (listType: ListType, classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLUListElement | HTMLOListElement>(listType, classes, attributes);

  static LIST_ITEM = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLLIElement>('li', classes, attributes);

  static LABEL = (classes: ClassArray, attributes: AttributeObject = {}) => new Elemental<HTMLLabelElement>('label', classes, attributes);
}

