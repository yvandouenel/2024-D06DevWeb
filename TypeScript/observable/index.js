console.log(`dans index.js`);
import { Subject } from "rxjs";

// Création d'un sujet
const testSujet = new Subject();

// Souscription à l'observable
testSujet.subscribe({
  next: (data) => { console.log(`Donnée soumise : `, data); }
})

// Emission de notification next
testSujet.next("valeur 1");