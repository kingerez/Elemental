export class Task {
  id: string;
  done: boolean;
  text: string;

  constructor(text: string) {
    this.text = text;
    this.id = `task-${Math.floor(Math.random() * 10000)}`;
    this.done = false;
  }
}