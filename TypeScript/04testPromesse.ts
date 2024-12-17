// Promesse : mécanisme qui permet de gérer de l'asynchrone et de l'aléatoire

function aleaAsync1() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.5) {
        resolve("Cas 1 favorable");
      } else {
        reject("Erreur dans aleaAsync1");
      }
    }, 1000);
  });
}

function aleaAsync2() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const random = Math.random();
      if (random > 0.5) {
        resolve("Cas 2 favorable");
      } else {
        reject("Erreur dans aleaAsync2");
      }
    }, 1000);
  });
}
/* console.log(aleaAsync1()); */
aleaAsync1()
  .then((result) => {
    console.log(result);
    return aleaAsync2();
  })
  .then((result) => {
    console.log(result);
    // Ici, je suis dans le cas où tout s'est bien passé (j'ai eu de la chance)
  })
  .catch((error) => {
    console.error(`Erreur attrapée ${error}`);
  });

console.log(`Après l'appel de aleaAsync1`);
