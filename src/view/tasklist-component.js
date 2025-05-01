import { AbstractComponent } from '../framework/view/abstract-component.js';

function createTaskListComponentTemplate(title) {
  return `
    <li class="block_wrap">
      <ul class="wrap_title">${title}</ul>
      <ul class="desc-list"></ul>
    </li>
  `;
}

export default class TaskListComponent extends AbstractComponent {
  #title;

  constructor(title) {
    super();
    this.#title = title;
  }

  get template() {
    return createTaskListComponentTemplate(this.#title);
  }

  setDropHandlers(onDrop) {
    const list = this.element.querySelector('.desc-list');

    list.addEventListener('dragover', (evt) => {
      evt.preventDefault();
      const afterElement = this.#getDragAfterElement(list, evt.clientY);
      const dragging = document.querySelector('.dragging');
      if (!dragging) return;

      if (afterElement === null) {
        list.appendChild(dragging);
      } else {
        list.insertBefore(dragging, afterElement);
      }
    });

    list.addEventListener('drop', (evt) => {
      evt.preventDefault();
      const taskId = evt.dataTransfer.getData('text/plain');
      const droppedElements = [...list.querySelectorAll('.desc')];
      const newIndex = droppedElements.findIndex((el) => el.dataset.id === taskId);
      onDrop(taskId, newIndex);
    });
  }

  #getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.desc:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
      const box = child.getBoundingClientRect();
      const offset = y - box.top - box.height / 2;

      if (offset < 0 && offset > closest.offset) {
        return { offset, element: child };
      } else {
        return closest;
      }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
  }
}