import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';

import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');

const taskModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter({
  bodyContainer,
  boardContainer: taskBoardContainer,
  taskModel,
});


const headerComponent = new HeaderComponent();
render(headerComponent, bodyContainer, RenderPosition.BEFOREBEGIN);


const formComponent = new FormAddTaskComponent();
render(formComponent, bodyContainer, RenderPosition.AFTERBEGIN);



taskBoardPresenter.init();
