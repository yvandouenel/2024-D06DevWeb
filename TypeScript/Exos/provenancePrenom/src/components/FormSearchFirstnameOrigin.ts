import createMarkup from "../utils/utils";
import Fetch from "../services/Fetch";
export default class FormSearchFirstnameOrigin {
  domElts: { form: HTMLFormElement; input: HTMLInputElement };
  constructor() {
    this.domElts = this.render();

    // Gestion des événements
    this.manageEvent();
  }
  render() {
    const form = createMarkup("form", document.body) as HTMLFormElement;
    const label = createMarkup("label", form, "Prénom", { for: "firstname" });
    const input = createMarkup("input", form, "", {
      id: "firstname",
      type: "input",
    }) as HTMLInputElement;
    return {
      form,
      input,
    };
  }
  manageEvent() {
    this.domElts.form.addEventListener("submit", async (event: Event) => {
      event.preventDefault();
      const firstname = this.domElts.input.value.trim().toLowerCase();
      console.log(`this.domElts.input.value`, this.domElts.input.value);
      // Appel du service
      if (firstname) {
        const firstnameOrigin = await Fetch.loadFirstNameCountries(firstname);
        console.log(`firstnameOrigin`, firstnameOrigin);
      }
    });
  }
}
