/**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markup_name 
   * @param {domElement} parent 
   * @param {String} text 
   * @param {Object} attributes
  * @returns domElement
   */
function createMarkup(markupname, parent, text = "", attributes = {}) {
  const markup = document.createElement(markupname);
  markup.textContent = text;
  parent.appendChild(markup);
  for (key in attributes) {
    markup.setAttribute(key, attributes[key]);
  }
  return markup;
}
// Création d'un h1
const h1 = createMarkup("h1", document.body, "Titre de niveau 1", { "class": "h1" });
// Afficher "clic sur h1" dans la console lors d'un clic sur h1
// Ajouter un nouveau paragraphe chaque fois que je clique sur h1
h1.addEventListener("click", addParagraph);

function addParagraph() {
  console.log(`clic sur h1`);
  const p = createMarkup("p", document.body, "Lorem Ipsum")

}
// Création d'un formulaire
const form = createMarkup("form", document.body);
const inputEmail = createMarkup("input", form, "", { "id": "email", "type": "email", "name": "email" });
const submitButton = createMarkup("button", form, "Envoyer", { "id": "submit", "type": "submit", "name": "submit" });

// Gestion des événements
form.addEventListener("submit", (event) => {
  event.preventDefault();
  const emailValue = inputEmail.value;
  console.log(`Formulaire soumis. Valeur de l'email :`, emailValue);
  // Ajouter un message dans un paragraphe qui indique que l'inscription à la newsletter avec l'email donné a bien été prise en compte

})
