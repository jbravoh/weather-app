// ======> DOM MANIPULATION <======

const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const forecast = new Forecast();

// ======> UPDATE UI <======

const updateUI = (data) => {
  // destructure data properties
  const { cityDetails, weather } = data;
  // update details template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
  `;
  // update the night/day & icon images
  const iconSrc = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSrc);
  let timeSrc = weather.IsDayTime ? "img/day.svg" : "img/night.svg"; // ternary operator
  time.setAttribute("src", timeSrc);
  // remove the d-none class if present
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

// ======> CITY FORM EVENT LISTENER  <======

cityForm.addEventListener("submit", (e) => {
  // prevent default action (reload page)
  e.preventDefault();
  // get city value
  const city = cityForm.city.value.trim();
  cityForm.reset();
  // update the ui with the new city
  // add updateCity is now a method on forecast
  forecast.updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
  //set local storage
  localStorage.setItem("city", city);
});

// ======> LOCAL STORAGE <======

if (localStorage.getItem("city")) {
  forecast.updateCity(localStorage.getItem("city"))
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));
}

/*

STEPS: 

1. cityForm.addEventListener(...)
    - Hear submit event
    - prevent default action
    - get the city value
    - reset the form
    - call updateCity() with the city the user types in.

2. updateCity function 
    - pass in city as a parameter
    - create variable 'cityDetails' and assign it to getCity() with 'city' as an argument
    - create variable 'weather' and assign it to getWeather() with 'cityDetails.Key' as an argument
    - return a new object with two properties, cityDetails & weather, and assign it the same named values or use object shorthand notation  

3. When promise resolves in called updateCity() function
    - take data and log it to the console using .then()
    - catch error if there is one using .catch()

4. updateUI()
    - create the updateUI function
    - change the updateCity.then(...) console.log(data) to updateUI(data)
    - destructure data.cityDetails and data.weather
    - update details template using .innerHTML
    - add a class 'd-none' to card section in html and write code to remove it
    - update the date & time icons

5. set localStorage()
  - in the eventListener and set local storage using the 'city' data
  - Create an if statement to see if you get the data in local storage 
  - If you theres data, then updateUI(data)
  - Add a catch statement if there's an error

*/
