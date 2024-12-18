import FormTask from "./components/FormTask";
import Todolist from "./components/Todolist";
import TaskInterface from "./interfaces/TaskInterface";
import "./sass/style.scss";
console.log(`Dans index.ts`);
import TaskService from "./services/TaskService";

const parentElt = document.getElementById("root");

// Appel de la donnée via un service
TaskService.loadTasks().then((tasks) => {
  // Tout s'est bien passé, j'ai reçu ma liste de tâches
  console.log(`tasks dans index.ts`, tasks);

  const todolist1 = new Todolist("Première Todolist", tasks, parentElt);
});
/*  */
