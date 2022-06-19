"use strict";

import { Task } from "./taskClass.js";

const forms = document.forms.taskForm;
const inputTask = forms.elements.task;
const taskPriority = forms.priority;
const taskList = document.querySelector("#taskList > ul");
// const taskButton = document.querySelector("form > button");

/* inputTask.addEventListener("input", () => {
  console.log(inputTask.value);
}); */

/* console.log(forms);
console.log(inputTask.value);
console.log(taskPriority.value); */

printTasks();
//console.log(taskButton);

let tasks = [];
if (JSON.parse(localStorage.getItem("tareas"))) {
  tasks = JSON.parse(localStorage.getItem("tareas"));
}
//const taskJSON = JSON.stringify(tasks);

/* console.log("log de tasks " + tasks.length); */

/* class Task {
  static description = "Esta clase define una tarea";

  constructor(name, priority, date, complete) {
    this.name = name;
    this.priority = priority;
    this.date = date;
    this.complete = complete;
  }
} */

function getDate() {
  const today = new Date();

  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  return date;
}

function handleSubmitForm(e) {
  //console.log(e);
  e.preventDefault();

  const complete = false;

  tasks.push(
    new Task(inputTask.value, taskPriority.value, getDate(), complete)
  );

  saveLocalStorage(tasks);
  printTasks();
}

forms.addEventListener("submit", handleSubmitForm);

function printTasks() {
  const taskObj = JSON.parse(localStorage.getItem("tareas"));
  const objFra = document.createDocumentFragment();
  const button = document.createElement("button");

  button.setAttribute("id", "cleanButton");
  button.innerHTML = `Limpiar`;

  if (taskObj && taskObj.length >= 0) {
    clearList("#taskList > ul");

    for (let i = 0; i < taskObj.length; i++) {
      const li = document.createElement("li");
      li.classList.add("toDo");

      if (taskObj[i].complete) {
        li.classList.remove("toDo");
        li.classList.add("done");
      } else {
        li.classList.remove("done");
        li.classList.add("toDo");
      }

      li.setAttribute("id", i);
      li.innerHTML = `${taskObj[i].name}. Prioridad ${taskObj[i].priority}. Añadido el dia ${taskObj[i].date}`;
      /*       console.log(
        "Veamos si esta cogiendo bien el obt complete",
        taskObj[0].complete
      ); */
      if (taskObj[i].complete) {
        li.style.textDecoration = "line-through";
      }
      objFra.append(li);
    }
    objFra.append(button);
  }

  if (taskObj.length === 0) {
    button.remove();
  }

  /*   console.log(taskObj);
  console.log(objFra); */
  taskList.append(objFra);
}

function clearList(elementSelector) {
  const element = document.querySelector(elementSelector);
  element.innerHTML = " ";
}

function handleCrossTask() {
  if (event.target.matches("li.toDo") || event.target.matches("li.done")) {
    const completedTask = event.target;

    tasks[completedTask.id].complete = !tasks[completedTask.id].complete;
    console.log(event.target);
    console.log(tasks[completedTask.id].complete);

    saveLocalStorage(tasks);

    printTasks();
  }
}

taskList.addEventListener("click", handleCrossTask);

function handleDeleteButton() {
  if (event.target.matches("ul #cleanButton")) {
    const filteredTasks = tasks.filter((key) => key.complete === false);

    tasks = filteredTasks;
    saveLocalStorage(filteredTasks);
    printTasks();
    /*   console.log(filteredTasks);
    console.log(tasks);
    console.log(filteredTasks); */
  }
}

taskList.addEventListener("click", handleDeleteButton);

function saveLocalStorage(array) {
  localStorage.setItem("tareas", JSON.stringify(array));
}
