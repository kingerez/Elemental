import { Elemental } from '.';

export class RefObject<T> {
  element: Elemental<T> | null = null;
  
  constructor(element?: Elemental<T>) {
    if (element) {
      this.element = element;
    }
  }
}
