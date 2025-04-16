import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate() {
  return `<button class="clear-button">Очистить корзину</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
  #onClearCart = null;

  constructor(onClear) {
    super();
    this.#onClearCart = onClear;
    this.#setClickHandler();
  }

  get template() {
    return createClearButtonTemplate();
  }

  #setClickHandler() {
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      this.#onClearCart();
    });
  }
}