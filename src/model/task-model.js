// src/model/task-model.js

import { tasks } from '../mock/task.js';

export default class TaskModel {
  constructor() {
    this.tasks = [...tasks];
  }

  getTasks() {
    return this.tasks;
  }
  addTask(task) {
    if (!task || !task.title) {
      return;
    }
    this.tasks.push(task);
  }

  removeTask(taskId) {
    this.tasks = this.tasks.filter((task) => task.id !== taskId);
  }
}