// task-model.js
import { tasks } from '../mock/task.js';

export default class TaskModel {
  #tasks;

  constructor() {
    this.#tasks = [...tasks];
  }

  get tasks() {
    return this.#tasks;
  }
}
