// src/view/task-component.js
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  if (!task?.title) return '';
  return `<li class="desc">${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  #task;

  constructor(task) {
    super();
    this.#task = task;
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }
}
