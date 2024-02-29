import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Elemental } from '../index';
import { ClassArray } from '../ClassArray';

describe('Elemental class', () => {
  let elemental: Elemental<any>;

  beforeEach(() => {
    // Setup for each test
    elemental = new Elemental('div', new ClassArray(), {});
  });

  it('creates an instance correctly', () => {
    expect(elemental).toBeInstanceOf(Elemental);
    expect(elemental.getElement().tagName).toBe('DIV');
  });

  it('updates classes and attributes correctly', () => {
    const classes = new ClassArray('class1', 'class2');
    const attributes = { 'data-test': 'value' };
    elemental.update(classes, attributes);

    expect(elemental.getElement().classList.contains('class1')).toBe(true);
    expect(elemental.getElement().getAttribute('data-test')).toBe('value');
  });

  it('sets text correctly', () => {
    const text = 'Hello World';
    elemental.text(text);
    expect(elemental.getElement().textContent).toBe(text);
  });

  it('appends to parent correctly', () => {
    const parent = document.createElement('div');
    elemental.appendTo(parent);
    expect(parent.firstChild).toBe(elemental.getElement());
  });

  it('sets innerHTML correctly', () => {
    const html = '<span>Test</span>';
    elemental.innerHTML(html);
    expect(elemental.getElement().innerHTML).toBe(html);
  });
  
  it('replaces classes correctly', () => {
    elemental.replaceClasses('old-class', 'new-class');
    expect(elemental.getElement().classList.contains('new-class')).toBe(true);
    expect(elemental.getElement().classList.contains('old-class')).toBe(false);
  });
  
  it('sets attribute correctly', () => {
    elemental.setAttribute('data-test', 'value');
    expect(elemental.getElement().getAttribute('data-test')).toBe('value');
  });
  
  it('adds and removes event listeners correctly', () => {
    const mockFunc = vi.fn();
    elemental.on('click', mockFunc);
    elemental.getElement().click();
    expect(mockFunc).toHaveBeenCalled();
  
    elemental.off('click', mockFunc);
    elemental.getElement().click();
    expect(mockFunc).toHaveBeenCalledTimes(1);
  });
  
  it('executes init function correctly', () => {
    const initFunc = vi.fn();
    elemental.init(initFunc);
    expect(initFunc).toHaveBeenCalledWith(elemental);
  });

  it('appends single and multiple elements correctly', () => {
    const child1 = new Elemental('div', new ClassArray(), {});
    const child2 = new Elemental('span', new ClassArray(), {});
  
    elemental.append(child1);
    expect(elemental.children.contains(child1)).toBe(true);
    expect(elemental.getElement().contains(child1.getElement())).toBe(true);
  
    elemental.append([child2]);
    expect(elemental.children.contains(child2)).toBe(true);
    expect(elemental.getElement().contains(child2.getElement())).toBe(true);
  });
  
  it('removes element correctly', () => {
    const parent = document.createElement('div');
    parent.appendChild(elemental.getElement());
    elemental.remove();
    expect(parent.contains(elemental.getElement())).toBe(false);
    expect(elemental.parent).toBeNull();
  });
  
  it('queries child elements correctly', () => {
    const child = new Elemental('div', new ClassArray(), {});
    elemental.append(child);
    const queryResult = elemental.query('div');
    expect(queryResult.contains(child)).toBe(true);
  });
  
  it('sets id correctly', () => {
    const id = 'test-id';
    elemental.id(id);
    expect(elemental.getElement().id).toBe(id);
  });
  
  it('sets ref correctly', () => {
    const refObject = { element: null };
    elemental.ref(refObject);
    expect(refObject.element).toBe(elemental);
  });
  
  it('adds and removes rules correctly', () => {
    const rule = {
      selectors: ['div'],
      action: () => {}
    };
    elemental.addRules([rule]);
    expect(elemental.rules.includes(rule)).toBe(true);
  
    elemental.removeRules([rule]);
    expect(elemental.rules.includes(rule)).toBe(false);
  });
  
  it('gets and sets value correctly for input elements', () => {
    const inputElemental = new Elemental('input', new ClassArray(), {});
    inputElemental.setValue('test');
    expect(inputElemental.getValue()).toBe('test');
  });
});
