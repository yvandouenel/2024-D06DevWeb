import Todolist from "./components/Todolist";
import TaskInterface from "./interfaces/TaskInterface";
console.log(`Dans index.ts`);

const tasks: TaskInterface[] = [
  {
    id: "1",
    title: "Faire la vaisselle",
    description: "Et que ça saute",
    done: false,
  },
  {
    id: "2",
    title: "Faire du sport",
    description: "Et que ça saute",
    done: false,
  },
];
const todolist1 = new Todolist("Première Todolist", tasks);
console.log(`todolist1.title`, todolist1.title);
