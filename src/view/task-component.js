// task-component.js
import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(title) {
  if (!title || title === 'undefined') {
    return ''; 
  }
  return `<li class="desc">${title}</li>`;
}

export default class TaskComponent {
  constructor(description) {  
    this.description = description && description !== 'undefined' ? description : ''; 
  }

  getTemplate() {
    return createTaskComponentTemplate(this.description);
  }

  getElement() {
    if (!this.description) {
      return null; 
    }
    if (!this.element) {
      this.element = createElement(this.getTemplate());
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}