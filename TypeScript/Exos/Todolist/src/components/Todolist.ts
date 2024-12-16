import TaskInterface from "../interfaces/TaskInterface";
import Component from "../utils/Component";
import Task from "./Task";

export default class Todolist extends Component {
  title: string;
  tasks: TaskInterface[];
  constructor(title: string, tasks: TaskInterface[]) {
    super();
    this.title = title;
    this.tasks = tasks;

    // Appel de render dès la construction
    this.render();
  }
  // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la todolist
  render() {
    // création d'une section qui entoure la todolist
    const section = this.createMarkup("section", document.body);

    // Création d'une balise h2 qui reprend le titre de la todoList et qui le place dans la section
    this.createMarkup("h2", section, this.title, { id: "title-todolist" });

    // Création des balises "article" à partir de la propriété tasks
    // Attention, vous êtes obligés de passer par la création d'un composant class "Task"
    this.tasks.forEach((task: TaskInterface) => {
      new Task(task.id, task.title, task.description, task.done);
    });
  }
}
