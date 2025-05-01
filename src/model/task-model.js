
import Observable from '../model/observable.js';
import { generateID } from '../utils.js';
import { UserAction, UpdateType, Status } from '../const.js';

export default class TaskModel extends Observable {
  #tasksApiService = null;
  #boardTasks = [];

  constructor({ tasksApiService }) {
    super();
    this.#tasksApiService = tasksApiService;
  }

  get tasks() {
    return [...this.#boardTasks];
  }

  async init() {
    try {
      const tasks = await this.#tasksApiService.tasks; 
      this.#boardTasks = tasks;
      this._notify(UpdateType.INIT); 
    } catch (err) {
      console.error('Ошибка загрузки задач:', err);
      this.#boardTasks = []; 
      this._notify(UpdateType.INIT); 
    }
  }

  async addTask(title) {
    const newTask = {
      title,
      status: Status.BACKLOG,
      id: generateID(), 
    };

    try {
      const createdTask = await this.#tasksApiService.addTask(newTask);
      this.#boardTasks.push(createdTask); 
      this._notify(UserAction.ADD_TASK, createdTask);
      return createdTask; 
    } catch (err) {
      console.error('Ошибка при добавлении задачи:', err);
      throw err;
    }
  }

  async updateTaskStatus(taskId, newStatus, insertIndex = null) {
    const taskIndex = this.#boardTasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return; 

    const updatedTasks = [...this.#boardTasks]; 
    const [task] = updatedTasks.splice(taskIndex, 1); 
    task.status = newStatus; 

    try {
      const updatedTask = await this.#tasksApiService.updateTask(task); 

      if (insertIndex !== null && insertIndex < updatedTasks.length) {
        updatedTasks.splice(insertIndex, 0, updatedTask);
      } else {
        updatedTasks.push(updatedTask);
      }

      this.#boardTasks = updatedTasks; 
      this._notify(UserAction.UPDATE_TASK, updatedTask);
    } catch (err) {
      console.error('Ошибка при обновлении задачи:', err);
      throw err; 
    }
  }

  async clearBasket() {
    const basketTasks = this.#boardTasks.filter(task => task.status === Status.BASKET);
    try {
      await Promise.all(basketTasks.map(task =>
        this.#tasksApiService.deleteTask(task.id)
      ));
      this.#boardTasks = this.#boardTasks.filter(task => task.status !== Status.BASKET);
      this._notify(UserAction.DELETE_TASK, { deletedCount: basketTasks.length }); 
    } catch (err) {
      console.error('Ошибка при удалении задач:', err);
      throw err; 
    }
  }
}
