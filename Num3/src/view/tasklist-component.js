import { createElement } from '../framework/render.js';

function createTaskListComponentTemplate(title) {
  return `
    <li class="block_wrap">
      <ul class="wrap_title">${title}</ul>
      <ul class="desc-list"></ul>
    </li>
  `;
}

export default class TaskListComponent {
  constructor(title) {
    this.title = title;
  }

  getTemplate() {
    return createTaskListComponentTemplate(this.title);
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
