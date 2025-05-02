import HeaderComponent from './view/header-component.js';
import TaskBoardPresenter from './presenter/tasks-board-presenter.js';
import TaskModel from './model/task-model.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TasksApiService from './tasks-api-service.js';
import { render, RenderPosition } from './framework/render.js';

const END_POINT = 'https://680b30f9d5075a76d98a2587.mockapi.io';
const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');

if (!bodyContainer || !taskBoardContainer) {
  throw new Error('Не найдены необходимые DOM-элементы!');
}

const tasksApiService = new TasksApiService(END_POINT);
const taskModel = new TaskModel({ tasksApiService });

render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);

const formComponent = new FormAddTaskComponent();
formComponent.setAddTaskHandler((title) => {
  taskModel.addTask(title)
    .catch(error => console.error('Ошибка при добавлении задачи:', error));
});

render(formComponent, bodyContainer, RenderPosition.AFTERBEGIN);

const taskBoardPresenter = new TaskBoardPresenter({
  boardContainer: taskBoardContainer, 
  taskModel,
});

taskBoardPresenter.init();
