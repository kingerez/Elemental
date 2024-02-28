export class ClassArray extends Array<string> {
  static from(classes: string | string[]) {
    return new ClassArray(...(Array.isArray(classes) ? classes : [classes]));
  }

  constructor(...args: string[]) {
      super(...args);
  }
}