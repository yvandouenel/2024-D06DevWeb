import Component from "../utils/Component";
import ErrorService from "../services/ErrorService";
import Task from "./Task";
import TaskInterface from "../interfaces/TaskInterface";

export default class Todolist extends Component {
  title: string;
  tasks: TaskInterface[];
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement>;
  constructor(
    title: string,
    tasks: TaskInterface[],
    parentElement: HTMLElement
  ) {
    super();
    this.title = title;
    this.tasks = tasks;
    this.parentElement = parentElement;
    // Souscription au service d'erreur
    this.subscribeErrorNotification();

    // Appel de render dès la construction
    this.domElts = this.render();
  }
  // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la todolist
  render() {
    // création d'une section qui entoure la todolist
    const section = this.createMarkup("section", this.parentElement);

    // Création d'une balise h2 qui reprend le titre de la todoList et qui le place dans la section
    this.createMarkup("h2", section, this.title, { id: "title-todolist" });

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
