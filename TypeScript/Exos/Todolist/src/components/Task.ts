// Un composant est une classe qui a des propriétés et qui est capable de construire les éléments du DOM pour rendre visibles ces mêmes propriétés

import TaskInterface from "../interfaces/TaskInterface";
import Component from "../utils/Component";

export default class Task extends Component implements TaskInterface {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  constructor(
    id: string,
    title: string,
    description: string,
    done: boolean = false
  ) {
    super();
    this.id = id;
    this.title = title;
    this.description = description;
    this.done = done;

    // Appel de render
    this.render();
  }
  render() {
    // Création d'une balise article
    // Création d'une balise h3 qui reprend le titre de la tâche
    // Case à cocher pour montrer si la tâche est faite
  }
}
