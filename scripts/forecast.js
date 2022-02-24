// ======> INTEREACTING WITH APIS <======

const key = "mfSpMFhKyCFqGSigFD2QnPTQyEwWOTTV";

// ===> GET WEATHER INFORMATION

const getWeather = async (id) => {
  const base = "http://dataservice.accuweather.com/currentconditions/v1/";
  // 'id' is the locationKey and it goes before the query
  const query = `${id}?apikey=${key}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// ===> GET CITY INFORMATION

const getCity = async (city) => {
  const base = "http://dataservice.accuweather.com/locations/v1/cities/search";
  // query paramater - start with '?', next query starts with '&'
  const query = `?apikey=${key}&q=${city}`;

  const response = await fetch(base + query);
  const data = await response.json();

  return data[0];
};

// getCity("manchester")
//   .then((data) => {
//     return getWeather(data.Key);
//   })
//   .then((data) => {
//     console.log(data);
//   })
//   .catch((err) => console.log(err));

// getWeather("329260");
