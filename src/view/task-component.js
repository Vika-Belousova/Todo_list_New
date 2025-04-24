import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskComponentTemplate(task) {
  return `<li class="desc" draggable="true" data-id="${task.id}">${task.title}</li>`;
}

export default class TaskComponent extends AbstractComponent {
  #task;

  constructor(task) {
    super();
    this.#task = task;
    this.#addDragHandlers();
  }

  get template() {
    return createTaskComponentTemplate(this.#task);
  }

  #addDragHandlers() {
    this.element?.addEventListener('dragstart', (evt) => {
      evt.dataTransfer.setData('text/plain', this.#task.id);
      this.element.classList.add('dragging');
    });

    this.element?.addEventListener('dragend', () => {
      this.element.classList.remove('dragging');
    });
  }
}