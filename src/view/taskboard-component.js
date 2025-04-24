import { createElement } from '../framework/render.js';

function createTaskComponentTemplate(title) {
  if (!title || title === 'undefined') { 
    return '';
  }
  return `<li class="desc">${title}</li>`;
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
      const template = this.getTemplate();
      if (!template) return null; 
      this.element = createElement(template);
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}
