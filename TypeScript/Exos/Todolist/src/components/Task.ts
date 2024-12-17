// Un composant est une classe qui a des propriétés et qui est capable de construire les éléments du DOM pour rendre visibles ces mêmes propriétés

import TaskInterface from "../interfaces/TaskInterface";
import Component from "../utils/Component";

export default class Task extends Component implements TaskInterface {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  parentElement: HTMLElement;

  constructor(
    id: string,
    title: string,
    description: string,
    done: boolean = false,
    parentElement: HTMLElement
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;

    this.parentElement = parentElement;
    // Appel de render
    this.render();
  }
  render() {
    // Création d'une balise article
    const articleElt = this.createMarkup("article", this.parentElement);

    // Création d'une balise h3 qui reprend le titre de la tâche
    const h3Elt = this.createMarkup("h3", articleElt, this.title);
    // Case à cocher pour montrer si la tâche est faite
    const checkbox = this.createMarkup("input", articleElt, "", {
      type: "checkbox",
    }) as HTMLInputElement;
    checkbox.checked = this.done;
  }
}
