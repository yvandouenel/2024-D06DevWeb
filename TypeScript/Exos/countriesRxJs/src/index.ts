import Country from "./interfaces/Country";
import FetchCountries from "./services/FetchCountries";
import { fromEvent } from "rxjs";
console.log(`Dans index.ts`);
import {
  debounceTime,
  filter,
  map,
  switchMap,
  distinctUntilChanged,
} from "rxjs/operators";

// Element racine
const root = document.getElementById("app");

// Gestion de la soumission du formulaire
const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
});

// Gestion de l'événement input sur l'input str-country
const inputCountry = document.getElementById("str-country") as HTMLInputElement;

// Transformation de l'événement input en un observable
// Grâce à pipe et l'opérateur map, on transforme la donnée d'une instance d'événement à HTMLInputElement
fromEvent(inputCountry, "input")
  .pipe(
    // On transforme la valeur d'un événement à une chaîne de caractères
    map((event) => (event.target as HTMLInputElement).value),
    // On attend que la chaîne de caractères soit > 3
    filter((strCountry) => strCountry.length > 2),
    // Limite le nombre de requête en attendant que l'internaute ne soit plus actif pendant une demi-seconde -> on peut parler d'éco-conception
    debounceTime(500),
    // Si jamais la chaine de caractères n'a pas changé, on ne renvoie pas une nouvelle valeur
    distinctUntilChanged(),
    // J'essaie de transformer directement en pays. Le switch permet de passer directement à l'utilisation de la dernière
    // chaîne de caractère entrée sans attendre le résultat de l'avant dernière. De cette manière, on est sûr que la réponse concerne bien la dernière requête de l'utilisateur
    switchMap((strCountry) => FetchCountries.loadCountries(strCountry))
  )
  .subscribe({
    next: (countries) => {
      console.log(`countries from rxjs : `, countries);
      const select = document.createElement("select");
      form.appendChild(select);
      countries.forEach((country: Country) => {
        const option = document.createElement("option");
        select.appendChild(option);
        option.innerText = country.name.common;
      });
    },
  });

/* inputCountry.addEventListener("input", (event) => {
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
}); */
