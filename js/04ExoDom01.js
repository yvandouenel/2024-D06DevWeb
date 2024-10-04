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

// Créer un élément du dom en utilisant la fonction createMarkup
const header = createMarkup("header", document.body);
const nav = createMarkup("nav", header);
for (let i = 0; i < 4; i++) {
  //createMarkup("button", nav, "Item " + (i + 1));
  createMarkup("button", nav, `Item ${i + 1}`);
}
// Changer le style du bouton 2
nav.querySelector("button:nth-child(2)").style.color = "red";