console.log(`Dans index.ts`);
import Fetch from "./services/Fetch";
import { fromEvent } from "rxjs";
import {
  debounceTime,
  filter,
  map,
  switchMap,
  distinctUntilChanged,
} from "rxjs/operators";
import Town from "./interfaces/Town";

import { ApiTown } from "./interfaces/Town";
// Gestion de la soumission du formulaire
const form = document.getElementById("form");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  console.log(`Soumission du formulaire gérée`);
});

// Gestion de l'événement input sur l'input str-town
const inputTown = document.getElementById("str-town") as HTMLInputElement;

fromEvent(inputTown, "input")
  .pipe(
    // On transforme la valeur d'un événement à une chaîne de caractères
    map((event) => (event.target as HTMLInputElement).value),
    // On attend que la chaîne de caractères soit > 3
    filter((strTown) => strTown.length > 2),
    // Limite le nombre de requête en attendant que l'internaute ne soit plus actif pendant une demi-seconde -> on peut parler d'éco-conception
    debounceTime(500),
    // Si jamais la chaine de caractères n'a pas changé, on ne renvoie pas une nouvelle valeur
    distinctUntilChanged(),
    // J'essaie de transformer en Ville. Le switch permet de passer directement à l'utilisation de la dernière
    // chaîne de caractère entrée sans attendre le résultat de l'avant dernière. De cette manière, on est sûr que la réponse concerne bien la dernière requête de l'utilisateur
    switchMap((strTown) => Fetch.loadTowns(strTown)),
    map((data) =>
      data.features.map((feature: ApiTown) => ({
        label: feature.properties.label,
        coordinates: feature.geometry.coordinates,
      }))
    )
  )
  .subscribe({
    next: (towns: Town[]) => {
      const selectTown = document.getElementById("select-towns");
      if (selectTown) {
        selectTown.remove();
      }

      const select = document.createElement("select");
      select.setAttribute("id", "select-towns");
      form.appendChild(select);

      towns.forEach((town: Town) => {
        const option = document.createElement("option");
        select.appendChild(option);
        option.innerText = town.label;
        option.setAttribute("data-lat", town.coordinates[1].toString());
        option.setAttribute("data-lon", town.coordinates[0].toString());
        select.addEventListener("change", (event) => {
          // Affichage de l'option sélectionnée
          const selectedOption = (event.target as HTMLSelectElement)
            .selectedOptions[0];
          console.log(
            `clic sur  ${
              selectedOption.value
            } - latitude : ${selectedOption.getAttribute(
              "data-lat"
            )} - Longitude : ${selectedOption.getAttribute("data-lon")}`
          );

          // Appel du service de météo ici
        });
      });
    },
  });
