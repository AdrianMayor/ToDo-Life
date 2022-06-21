"use strict";

import { Task } from "./taskClass.js";
import { getDate, sortArray } from "./helpers.js";

const forms = document.forms.taskForm;
const inputTask = forms.elements.task;
const taskPriority = forms.priority;
const taskList = document.querySelector("#taskList > div");

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
  let taskObj = JSON.parse(localStorage.getItem("tareas"));
  //console.log(taskObj);

  const objFra = document.createDocumentFragment();
  const button = document.createElement("button");
  const ul = document.createElement("ul");

  button.setAttribute("id", "cleanButton");
  button.innerHTML = `<img src="./multimedia/cleanButton.png" alt="Imagen Papelera">`;
  /*   button.innerHTML = `Limpiar`; */

  if (taskObj && taskObj.length >= 0) {
    clearList("#taskList > div");

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

      li.innerHTML = `<span>Tarea: ${taskObj[i].name}.</span> <span>Prioridad: ${taskObj[i].priority}.</span> <span> ${taskObj[i].date}.</span>`;

      if (taskObj[i].complete) {
        li.style.textDecoration = "line-through";
      }
      objFra.append(li);
    }
  }

  ul.append(objFra);
  taskList.append(ul);
  taskList.append(button);

  ul.append(objFra);
  taskList.append(ul);
  taskList.append(button);
  if (taskObj.length === 0) {
    button.remove();
  }
}

function clearList(elementSelector) {
  const element = document.querySelector(elementSelector);
  element.innerHTML = " ";
}

function handleCrossTask() {
  //console.log(event.target);
  if (
    event.target.matches(".toDo span") ||
    event.target.matches(".done span")
  ) {
    const completedTask = event.target.parentElement;

    tasks[completedTask.id].complete = !tasks[completedTask.id].complete;
    //console.log(completedTask);
    //console.log(tasks[completedTask.id].complete);

    saveLocalStorage(tasks);

    printTasks();
  }
}

function handleDeleteButton() {
  if (
    event.target.matches(" #cleanButton") ||
    event.target.matches(" #cleanButton img")
  ) {
    const filteredTasks = tasks.filter((key) => key.complete === false);

    tasks = filteredTasks;
    saveLocalStorage(filteredTasks);
    printTasks();
  }
}

function saveLocalStorage(array) {
  localStorage.setItem("tareas", JSON.stringify(array.sort(sortArray)));
}

main();
