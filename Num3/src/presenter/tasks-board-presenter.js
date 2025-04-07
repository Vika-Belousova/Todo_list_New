import HeaderComponent from '../view/header-component.js';
import FormAddTaskComponent from '../view/form-add-task-component.js';
import TaskListComponent from '../view/tasklist-component.js';
import TaskComponent from '../view/task-component.js';
import ClearButtonComponent from '../view/clear-button-component.js';
import { render, RenderPosition } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TaskBoardPresenter {
  constructor({ bodyContainer, boardContainer, taskModel }) {
    this.bodyContainer = bodyContainer; 
    this.boardContainer = boardContainer;
    this.taskModel = taskModel;
  }

  init() {
    render(new HeaderComponent(), this.bodyContainer, RenderPosition.BEFOREBEGIN);

    render(new FormAddTaskComponent(), this.bodyContainer, RenderPosition.AFTERBEGIN);

    const tasks = this.taskModel.getTasks();

    Object.keys(Status).forEach((statusKey) => {
      const status = Status[statusKey];
      const filteredTasks = tasks.filter(task => task.status === status);

      const taskList = new TaskListComponent(StatusLabel[status]);
      taskList.getElement().classList.add(status);
      render(taskList, this.boardContainer);

      filteredTasks
        .filter(task => task && task.title && task.title !== 'undefined')
        .forEach((task) => {
          const taskComponent = new TaskComponent(task.title);
          render(taskComponent, taskList.getElement().querySelector('.desc-list'));
        });
      if (status === Status.BASKET) {
        render(new ClearButtonComponent(), taskList.getElement(), RenderPosition.BEFOREEND);
      }
    });
  }
}