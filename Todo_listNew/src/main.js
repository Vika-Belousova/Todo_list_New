import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TaskListComponent from './view/tasklist-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';


const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);


const formAddTaskComponent = new FormAddTaskComponent(() => {});
render(formAddTaskComponent, bodyContainer, RenderPosition.AFTERBEGIN);


const taskBoard = new TaskBoardComponent();
render(taskBoard, bodyContainer);


const blockTitles = Array(4).fill('Название блока');

blockTitles.forEach((title) => {
  const taskList = new TaskListComponent(title);
  render(taskList, taskBoardContainer);

  for (let i = 1; i <= 4; i++) {
    const taskDescription = `Название задачи ${i}`;
    const task = new TaskComponent(taskDescription);
    render(task, taskList.getElement().querySelector('.desc-list'));
  }
});
