import HeaderComponent from './view/header-component.js';
import FormAddTaskComponent from './view/form-add-task-component.js';
import TaskBoardComponent from './view/taskboard-component.js';
import TaskListComponent from './view/tasklist-component.js';
import TaskComponent from './view/task-component.js';
import { render, RenderPosition } from './framework/render.js';


const bodyContainer = document.querySelector('.container');
const taskBoardContainer = document.querySelector('.container_block');


render(new HeaderComponent(), bodyContainer, RenderPosition.BEFOREBEGIN);


const formAddTaskComponent = new FormAddTaskComponent((taskName) => {
  addTaskToBacklog(taskName); 
});
render(formAddTaskComponent, bodyContainer, RenderPosition.AFTERBEGIN);


const taskBoard = new TaskBoardComponent();
render(taskBoard, bodyContainer);


const taskListsData = [];

const blockTitles = [];
for (let i = 0; i < 4; i++) {
  blockTitles.push('Название блока');
}


blockTitles.forEach((title) => {
  const tasks = [];
  for (let i = 1; i <= 4; i++) {
    tasks.push(`Название первой задачи `);
  }
  taskListsData.push({ title, tasks });
});


taskListsData.forEach(({ title, tasks }) => {
  const taskList = new TaskListComponent(title);
  render(taskList, taskBoardContainer);

  tasks.forEach((description) => {
    const task = new TaskComponent(description);
    render(task, taskList.getElement().querySelector('.desc-list'));
  });
});


function addTaskToBacklog(taskName) {
  const backlogList = taskListsData[0].tasks; 
  backlogList.push(taskName);


  updateTaskBoard();
}


function updateTaskBoard() {
  taskBoardContainer.innerHTML = ''; 
  taskListsData.forEach(({ title, tasks }) => {
    const taskList = new TaskListComponent(title);
    render(taskList, taskBoardContainer);

    tasks.forEach((description) => {
      const task = new TaskComponent(description);
      render(task, taskList.getElement().querySelector('.desc-list'));
    });
  });
}