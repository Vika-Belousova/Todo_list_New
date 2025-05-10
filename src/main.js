// src/main.js
import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import { render, RenderPosition } from './framework/render.js';

const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');

const taskModel = new TaskModel();

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formComponent = new FormAddTaskComponent();
formComponent.setAddTaskHandler((title) => {
  taskModel.addTask(title);
});
render(formComponent, bodyContainer, RenderPosition.AFTERBEGIN);
const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: taskBoardContainer,
  taskModel,
});
taskBoardPresenter.init();
