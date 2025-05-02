import HeaderComponent from '../view/header-component.js';
import FormAddTaskComponent from '../view/form-add-task-component.js';
import TaskListComponent from '../view/tasklist-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import EmptyComponent from '../view/empty-component.js';
import TaskComponent from '../view/task-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TaskBoardPresenter {
  #bodyContainer = null;
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];

  constructor({ bodyContainer, boardContainer, taskModel }) {
    this.#bodyContainer = bodyContainer;
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;
    this.#taskModel.addObserver(this.#handleModelChange.bind(this));
  }

  init() {
    this.#boardTasks = this.#taskModel.tasks;
    this.#renderBoard();
  }

  #handleModelChange() {
    this.#boardTasks = this.#taskModel.tasks;
    this.#rerenderBoard();
  }

  #handleClearBasket = () => {
    this.#taskModel.clearBasket();
  };

  #rerenderBoard() {
    this.#boardContainer.innerHTML = '';
    this.#renderBoard();
  }

  #renderBoard() {
    Object.keys(Status).forEach((statusKey) => {
      const status = Status[statusKey];
      const tasksByStatus = this.#boardTasks.filter((task) => task.status === status);
      this.#renderTasksList(tasksByStatus, status);
    });
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container.querySelector('.desc-list'));
  }

  #renderEmptyStub(container) {
    const emptyComponent = new EmptyComponent();
    render(emptyComponent, container.querySelector('.desc-list'));
  }

  #renderTasksList(tasks, status) {
    const taskList = new TaskListComponent(StatusLabel[status]);
    taskList.element.classList.add(status);
    render(taskList, this.#boardContainer);

    taskList.setDropHandlers((taskId, newIndex) => {
      this.#taskModel.updateTaskStatus(taskId, status, newIndex);
    });

    if (tasks.length === 0) {
      this.#renderEmptyStub(taskList.element);
    } else {
      tasks.forEach((task) => this.#renderTask(task, taskList.element));
    }

    if (status === Status.BASKET) {
      const isBasketEmpty = tasks.length === 0;
      render(new ClearButtonComponent(this.#handleClearBasket, isBasketEmpty), taskList.element, RenderPosition.BEFOREEND);
    }
  }
}
