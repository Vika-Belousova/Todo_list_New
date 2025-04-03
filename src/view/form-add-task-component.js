import { createElement } from '../framework/render.js';

function createFormAddTaskComponentTemplate() {
  return `
    <div class="container_input">
      <div class="container_title">Новая задача</div>
      <input type="text" placeholder="Название задачи">
      <button class="add">+ Добавить</button>
    </div>
  `;
}

export default class FormAddTaskComponent {
  constructor(onAddTask) {
    this.onAddTask = onAddTask;
  }

  getTemplate() {
    return createFormAddTaskComponentTemplate();
  }

  getElement() {
    if (!this.element) {
      this.element = createElement(this.getTemplate());
      this.inputElement = this.element.querySelector('input');
      this.buttonElement = this.element.querySelector('button');

      this.buttonElement.addEventListener('click', () => {
        const taskName = this.inputElement.value.trim();
        if (taskName) {
          this.onAddTask(taskName);
          this.inputElement.value = '';
        }
      });
    }
    return this.element;
  }

  removeElement() {
    this.element = null;
  }
}