import FetchCountries from "./services/FetchCountries";
import Country from "./interfaces/Country";
console.log(`Dans index.ts`);

// Element racine
const root = document.getElementById("app");

// Gestion de la soumission du formulaire
const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Gestion de l'événement input sur l'input str-country
const inputCountry = document.getElementById("str-country") as HTMLInputElement;

inputCountry.addEventListener("input", (event) => {
  const input = event.target as HTMLInputElement;
  console.log(`input value`, input.value);
  if (input.value.length > 1) {
    // Appel du service pour récupérer les données via une api rest
    FetchCountries.loadCountries(input.value)
      .then((countries) => {
        // Constructions des éléments du DOM (options)
        const select = document.createElement("select");
        form.appendChild(select);
        countries.forEach((country: Country) => {
          const option = document.createElement("option");
          select.appendChild(option);
          option.innerText = country.name.common;
        });
      })
      .catch((error) => {
        console.log(
          `Erreur attrapée dans index.ts lors de l'appel de loadCountries`
        );
      });
  }
});
