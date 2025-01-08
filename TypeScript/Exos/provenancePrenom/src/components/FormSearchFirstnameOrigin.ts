import createMarkup from "../utils/utils";
import Fetch from "../services/Fetch";
import CountryCode from "./../interfaces/Country";
export default class FormSearchFirstnameOrigin {
  domElts: { form: HTMLFormElement; input: HTMLInputElement };
  constructor() {
    this.domElts = this.render();

    // Gestion des événements
    this.manageEvent();
  }
  render() {
    const form = createMarkup("form", document.body, "", {
      class: "container my-5",
    }) as HTMLFormElement;
    const label = createMarkup("label", form, "Prénom :", {
      for: "firstname",
      class: "me-3",
    });
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
        try {
          const firstnameOriginArray = await Fetch.loadFirstNameCountries(
            firstname
          );
          console.log(`firstnameOrigin`, firstnameOriginArray);

          let sectionCountries = document.getElementById("section-countries");
          // Si la section existe déjà, on la supprime
          if (sectionCountries) sectionCountries.remove();

          // Création de la section qui affiche les pays
          sectionCountries = createMarkup("section", document.body, "", {
            id: "section-countries",
            class: "container",
          });

          firstnameOriginArray.country.forEach((country: CountryCode) => {
            console.log(`country_id`, country.country_id);
            const { probability } = country;
            // Appel du service pour traduire le code du pays

            Fetch.loadCountriesCode(country.country_id)
              .then((countries) => {
                countries.forEach((country) => {
                  console.log(`country`, country);

                  sectionCountries.innerHTML += `<p><strong>${
                    country.name.common
                  }</strong> : ${(probability * 100).toFixed(2)} %</p>`;
                });
              })
              .catch((error) => {
                console.error(
                  `Erreur attrapée lors de l'appel de loadCountriesCode`,
                  error
                );
              });
          });
        } catch (error) {
          console.error(
            "Erreur attrapée lors de l'appel de loadFirstNameCountries",
            error
          );
        }
      }
    });
  }
}
