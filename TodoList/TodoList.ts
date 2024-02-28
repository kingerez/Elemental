import { Elemental, RefObject } from '../src';
import { ElementalFactory } from '../src/ElementalFactory';
import { createListItem } from './TodoItem';
import { Task } from './Task';

const tasks: Task[] = [];

const inputRef = new RefObject<HTMLInputElement>();
const listRef = new RefObject<HTMLUListElement>();

const onClickTodoItem = (task: Task, element: Elemental<any>) => {
  task.done = !task.done;
  if(task.done) {
    element.replaceClasses('unchecked', 'checked');
  } else {
    element.replaceClasses('checked', 'unchecked');
  }
};

const onAddTask = () => {
  const value = inputRef.element?.getValue();
  if(value === '' || typeof value === 'undefined') return;

  inputRef.element?.setValue('');

  const task = new Task(value);

  const todoItem = createListItem(task);
  listRef.element?.append(todoItem);

  todoItem.on('click', () => onClickTodoItem(task, todoItem));

  todoItem.onUnmount = () => {
    const index = tasks.indexOf(task);
    tasks.splice(index, 1);
  }

  tasks.push(task);
};

export const todoList = ElementalFactory.DIV(['todoContainer']).append([
  ElementalFactory.H1([]).text('TODO list'),
  ElementalFactory.INPUT('text', [], { placeholder: 'Add a new task' }).ref(inputRef),
  ElementalFactory.BUTTON([]).text('Add task').on('click', onAddTask),
  ElementalFactory.LIST('ul', [], { id: 'taskList' }).ref(listRef),
]);