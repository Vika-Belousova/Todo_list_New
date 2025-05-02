import { AbstractComponent } from '../framework/view/abstract-component.js';

function createClearButtonTemplate(isDisabled) {
  return `<button class="clear-button ${isDisabled ? 'clear-button--disabled' : ''}">Очистить корзину</button>`;
}

export default class ClearButtonComponent extends AbstractComponent {
  #onClearCart = null;
  #isDisabled = false;

  constructor(onClear, isDisabled = false) {
    super();
    this.#onClearCart = onClear;
    this.#isDisabled = isDisabled;
    this.#setClickHandler();
  }

  get template() {
    return createClearButtonTemplate(this.#isDisabled);
  }

  #setClickHandler() {
    this.element.addEventListener('click', (evt) => {
      if (this.#isDisabled) return;
      
      evt.preventDefault();
      this.#onClearCart();
    });
  }

  disable() {
    this.#isDisabled = true;
    this.element.classList.add('clear-button--disabled');
  }

  enable() {
    this.#isDisabled = false;
    this.element.classList.remove('clear-button--disabled');
  }
}
