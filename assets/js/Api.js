// Get DOM elements
var input = document.querySelector(".input-field");
var button = document.querySelector(".button");
var tempElement = document.querySelector(".temp");
var cityElement = document.querySelector(".city");
var humidityElement = document.querySelector(".humidity");
var windsElement = document.querySelector(".winds");

function showError(message) {
  alert(message);
}

function resetUI() {
  tempElement.innerHTML = "";
  cityElement.innerHTML = "";
  humidityElement.innerHTML = "";
  windsElement.innerHTML = "";
}

// Function to fetch weather data
function getWeather(city) {
  var apiKey = "e7aa4e3ffd5910f1e3be1e66e1968e79&units=metric";
  var apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetch(apiUrl)
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(
          "Error: Weather data not available for the entered city."
        );
      }
    })
    .then(function (data) {
      // Update DOM elements with weather data
      tempElement.innerHTML = Math.round(data.main.temp) + "°C";
      cityElement.innerHTML = data.name + " - City";
      humidityElement.innerHTML = Math.round(data.main.humidity) + "%";
      windsElement.innerHTML = Math.round(data.wind.speed) + " km/h";
    })
    .catch(function (error) {
      console.log(error);
      resetUI();
      showError("Error: Weather data not available for the entered city.");
    });
}

// Event listener for button click
button.addEventListener("click", function (event) {
  var city = input.value.trim();
  if (city !== "") {
    getWeather(city);
  }
});
