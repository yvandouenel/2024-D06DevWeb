/**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markup_name 
   * @param {domElement} parent 
   * @param {String} text 
   * @param {Object} attributes
  * @returns domElement
   */
export function createMarkup(markupname, parent, text = "", attributes = {}) {
  const markup = document.createElement(markupname);
  markup.textContent = text;
  parent.appendChild(markup);
  for (key in attributes) {
    markup.setAttribute(key, attributes[key]);
  }
  return markup;
}