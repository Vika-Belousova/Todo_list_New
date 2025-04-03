import TaskListComponent from '../view/tasklist-component.js';
import TaskComponent from '../view/task-component.js';
import { render } from '../framework/render.js';
import { Status, StatusLabel } from '../const.js';

export default class TaskBoardPresenter {
  constructor({ boardContainer, taskModel }) {
    this.boardContainer = boardContainer;
    this.taskModel = taskModel;
  }

 init() {
  const tasks = this.taskModel.getTasks();

  const groupedTasks = {};

  tasks.forEach((task) => {
    if (!groupedTasks[task.status]) {
      groupedTasks[task.status] = [];
    }
    groupedTasks[task.status].push(task);
  });

  Object.keys(Status).forEach((statusKey) => {
    const status = Status[statusKey];
    const taskList = new TaskListComponent(StatusLabel[status]);
    taskList.getElement().classList.add(status); 
    render(taskList, this.boardContainer);

    (groupedTasks[status] || []).forEach((task) => {
      if (!task || !task.title || task.title === 'undefined') {
        return;
      }
      const taskComponent = new TaskComponent(task.title);
      render(taskComponent, taskList.getElement().querySelector('.desc-list'));
    });
  });
}
}
