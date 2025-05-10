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
    return this.#tasks;
  }

  getTaskByStatus(status) {
    return this.#tasks.filter(task => task.status === status);
  }

  addTask(title) {
    const newTask = {
      id: generateID(),
      title:title,
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
}