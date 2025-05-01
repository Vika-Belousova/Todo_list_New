
import { AbstractComponent } from '../framework/view/abstract-component.js';

function createFormAddTaskComponentTemplate() {
  return `
    <form class="container_input">
      <div class="container_title">Новая задача</div>
      <input id="add-task" type="text" placeholder="Название задачи" required>
      <button type="submit" class="add">+ Добавить</button>
    </form>
  `;
}

export default class FormAddTaskComponent extends AbstractComponent {
  #onAddTask = null;

  constructor(onAddTask) {
    super();
    this.#onAddTask = onAddTask;
    this.#setSubmitHandler();
  }

  get template() {
    return createFormAddTaskComponentTemplate();  
  }

  #setSubmitHandler() {
    this.element.addEventListener('submit', (evt) => {
      evt.preventDefault();
      const inputElement = this.element.querySelector('input');
      const taskName = inputElement.value.trim();
      
      if (taskName) {
        this.#onAddTask(taskName);
        inputElement.value = '';
      }
    });
  }
}