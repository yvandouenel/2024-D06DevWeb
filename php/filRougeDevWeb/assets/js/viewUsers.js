import Api from "./services/Api.js";
console.log(`Dans viewUser.js`);

// Si la page a l'id dynamical-user alors je continue le script
const id = document.getElementById("dynamical-user");

if (id) {
  console.log(`Dans la page qui contient l'élément qui a pour id dynamical-user`);
  // Appel asynchrone (non bloquant) au service qui va communiquer avec le serveur
  // Api.loadUsersFromApi();
  console.log(`Après l'appel de  Api.loadUsersFromApi`);

  // Gestion du click sur les boutons .btn-danger
  const btnDangers = document.querySelectorAll(".btn-danger");
  btnDangers.forEach(btn => {
    btn.addEventListener("click", (event) => {
      console.log(`Click sur le bouton de suppression`);


      // Suppression du div parent (pour l'affichage)
      const parentSection = event.target.parentElement;
      const userId = parentSection.getAttribute("data-userid");
      parentSection.remove();

      // Appel de la requête delete
      Api.deleteUserFromApi(userId)

    })
  });
}