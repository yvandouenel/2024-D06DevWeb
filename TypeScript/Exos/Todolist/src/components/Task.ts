// Un composant est une classe qui a des propriétés et qui est capable de construire les éléments du DOM pour rendre visibles ces mêmes propriétés

import Component from "../utils/Component";
import ErrorService from "../services/ErrorService";
import TaskInterface from "../interfaces/TaskInterface";
import TaskService from "../services/TaskService";

export default class Task extends Component implements TaskInterface {
  id: string;
  title: string;
  description?: string;
  done: boolean;
  parentElement: HTMLElement;
  domElts: Record<string, HTMLElement>;

  constructor(task: TaskInterface, parentElement: HTMLElement) {
    super();
    this.id = task.id;
    this.title = task.title;
    this.description = task.description;
    this.done = task.done;

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

      // Faire appel au service pour modifier la tâche sur le serveur (json-server)
      // Pour gérer l'erreur éventuelle lors du patch, je dois gérer le retour aléatoire de la promesse
      TaskService.patchTask({ id: this.id, done: this.done })
        .then((patchedTask) => {
          console.log(`Tâche patchée`, patchedTask);
        })
        .catch((error) => {
          console.log(`Erreur attrapée lors de l'appel de patchTask`);

          ErrorService.getInstance().emitError(
            "Erreur lors de la modification en base de données. Veuillez renouveller votre modification ultérieurement et/ou contacter le service technique : tech@todolist.fr"
          );
          setTimeout(() => {
            this.done = !this.done;
            checkbox.checked = !checkbox.checked;
          }, 1000);
        });
    });

    // Gérer le click sur le bouton supprimer (demander confirmation - utiliser confirm) puis supprimer l'élément du DOM
    this.domElts.deleteElt.addEventListener("click", () => {
      if (
        confirm(
          `Voulez vous supprimer la tâche ${this.title} qui a pour id ${this.id}`
        )
      ) {
        // Cache l'élément du dom qui représente la tâche
        this.domElts.articleElt.style.setProperty(
          "display",
          "none",
          "important"
        );
        // Faire appel au service pour supprimer la tâche sur le serveur (json-server)
        TaskService.deleteTask(this.id)
          .then((data) => {
            console.log(`promesse tenue`);
          })
          .catch((error) => {
            console.error(
              `Erreur attrapée lors de l'appel de deleteTask dans le composant Task : ${error}`
            );
            setTimeout(() => {
              this.domElts.articleElt.style.setProperty(
                "display",
                "flex",
                "important"
              );
            }, 2000);
          });
        // Si le delete ne fonctionne pas, on revient à la version précédente de la liste en donnant un message d'erreur qui sera affiché sur le parent (Todolist) et la méthode préconisée pour ce genre de communication est le design pattern observer
        // On va se service du service ErrorService pour émettre un notification next
        ErrorService.getInstance().emitError(
          "Erreur lors de la suppression en base de données. Veuillez renouveller votre suppression ultérieurement et/ou contacter le service technique : tech@todolist.fr"
        );
      }
    });
  }
}
