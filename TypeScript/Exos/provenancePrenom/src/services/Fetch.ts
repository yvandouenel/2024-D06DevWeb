import CountryCode, { CountryName } from "../interfaces/Country";

export default class Fetch {
  static urlFirstname = "https://api.nationalize.io/?name=";
  static urlCountryCode = "https://restcountries.com/v3.1/alpha/";

  static async loadFirstNameCountries(
    firstname: string
  ): Promise<{ country: CountryCode[] }> {
    return fetch(`${this.urlFirstname}${firstname}`).then(
      (response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else throw new Error(response.status.toString());
      }
    );
  }
  static async loadCountriesCode(countryCode: string): Promise<CountryName[]> {
    return fetch(`${this.urlCountryCode}${countryCode}`).then(
      (response: Response) => {
        if (response.status == 200) {
          return response.json();
        } else throw new Error(response.status.toString());
      }
    );
  }
}
