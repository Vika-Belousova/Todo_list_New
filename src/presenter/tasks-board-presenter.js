import HeaderComponent from '../view/header-component.js';
import FormAddTaskComponent from '../view/form-add-task-component.js';
import TaskListComponent from '../view/tasklist-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import EmptyComponent from '../view/empty-component.js';
import TaskComponent from '../view/task-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { Status, StatusLabel, UserAction, UpdateType } from '../const.js';

export default class TaskBoardPresenter {
  #bodyContainer = null;
  #boardContainer = null;
  #taskModel = null;
  #boardTasks = [];
  #isInitialized = false;

  constructor({ bodyContainer, boardContainer, taskModel }) {
    this.#bodyContainer = bodyContainer;
    this.#boardContainer = boardContainer;
    this.#taskModel = taskModel;

    this.#taskModel.addObserver(this.#handleModelEvent.bind(this));
  }

  async init() {
    if (this.#isInitialized) return;
    this.#isInitialized = true;

    render(new HeaderComponent(), this.#bodyContainer, RenderPosition.BEFOREBEGIN);
    render(
      new FormAddTaskComponent(this.#handleAddTask.bind(this)), 
      this.#bodyContainer, 
      RenderPosition.AFTERBEGIN
    );

    await this.#taskModel.init(); 
  }

  #handleModelEvent(updateType, payload) {
    console.log('Обработка события:', updateType, payload);
    
    switch (updateType) {
      case UpdateType.INIT:
        this.#boardTasks = [...this.#taskModel.tasks];
        this.#renderFullBoard(); 
        break;
      case UserAction.ADD_TASK:
        this.#handleAddTaskSuccess(payload); 
        break;
      case UserAction.DELETE_TASK:
        this.#handleDeleteTask(payload); 
        break;
      case UserAction.UPDATE_TASK:
        this.#handleUpdateTask(payload); 
        break;
      case UpdateType.PATCH:
      case UpdateType.MINOR:
        this.#boardTasks = [...this.#taskModel.tasks];
        this.#rerenderBoard();
        break;
      case UpdateType.MAJOR:
        this.#boardTasks = [...this.#taskModel.tasks];
        this.#renderFullBoard();
        break;
    }
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
      const tasks = this.#boardTasks.filter(t => t.status === status);
      this.#renderTasksList(tasks, status);
    });
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
      tasks.forEach(task => this.#renderTask(task, taskList.element));
    }

    if (status === Status.BASKET) {
      const isBasketEmpty = tasks.length === 0;
      render(
        new ClearButtonComponent(this.#handleClearBasket, isBasketEmpty), 
        taskList.element, 
        RenderPosition.BEFOREEND
      );
    }
  }

  #renderTask(task, container) {
    const taskComponent = new TaskComponent(task);
    render(taskComponent, container.querySelector('.desc-list'));
  }

  #renderEmptyStub(container) {
    const emptyComponent = new EmptyComponent();
    render(emptyComponent, container.querySelector('.desc-list'));
  }


  #handleAddTask(title) {
    this.#taskModel.addTask(title)
      .then(task => console.log('Задача добавлена:', task))
      .catch(err => console.error('Ошибка:', err));
  }

  #handleAddTaskSuccess(newTask) {
    this.#boardTasks = [...this.#taskModel.tasks];
    this.#rerenderBoard();
  }

  #handleDeleteTask(payload) {
    console.log(`Удалено задач: ${payload?.deletedCount || 0}`);
    this.#boardTasks = [...this.#taskModel.tasks];
    this.#rerenderBoard();
  }

  #handleUpdateTask(updatedTask) {
    this.#boardTasks = [...this.#taskModel.tasks];
    this.#rerenderBoard();
  }

  #handleClearBasket = () => {
    this.#taskModel.clearBasket();
  };
}
