import { describe, it, expect, beforeEach, vi } from 'vitest';
import { Elemental } from '../src/index';
import { ClassArray } from '../src/ClassArray';
import { ElementalArray } from '../src/ElementalArray';

describe('ElementalArray', () => {
  let elementalArray: ElementalArray<any>;
  let elemental: Elemental<any>;

  beforeEach(() => {
    elemental = new Elemental('div', new ClassArray(), {});
    elementalArray = new ElementalArray([elemental]);
  });

  it('replaces classes correctly', () => {
    elementalArray.replaceClasses('old-class', 'new-class');
    expect(elemental.getElement().classList.contains('new-class')).toBe(true);
  });

  it('updates elements correctly', () => {
    const newClasses = new ClassArray('updated-class');
    const newAttributes = { 'data-test': 'value' };
    elementalArray.updateElements(newClasses, newAttributes);
    expect(elemental.getElement().classList.contains('updated-class')).toBe(true);
    expect(elemental.getElement().getAttribute('data-test')).toBe('value');
  });

  it('attaches event listeners correctly', () => {
    const mockFunc = vi.fn();
    elementalArray.on('click', mockFunc);
    elemental.getElement().click();
    expect(mockFunc).toHaveBeenCalled();
  });

  it('removes event listeners correctly', () => {
    const mockFunc = vi.fn();
    elementalArray.on('click', mockFunc);
    elementalArray.off('click', mockFunc);
    elemental.getElement().click();
    expect(mockFunc).not.toHaveBeenCalled();
  });

  it('gets element at specific index correctly', () => {
    const secondElemental = new Elemental('span', new ClassArray(), {});
    elementalArray.add(secondElemental);
    expect(elementalArray.get(1)).toBe(secondElemental);
  });

  it('checks if it contains a specific child correctly', () => {
    const child = new Elemental('span', new ClassArray(), {});
    elemental.append(child);
    expect(elementalArray.contains(child)).toBe(true);
  });
});
