export default class Api {
  static loadUsersFromApi() {
    console.log(`dans loadUsersFromApi`);
    // On va utiliser la méthode fetch
    fetch('/api/users')
      .then(response => {
        console.log(`statut de la réponse`, response.status);
        return response.json();
      })
      .then(data => {
        console.log(`data`, data);
      })
      .catch(error => {
        console.log(`Erreur attrapée `, error);
      })
  }

  static deleteUserFromApi(userId) {
    console.log(`dans deleteUserFromApi`, userId);
    // On va utiliser la méthode fetch
    fetch(`/api/delete/user?id=${userId}`)
      .then(response => {
        console.log(`statut de la réponse`, response.status);
        return response.json();
      })
      .then(data => {
        console.log(`data`, data);
      })
      .catch(error => {
        console.log(`Erreur attrapée `, error);
      })
  }
}