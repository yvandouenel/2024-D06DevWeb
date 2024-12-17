import TaskInterface from "../interfaces/TaskInterface";
import Component from "../utils/Component";
import Task from "./Task";

export default class Todolist extends Component {
  title: string;
  tasks: TaskInterface[];
  parentElement: HTMLElement;
  constructor(
    title: string,
    tasks: TaskInterface[],
    parentElement: HTMLElement
  ) {
    super();
    this.title = title;
    this.tasks = tasks;
    this.parentElement = parentElement;
    // Appel de render dès la construction
    this.render();
  }
  // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la todolist
  render() {
    // création d'une section qui entoure la todolist
    const section = this.createMarkup("section", this.parentElement);

    // Création d'une balise h2 qui reprend le titre de la todoList et qui le place dans la section
    this.createMarkup("h2", section, this.title, { id: "title-todolist" });

    // Création des balises "article" à partir de la propriété tasks
    // Attention, vous êtes obligés de passer par la création d'un composant class "Task"
    this.tasks.forEach((task: TaskInterface) => {
      // Ici, on voit que l'on pourrait passer beaucoup moins d'arguments en passant directement task
      new Task(task, section);
    });
  }
}
