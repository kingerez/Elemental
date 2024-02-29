# Elemental Library Documentation

## Overview
The Elemental Library is a lightweight, flexible JavaScript library for creating and managing HTML elements programmatically. It provides a fluent API for building complex user interfaces in a more expressive and less verbose way.

## Installation
To use Elemental in your project, you need to include the library in your project files:
```
yarn add @elementalui/elemental
```
or
```
npm install @elementalui/elemental
```

## Usage

### Class: Elemental<T>
The `Elemental` class is the core of the library, allowing the creation and manipulation of HTML elements.

#### Properties
- `type`: `ElementType` - The type of the HTML element.
- `parent`: `Elemental<any> | HTMLElement | null` - The parent of the element, which can be another `Elemental` instance or a regular HTML element.
- `children`: `ElementalArray<any>` - A collection of child `Elemental` instances.
- `onUnmount`: `undefined | ((element: Elemental<T>) => void)` - A function that is called when the element is unmounted.

#### Methods
- `constructor(type: ElementType, classes: ClassArray, attributes: AttributeObject)`: Creates a new `Elemental` instance with the specified type, classes, and attributes.
- `update(classes: ClassArray, attributes: AttributeObject)`: Updates the element with new classes and attributes.
- `text(text: string)`: Sets the text content of the element.
- `innerHTML(html: string)`: Sets the inner HTML of the element.
- `replaceClasses(remove: ClassArray | string, add: ClassArray | string)`: Replaces certain classes with new ones.
- `setAttribute(key: string, value: string)`: Sets an attribute on the element.
- `on(event: string, func: () => void)`: Adds an event listener to the element.
- `off(event: string, func: () => void)`: Removes an event listener from the element.
- `init(func: (element: Elemental<T>) => void)`: Initializes the element with a custom function.
- `getElement()`: Returns the underlying HTML element.
- `appendTo(parent: HTMLElement | Elemental<any>)`: Appends the element to a parent.
- `append(elementOrElements: Elemental<any> | Elemental<any>[])`: Appends one or more `Elemental` instances as children.
- `remove()`: Removes the element and its children from the DOM.
- `query(selector: string)`: Returns a collection of child elements that match the selector.
- `id(elementId: string)`: Sets the ID of the element.
- `ref(refObject: RefObject<T>)`: Associates the element with a reference object.
- `addRules(rules: Rule[])`: Add methods to be invoked when the elements' classes change.
- `removeRules(rules: Rule[])`: Removes CSS rules from the element.
- `getValue()`: Gets the value of the element if it's an input or textarea.
- `setValue(value: string)`: Sets the value of the element if it's an input or textarea.

## Examples
Take a look at the TODO app included in the repository for complete and concrete examples!

To create elements, you can use either the ElementalFactory class, or create them manually:
```
const app = ElementalFactory.DIV(['container']).append([
  ElementalFactory.H1(['title']).text('Elemental App'),
  ElementalFactory.P(['paragraph']).text('Hello World')
]);

app.appendTo(document.querySelector('#root'));
```

## Contributions
Contributions to the Elemental Library are welcome. Please follow the project's contribution guidelines for submitting issues or pull requests.

## License
Please refer to the project's license for usage rights and limitations.
