/**
 * Crée un élément du dom, lui ajoute du texte, le place comme dernier
 * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
 * @param {String} markup_name
 * @param {domElement} parent
 * @param {String} text
 * @param {Object} attributes
 * @returns domElement
 */
export default function createMarkup(
  markupname: string,
  parent: HTMLElement,
  text: string = "",
  attributes: Record<string, any> = {}
) {
  const markup = document.createElement(markupname);
  markup.textContent = text;
  parent.appendChild(markup);
  for (let key in attributes) {
    markup.setAttribute(key, attributes[key]);
  }
  return markup;
}
