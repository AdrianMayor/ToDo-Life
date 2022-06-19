"use strict";

class Task {
  static description = "Esta clase define una tarea";

  constructor(name, priority, date, complete) {
    this.name = name;
    this.priority = priority;
    this.date = date;
    this.complete = complete;
  }
}

export { Task };
