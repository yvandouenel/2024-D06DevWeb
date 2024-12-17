import Todolist from "./components/Todolist";
import TaskInterface from "./interfaces/TaskInterface";
import "./sass/style.scss";
console.log(`Dans index.ts`);

// On peut considérer que tasks représente l'état de l'application mais il va falloir mettre en place
// un mécanisme pour que chaque fois que ce état est modifié, cela reconstruise l'application

const tasks: TaskInterface[] = [
  {
    id: "1",
    title: "Faire la vaisselle",
    description: "Et que ça saute",
    done: true,
  },
  {
    id: "2",
    title: "Faire du sport",
    description: "Et que ça saute",
    done: false,
  },
];
const parentElt = document.getElementById("root");
const todolist1 = new Todolist("Première Todolist", tasks, parentElt);
