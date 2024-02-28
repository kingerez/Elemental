import { Elemental } from '.';
import { ClassArray } from './ClassArray';
import { AttributeObject } from './types';

export class ElementalArray<T> extends Set<Elemental<T>> {
  constructor(args: Elemental<any>[] = []) {
    super(args);
  }

  replaceClasses(remove: string | string[], add: string | string[]) {
    this.forEach((element) => element.replaceClasses(remove, add));
    return this;
  }

  updateElements(classes: ClassArray, attributes: AttributeObject) {
    this.forEach((element) => element.update(classes, attributes));
    return this;
  }

  on(event: string, func: () => void) {
    this.forEach((element) => element.on(event, func));
    return this;
  }

  off(event: string, func: () => void) {
    this.forEach((element) => element.off(event, func));
    return this;
  }

  get(index: number): Elemental<T> | undefined {
    return Array.from(this)[index];
  }

  contains(child: Elemental<any>): boolean {
    for (const item of this) {
      if(item === child || item.children.contains(child)) {
        return true;
      }
    }

    return false;
  }
}