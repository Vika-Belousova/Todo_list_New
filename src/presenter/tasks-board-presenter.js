import TaskListComponent from '../view/tasklist-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import EmptyComponent from '../view/empty-component.js';
import TaskComponent from '../view/task-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';

export default class TaskBoardPresenter {
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];
  #isInitialized = false;
  #clearButton = null;

  constructor({ boardContainer, taskModel }) {
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#taskModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    if (this.#isInitialized) return;
    this.#isInitialized = true;
    await this.#taskModel.init();
  }

  #handleModelEvent(updateType) {
    
    this.#boardTasks = [...this.#taskModel.tasks];
    
    switch (updateType) {
      case UpdateType.INIT:
      case UpdateType.MAJOR:
        this.#renderFullBoard();
        break;
      default:
        this.#updateView();
    }
  }

  #updateView() {
    this.#updateClearButtonState();
    this.#rerenderBoard();
  }

  #updateClearButtonState() {
    if (!this.#clearButton) return;
    
    const isBasketEmpty = !this.#boardTasks.some(
      task => task.status === Status.BASKET
    );
    this.#clearButton.updateDisabledState(isBasketEmpty);
  }

  #renderFullBoard() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #rerenderBoard() {
    this.#clearBoard();
    this.#renderBoard();
  }

  #clearBoard() {
    this.#boardContainer.innerHTML = '';
  }

  #renderBoard() {
    Object.values(Status).forEach(status => {
      const tasks = this.#getTasksByStatus(status);
      this.#renderStatusColumn(tasks, status);
    });
  }

  #getTasksByStatus(status) {
    return this.#boardTasks.filter(t => t.status === status);
  }

  #renderStatusColumn(tasks, status) {
    const taskList = new TaskListComponent(StatusLabel[status]);
    taskList.element.classList.add(status);
    render(taskList, this.#boardContainer);

    this.#setupTaskListHandlers(taskList, status);
    this.#renderTasksOrStub(tasks, taskList.element);
    
    if (status === Status.BASKET) {
      this.#renderClearButton(tasks, taskList.element);
    }
  }

  #setupTaskListHandlers(taskList, status) {
    taskList.setDropHandlers((taskId, newIndex) => {
      this.#taskModel.updateTaskStatus(taskId, status, newIndex);
    });
  }

  #renderTasksOrStub(tasks, container) {
    tasks.length === 0 
      ? this.#renderEmptyStub(container)
      : tasks.forEach(task => this.#renderTask(task, container));
  }

  #renderTask(task, container) {
    render(
      new TaskComponent(task),
      container.querySelector('.desc-list')
    );
  }

  #renderEmptyStub(container) {
    render(
      new EmptyComponent(),
      container.querySelector('.desc-list')
    );
  }

  #renderClearButton(tasks, container) {
    this.#clearButton = new ClearButtonComponent({
      onClick: this.#handleClearBasket,
      isDisabled: tasks.length === 0
    });
    render(this.#clearButton, container, RenderPosition.BEFOREEND);
  }

  #handleClearBasket = () => {
    this.#taskModel.clearBasket();
  };
}
