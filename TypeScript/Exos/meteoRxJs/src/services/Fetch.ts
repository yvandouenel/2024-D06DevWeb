export default class Fetch {
  static urlMeteo = "https://api.open-meteo.com/v1/forecast";
  static params = {
    current: [
      "temperature_2m",
      "cloud_cover",
      "wind_speed_10m",
      "wind_direction_10m",
    ],
  };
  static loadTowns(query: string) {
    return fetch(
      `https://api-adresse.data.gouv.fr/search/?q=${query}&type=municipality`
    ).then((response: Response) => {
      if (response.status == 200) {
        return response.json();
      } else throw new Error(response.status.toString());
    });
  }

  static loadWetherForecast(lon: string, lat: string) {
    console.log(`Dans loadWetherForecast- lat - long`, lat, lon);
    return fetch(
      `${this.urlMeteo}?latitude=${lat}&longitude=${lon}&current=temperature_2m,cloud_cover,wind_speed_10m,wind_direction_10m`
    ).then((response) => {
      return response.json();
    });
  }
}
