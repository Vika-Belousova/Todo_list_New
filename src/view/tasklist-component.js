// src/view/tasklist-component.js
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(title) {
  return `
    <li class="block_wrap">
      <ul class="wrap_title">${title}</ul>
      <ul class="desc-list"></ul>
    </li>
  `;
}

export default class TaskListComponent extends AbstractComponent {
  #title;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createTaskListComponentTemplate(this.#title);
  }
}
