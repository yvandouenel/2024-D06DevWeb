import Component from "../utils/Component";
import ErrorService from "../services/ErrorService";
import FormTask from "./FormTask";
import Task from "./Task";
import TaskInterface from "../interfaces/TaskInterface";
import TaskService from "../services/TaskService";

export default class Todolist extends Component {
  title: string;
  tasks: TaskInterface[];
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement>;
  id: string;
  constructor(
    title: string,
    tasks: TaskInterface[],
    parentElement: HTMLElement
  ) {
    super();
    this.title = title;
    this.tasks = tasks;
    this.parentElement = parentElement;
    this.id = Date.now().toString();
    // Souscription au service qui émet des tâches
    this.subscribeTasksNotification();

    // Souscription au service d'erreur
    this.subscribeErrorNotification();

    // Ajout du formulaire d'ajout de tâche
    new FormTask(this.parentElement);

    // Appel de render dès la construction
    this.domElts = this.render();
  }
  // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la todolist
  render() {
    let section = document.getElementById(this.id);
    if (section) {
      section.remove();
    }
    // création d'une section qui entoure la todolist
    section = this.createMarkup("section", this.parentElement, "", {
      id: this.id,
    });

    // Création d'une balise h2 qui reprend le titre de la todoList et qui le place dans la section
    this.createMarkup("h2", section, this.title);

    // Création d'un paragraphe qui affichera les éventuelles erreurs
    const paragrapheError = this.createMarkup("p", section, "", {
      class: "text-danger h2",
    });

    // Création des balises "article" à partir de la propriété tasks
    // Attention, vous êtes obligés de passer par la création d'un composant class "Task"
    this.tasks.forEach((task: TaskInterface) => {
      // Ici, on voit que l'on pourrait passer beaucoup moins d'arguments en passant directement task
      new Task(task, section);
    });
    return {
      paragrapheError,
    };
  }
  subscribeTasksNotification() {
    TaskService.getInstance()
      .getTasksSubject()
      .subscribe({
        next: (tasks) => {
          console.log(
            `Tasks reçues dans Todolist via le service des tasks`,
            tasks
          );
          this.tasks = tasks;
          setTimeout(() => {
            this.render();
          }, 1000);
        },
      });
  }
  subscribeErrorNotification() {
    ErrorService.getInstance()
      .getErrorSubject()
      .subscribe({
        next: (msg) => {
          console.log(
            `Message reçu dans Todolist via le service d'erreur`,
            msg
          );
          this.domElts.paragrapheError.innerText = msg;
          setTimeout(() => {
            this.domElts.paragrapheError.innerText = "";
          }, 5000);
        },
      });
  }
}
