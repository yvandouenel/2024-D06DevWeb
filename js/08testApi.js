/* fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m")
  .then(response => {
    console.log(`response.status`, response.status);
    return response.json();
  })
  .then(data => {
    console.log(`température : `, data.current);
  }) */

/* fetch renvoie une promesse de réponse (une instance de Response).
  ce qui veut dire que si la promesse est tenue, on va pouvoir exécuter le code contenu dans le then() suivant
  Dans le premier then() on fait à nouveau appel à une fonction (json()) qui renvoie une promesse d'objets ou de tableaux ( object, an array, a string, a number)
  Si la promesse est tenue, on se retrouve dans le deuxième then() et dans cet exemple, on obtient un objet qui a plusieurs propriétés (time, interval, temperateur_2m, wind_speed_10m)
*/

// Autre façon d'utiliser les promesses : avec async et await

async function getWetherForcast() {
  try {
    const response = await fetch("https://api.open-meteo.com/v1/forecast?latitude=52.52&longitude=13.41&current=temperature_2m,wind_speed_10m&hourly=temperature_2m,relative_humidity_2m,wind_speed_10m");

    console.log(`statut de la response  en utilisant async et await `, response.status);
    if (response.status == 200) {
      const data = await response.json();
      console.log(`data.current : `, data.current);
    }
  } catch (error) {
    console.error('Erreur attrapée', error)
  }
}
getWetherForcast();
