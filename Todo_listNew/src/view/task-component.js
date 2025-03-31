import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(description) {
  return `
    <li class="desc">${description}</li>
  `;
}

export default class TaskComponent {
  constructor(description) {
    this.description = description;
  }

  getTemplate() {
    return createTaskComponentTemplate(this.description);
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