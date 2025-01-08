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
export function windDirection(orientation: number): string {
  if (orientation < 0 || orientation > 360) {
    return "Orientation invalide";
  }

  let direction: string;
  if (orientation >= 315 || orientation <= 45) {
    direction = "Nord";
  } else if (orientation >= 46 && orientation <= 135) {
    direction = "Est";
  } else if (orientation >= 136 && orientation <= 225) {
    direction = "Sud";
  } else if (orientation >= 226 && orientation <= 315) {
    direction = "Ouest";
  } else {
    direction = "Direction du vent inconnue";
  }

  return direction;
}
