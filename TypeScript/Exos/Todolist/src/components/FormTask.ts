// Un composant est une classe qui a des propriétés et qui est capable de construire les éléments du DOM pour rendre visibles ces mêmes propriétés

import Component from "../utils/Component";
import ErrorService from "../services/ErrorService";
import TaskInterface from "../interfaces/TaskInterface";
import TaskService from "../services/TaskService";

export default class FormTask extends Component {
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement | HTMLFormElement>;

  constructor(parentElement: HTMLElement) {
    super();

    this.parentElement = parentElement;

    // Appel de render qui retourne un objet littéral (clé/valeur) dont les valeurs sont de type HTMLElement
    this.domElts = this.render();

    // Gestion des événements
    this.handleEvents();
  }
  render() {
    // Création d'une balise form
    const formElt = this.createMarkup("form", this.parentElement, "", {
      class: "d-flex gap-3 my-4 align-items-center",
      method: "POST",
    }) as HTMLFormElement;

    // Création d'un label
    const labelTitleElt = this.createMarkup(
      "label",
      formElt,
      "Titre de la tâche : ",
      {
        for: "title",
      }
    );
    // input pour le titre de la tâche
    const inputTitle = this.createMarkup("input", formElt, "", {
      type: "text",
      id: "title",
      name: "title",
    }) as HTMLInputElement;

    // Créer un bouton "Ajouter"
    const addElt = this.createMarkup("button", formElt, "Ajouter", {
      class: "btn btn-success",
      type: "submit",
    });

    return {
      formElt,
    };
  }
  handleEvents() {
    console.log(`Dans handleEvents de FormTask`);

    this.domElts.formElt.addEventListener("submit", (event) => {
      console.log(`Formulaire soumis`);
      // Pour que la page ne se recharge pas au moment de la soumission du formulaire
      event.preventDefault();

      // Récupération des données soumise via une instance de formdata
      const formData = new FormData(this.domElts.formElt as HTMLFormElement);
      const partialTask = {
        description: "",
        done: false,
        ...Object.fromEntries(formData),
      };
      console.log(`partialTask : `, partialTask);

      // Créer un objet task mais sans id (il faudra donc créer une interface pour cela)
      TaskService.getInstance().createTask(
        partialTask as Omit<TaskInterface, "id">
      );

      // Ajouter l'objet via le service TaskService

      // Afficher la nouvelle tâche via todolist
    });
  }
}
