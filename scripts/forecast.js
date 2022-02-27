class Forecast {
  constructor() {
    this.key = "mfSpMFhKyCFqGSigFD2QnPTQyEwWOTTV";
    this.weatherURI = "http://dataservice.accuweather.com/currentconditions/v1/";
    this.cityURI = "http://dataservice.accuweather.com/locations/v1/cities/search";
  }
  // methods
  async updateCity(city) {
    const cityDetails = await this.getCity(city);
    const weather = await this.getWeather(cityDetails.Key);
    return { cityDetails, weather };
  }

  async getCity(city) {
    // query paramater - start with '?', next query starts with '&'
    const query = `?apikey=${this.key}&q=${city}`;
    const response = await fetch(this.cityURI + query);
    const data = await response.json();

    return data[0];
  }

  async getWeather(id) {
    // 'id' is the locationKey (cityDetails.key - line 10) and it goes before the query
    const query = `${id}?apikey=${this.key}`;
    const response = await fetch(this.weatherURI + query);
    const data = await response.json();

    return data[0];
  }
}

