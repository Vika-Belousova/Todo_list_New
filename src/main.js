import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';

const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');

const taskModel = new TaskModel();
const taskBoardPresenter = new TaskBoardPresenter({
  bodyContainer,
  boardContainer: taskBoardContainer,
  taskModel,
});

taskBoardPresenter.init();