export default class FetchCountries {
  static loadCountries(query: string) {
    return fetch(`https://restcountries.com/v3.1/name/${query}`)
      .then((response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else throw new Error(response.status.toString());
      })
      .then((data) => {
        console.log(`Data récupérée :`, data);
        return data;
      });
  }
}
