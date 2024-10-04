//console.log(`window.document`, window.document);

// Récupération d'éléments du DOM via getElementById
let text2 = window.document.getElementById("text2");

// Afficher le type de l'item de liste ?
console.log(`text2.innerText`, text2.innerText);
text2.innerText = "Ce que je veux";
console.log(`text2.innerText`, text2.innerText);
// Utilisé comme mutateur / setter

/* while (text2) {
  console.log("class de text2 : ", text2.constructor.name);
  // Remonte la chaîne des prototypes
  text2 = Object.getPrototypeOf(text2);
} */

// Utilisation de querySelector pour récupérer le 1er li
const firstLi = document.querySelector("li:first-child");
console.log(`firstLi.innerText`, firstLi.innerText);

const thirdLi = document.querySelector("li:nth-child(3)");
console.log(`thirdLi.innerText`, thirdLi.innerText);

////////////////////////////////////////////////////////////////
// Comment créer des éléments du DOM
// Création d'un H1
const h1 = document.createElement("h1");
h1.textContent = "Titre 1";
document.body.prepend(h1);