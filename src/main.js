
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import TasksApiService from './tasks-api-service.js';

const END_POINT = 'https://680b30f9d5075a76d98a2587.mockapi.io';
const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');

const tasksApiService = new TasksApiService(END_POINT);
const taskModel = new TaskModel({ tasksApiService });

const taskBoardPresenter = new TaskBoardPresenter({
  bodyContainer,
  boardContainer: taskBoardContainer,
  taskModel,
});

taskBoardPresenter.init();
