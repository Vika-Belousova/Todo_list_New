// src/model/task-model.js

import { tasks } from '../mock/task.js';

export default class TaskModel {
  constructor() {
    this.tasks = [...tasks];
  }

  getTasks() {
    return this.tasks;
  }
}