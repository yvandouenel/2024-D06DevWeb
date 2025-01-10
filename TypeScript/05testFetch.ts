// fetch renvoie une promesse
fetch("http://localhost:3000/taskss")
  .then((response) => {
    console.log(`statut de la réponse : ${response.status}`);
    if (response.status == 200) {
      // Tout s'est bien passé, je dois maintenant vérifier si la donnée renvoyée est bien du json
      // json() renvoie une promesse
      return response.json();
    } else
      throw new Error(
        "Le serveur n'a pas répondu correctement. Statut de la réponse : " +
          response.status
      );
  })
  .then((data) => {
    console.log("Data : ", data);
  })
  .catch((error) => {
    console.error(`Erreur attrapée : ${error}`);
  });
