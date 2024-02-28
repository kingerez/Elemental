import './styles.css';
import { todoList } from './TodoList';

const div = document.querySelector('#app') as HTMLDivElement;

if(!div) {
  throw new Error('No div found with id app');
}

todoList.appendTo(div);
