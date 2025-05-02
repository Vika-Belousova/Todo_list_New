// src/view/clear-button-component.js
import { AbstractComponent } from '../framework/view/abstract-component.js';

export default class ClearButtonComponent extends AbstractComponent {
  #isDisabled = false;

  constructor({ onClick, isDisabled = false }) {
    super();
    this.#isDisabled = isDisabled;
    this.#setClickHandler(onClick);
  }

  get template() {
    return `
      <button class="clear-button ${this.#isDisabled ? 'clear-button--disabled' : ''}">
        Очистить корзину
      </button>
    `;
  }

  updateDisabledState(isDisabled) {
    this.#isDisabled = isDisabled;
    this.element.classList.toggle('clear-button--disabled', isDisabled);
  }

  #setClickHandler(handler) {
    this.element.addEventListener('click', (evt) => {
      evt.preventDefault();
      if (!this.#isDisabled && handler) {
        handler();
      }
    });
  }
}
