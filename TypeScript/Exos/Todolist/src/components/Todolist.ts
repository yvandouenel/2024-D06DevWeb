export default class Todolist {
  title: string;
  constructor(title: string) {
    this.title = title;

    // Appel de render dès la construction
    this.render();
  }
  // Méthode qui permet de créer une section avec un h2 qui reprendra le titre de la todolist
  render() {
    // création d'une section qui entoure la todolist
    this.createMarkup("section", document.body);

    // Création d'une balise h2 qui reprend le titre de la todoList et qui le place dans la section
  }
  /**
   * Crée un élément du dom, lui ajoute du texte, le place comme dernier
   * enfant de parent et ajoute un attribut en utilisant le paramètre attributes
   * @param {String} markup_name
   * @param {domElement} parent
   * @param {String} text
   * @param {Object} attributes
   * @returns domElement
   */
  createMarkup(
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
}
