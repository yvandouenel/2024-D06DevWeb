export default class Fetch {
  static urlFirstname = "https://api.nationalize.io/?name=";

  static async loadFirstNameCountries(firstname: string) {
    return fetch(`${this.urlFirstname}${firstname}`).then(
      (response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else throw new Error(response.status.toString());
      }
    );
  }
}
