// task-model.js
import { tasks } from '../mock/task.js';
import { generateID } from '../utils.js';

export default class TaskModel {
  #tasks;
  #observers = [];

  constructor() {
    this.#tasks = [...tasks];
  }

  get tasks() {
    return [...this.#tasks]; 
  }

  getTaskByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateID(),
      title: title,
      status: 'backlog'
    };

    this.#tasks.push(newTask);
    this._notifyObservers();
    return newTask;
  }

  clearBasket() {
    this.#tasks = this.#tasks.filter(task => task.status !== 'basket');
    this._notifyObservers();
  }

  addObserver(observer) {
    this.#observers.push(observer);
  }

  removeObserver(observer) {
    this.#observers = this.#observers.filter(obs => obs !== observer);
  }

  _notifyObservers() {
    this.#observers.forEach(observer => observer());
  }

  /**

   * @param {string} taskId 
   * @param {string} newStatus 
   * @param {number|null} insertIndex 
   */
  updateTaskStatus(taskId, newStatus, insertIndex = null) {
    const taskIndex = this.#tasks.findIndex(t => t.id === taskId);
    if (taskIndex === -1) return;

    const [task] = this.#tasks.splice(taskIndex, 1);
    task.status = newStatus;
    const updatedTasks = this.#tasks.filter(t => t.status === newStatus);
    if (insertIndex === null || insertIndex >= updatedTasks.length) {
      updatedTasks.push(task);
    } else {
      updatedTasks.splice(insertIndex, 0, task);
    }

    this.#tasks = [
      ...this.#tasks.filter(t => t.status !== newStatus),
      ...updatedTasks
    ];

    this._notifyObservers();
  }
}
