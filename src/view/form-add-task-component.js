// src/view/form-add-task-component.js
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="container_input">
      <div class="container_title">Новая задача</div>
      <input type="text" placeholder="Название задачи">
      <button class="add">+ Добавить</button>
    </div>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #onAddTask;

  constructor(onAddTask) {
    super();
    this.#onAddTask = onAddTask;
  }

  get template() {
    return createFormAddTaskComponentTemplate();
  }

  get element() {
    const element = super.element;

    const inputElement = element.querySelector('input');
    const buttonElement = element.querySelector('button');

    buttonElement.addEventListener('click', () => {
      const taskName = inputElement.value.trim();
      if (taskName) {
        this.#onAddTask(taskName);
        inputElement.value = '';
      }
    });

    return element;
  }
}
