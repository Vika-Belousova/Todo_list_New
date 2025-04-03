import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import ClearButtonComponent from './view/clear-button-component.js';
import { render, RenderPosition } from './framework/render.js';
import TaskModel from './model/task-model.js';

const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');

const taskModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: taskBoardContainer,
  taskModel,
});

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);
render(new FormAddTaskComponent(), bodyContainer, RenderPosition.AFTERBEGIN);
render(new TaskBoardComponent(), bodyContainer);
render(new ClearButtonComponent(), bodyContainer, RenderPosition.BEFOREEND);

taskBoardPresenter.init();
