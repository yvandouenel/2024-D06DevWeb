import Todolist from "./components/Todolist";
import "./sass/style.scss";
import TaskService from "./services/TaskService";

console.log(`Dans index.ts`);

const parentElt = document.getElementById("root");

const todolist1 = new Todolist("Première Todolist", [], parentElt);

// Emision des tâches issues de l'appel au serveur json-server
setTimeout(() => {
  TaskService.getInstance().loadTasks();
}, 3000);

/*  */
