// Un composant est une classe qui a des propriétés et qui est capable de construire les éléments du DOM pour rendre visibles ces mêmes propriétés

import TaskInterface from "../interfaces/TaskInterface";
import Component from "../utils/Component";
import { atRule } from "./../../node_modules/postcss/lib/postcss.d";

export default class Task extends Component implements TaskInterface {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement>;

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

    // Appel de render qui retourne un objet littéral (clé/valeur) dont les valeurs sont de type HTMLElement
    this.domElts = this.render();

    // Gestion des événements
    this.handleEvents();
  }
  render() {
    // Création d'une balise article
    const articleElt = this.createMarkup("article", this.parentElement, "", {
      class: "d-flex gap-4 my-3",
    });

    // Création d'une balise h3 qui reprend le titre de la tâche
    const h3Elt = this.createMarkup("h3", articleElt, this.title);
    // Case à cocher pour montrer si la tâche est faite
    const checkbox = this.createMarkup("input", articleElt, "", {
      type: "checkbox",
    }) as HTMLInputElement;
    checkbox.checked = this.done;

    // Créer un bouton "supprimer"
    const deleteElt = this.createMarkup("button", articleElt, "Supprimer", {
      class: "btn btn-danger",
    });

    return {
      checkbox,
      deleteElt,
      articleElt,
    };
  }
  handleEvents() {
    // Accès à checkbox en utilisant une assertion pour indiquer l'on a affaire à un input
    const checkbox = this.domElts.checkbox as HTMLInputElement;
    checkbox.addEventListener("change", () => {
      this.done = checkbox.checked;
      console.log(`this.done`, this.done);
    });

    // Gérer le click sur le bouton supprimer (demander confirmation - utiliser confirm) puis supprimer l'élément du DOM
    this.domElts.deleteElt.addEventListener("click", () => {
      if (confirm(`Voulez vous supprimer la tâche ${this.title}`)) {
        this.domElts.articleElt.remove();
      }
    });
  }
}
