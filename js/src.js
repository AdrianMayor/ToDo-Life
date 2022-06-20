"use strict";

import { Task } from "./taskClass.js";

const forms = document.forms.taskForm;
const inputTask = forms.elements.task;
const taskPriority = forms.priority;
const taskList = document.querySelector("#taskList > ul");

let tasks = [];
if (JSON.parse(localStorage.getItem("tareas"))) {
  tasks = JSON.parse(localStorage.getItem("tareas"));
} else {
  localStorage.setItem("tareas", JSON.stringify(tasks));
}

printTasks();

function main() {
  forms.addEventListener("submit", handleSubmitForm);
  taskList.addEventListener("click", handleCrossTask);
  taskList.addEventListener("click", handleDeleteButton);
}

function getDate() {
  const today = new Date();

  const date =
    today.getDate() + "-" + (today.getMonth() + 1) + "-" + today.getFullYear();

  return date;
}

function handleSubmitForm(e) {
  e.preventDefault();

  const complete = false;

  tasks.push(
    new Task(inputTask.value, taskPriority.value, getDate(), complete)
  );

  //console.log("estoy entrando en el submity form");
  saveLocalStorage(tasks);
  printTasks();
}

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
      li.classList.add("task");
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

function handleDeleteButton() {
  if (event.target.matches("ul #cleanButton")) {
    const filteredTasks = tasks.filter((key) => key.complete === false);

    tasks = filteredTasks;
    saveLocalStorage(filteredTasks);
    printTasks();
  }
}

function saveLocalStorage(array) {
  localStorage.setItem("tareas", JSON.stringify(array));
}

main();
