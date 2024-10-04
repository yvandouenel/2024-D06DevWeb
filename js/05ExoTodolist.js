
import { createMarkup } from "./utils/utils.js";
// Récupère nos éléments HTML et on les stocke
let form = document.getElementById("form");

// Attention, on ne peut pas utiliser getElementById
let inputTitle = form.querySelector("#title");

let textareaDescription = form.querySelector("#description");
let ul = document.body.querySelector("#list");
let submitFormButton = form.querySelector("#submit-form-button");


// Tableau qui stockera nos taches
let taskList = [];

let updatingTaskElements = {}

// Depuis la variable form, je lui affecte un évènement de type submit (soumission de formulaire)

form.addEventListener("submit", function (event) {
  // Bloquer le rechargement de la page
  event.preventDefault();

  // Ce formulaire est un formulaire d'ajout ou de modification ?
  if (submitFormButton.textContent == "Modifier") {
    console.log(`Dans form.addEventListener - cas de modification`);
    if (inputTitle.value) {
      // Formulaire de modification
      updatingTaskElements.title.innerText = inputTitle.value;
    }
    if (textareaDescription.value) {
      // Formulaire de modification
      updatingTaskElements.description.innerText = textareaDescription.value;
    }
    // Repasser à un formulaire d'ajout


  }
  else {
    // formulaire d'ajout
    if (inputTitle.value) {
      // Déclaration de notre objet littéral
      let newTask = {
        title: inputTitle.value,
        description: textareaDescription.value,
      }
      inputTitle.value = "";
      textareaDescription.value = "";

      // Push des valeurs de l'objet dans le tableau
      /* taskList.push(newTask) */
      console.log(taskList)
      // Création des nouveaux éléments du dom pour la nouvelle tâche
      const liTask = createMarkup("li", ul);
      const titleTask = createMarkup("h1", liTask, newTask.title);
      const descriptionTask = createMarkup("p", liTask, newTask.description);
      const buttonDelete = createMarkup("button", liTask, "Supprimer");
      const buttonEdit = createMarkup("button", liTask, "Modifier");

      // Gestion des événements pour le bouton delete
      buttonDelete.addEventListener("click", () => { liTask.remove() })
      // Gestion des événements pour le bouton Modifier
      buttonEdit.addEventListener("click", () => {
        inputTitle.value = newTask.title;
        textareaDescription.value = newTask.description;

        submitFormButton.textContent = "Modifier";
        updatingTaskElements = {
          title: titleTask,
          description: descriptionTask
        }
      })

    }
  }



})