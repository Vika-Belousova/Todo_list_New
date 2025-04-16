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
  get template() {
    return createFormAddTaskComponentTemplate();
  }
}
