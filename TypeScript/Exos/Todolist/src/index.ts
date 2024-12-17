import Todolist from "./components/Todolist";
import TaskInterface from "./interfaces/TaskInterface";
import "./sass/style.scss";
console.log(`Dans index.ts`);
import TaskService from "./services/TaskService";

// On peut considérer que tasks représente l'état de l'application mais il va falloir mettre en place
// un mécanisme pour que chaque fois que ce état est modifié, cela reconstruise l'application

// Appel de la donnée via un service
TaskService.loadTasks().then((tasks) => {
  // Tout s'est bien passé, j'ai reçu ma liste de tâches
  console.log(`tasks dans index.ts`, tasks);
  const parentElt = document.getElementById("root");
  const todolist1 = new Todolist("Première Todolist", tasks, parentElt);
});
/*  */
