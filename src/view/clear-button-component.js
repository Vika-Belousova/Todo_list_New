import { createElement } from '../framework/render.js';

function createClearButtonTemplate() {
  return `<button class="clear-button">Очистить корзину</button>`;
}

export default class ClearButtonComponent {
  constructor() {
    this.element = null;
  }

  getTemplate() {
    return `<button class="clear-button">Очистить корзину</button>`;
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
