"use strict";
// la méthode getElementById renvoie un HTMLElement ou null
const btn = document.getElementById("btn");
// Je fais du rétrécissement pour indiquer plus précisément le type de l'élément du DOM (ici HTMLInputElement )
const input = document.getElementById("input");
btn === null || btn === void 0 ? void 0 : btn.addEventListener("click", () => {
    console.log(`Boutton cliqué`);
    input.value = "100";
});
