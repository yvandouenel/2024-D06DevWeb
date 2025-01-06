export default class Fetch {
  static loadTowns(query: string) {
    return fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality`
    ).then((response: Response) => {
      if (response.status == 200) {
        return response.json();
      } else throw new Error(response.status.toString());
    });
  }
}
