// src/view/form-add-task-component.js
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <form class="container_input">
      <div class="container_title">Новая задача</div>
      <input type="text" placeholder="Название задачи" required>
      <button type="submit" class="add">+ Добавить</button>
    </form>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  constructor() {
    super();
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  setAddTaskHandler(handler) {
    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const input = this.element.querySelector('input');
      const title = input.value.trim();
      if (title) {
        handler(title);
        input.value = '';
      }
    });
  }
}
