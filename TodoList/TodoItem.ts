import { Elemental, Rule } from '../src';
import { ElementalFactory } from '../src/ElementalFactory';
import { Task } from './Task';

const toggleCheckRule = new Rule(['.checked', '.unchecked'], (selector: string, el: Elemental<HTMLLIElement>) => {
  const checkbox = el.query('.checkbox').get(0);
  checkbox?.text(selector === '.checked' ? 'check_box' : 'check_box_outline_blank');
});

export const createListItem = (task: Task) => {
  const listItem = ElementalFactory.LIST_ITEM(['unchecked']).id(`${task.id}`).addRules([toggleCheckRule]).append([
    ElementalFactory.SPAN(['material-symbols-outlined checkbox']).text('check_box_outline_blank'),
    ElementalFactory.LABEL([]).text(task.text),
    ElementalFactory.SPAN(['spacing']),
    ElementalFactory.BUTTON(['material-symbols-outlined deleteButton']).text('delete').on('click', () => listItem.remove()),
  ]);

  return listItem;
};
