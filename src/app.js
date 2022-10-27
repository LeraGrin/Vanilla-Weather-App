function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function displayWeather(response) {
  console.log(response.data);
  document.querySelector("#currentCity").innerHTML = response.data.city;
  document.querySelector("#temperature").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("#humid").innerHTML =
    response.data.temperature.humidity;
  document.querySelector("#wind").innerHTML = response.data.wind.speed;
  document.querySelector("#currentCondition").innerHTML =
    response.data.condition.description;
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute("src", `${response.data.condition.icon_url}`);
}

function searchCity(city) {
  let apiKey = "f48132e9ad6t75094b2a9333aba47o8f";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}`;
  axios.get(apiUrl).then(displayWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#inputCity").value;
  searchCity(city);
}

function convertToFahrenheit(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 66;
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature");
  temperatureElement.innerHTML = 19;
}

function searchLocation(position) {
  let apiKey = "f48132e9ad6t75094b2a9333aba47o8f";
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lon=${lon}&lat=${lat}&key=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeather);
}
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let dateElement = document.querySelector("#currentDate");
let currentTime = new Date();

let searchForm = document.querySelector("#form");

let currentLocationButton = document.querySelector("#currentLocBtn");
currentLocationButton.addEventListener("click", getCurrentLocation);

searchForm.addEventListener("submit", handleSubmit);
dateElement.innerHTML = formatDate(currentTime);

searchCity("Amsterdam");
