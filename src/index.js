let currentDate = new Date();

function todayDate() {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednsday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let currentMonth = months[currentDate.getMonth()];
  let currentDay = days[currentDate.getDay()];
  let dayDate = currentDate.getDate();
  let hour = currentDate.getHours();
  let minutes = ("0" + currentDate.getMinutes()).slice(-2);
  let sentence = `${currentDay}, ${dayDate} ${currentMonth}, ${hour}:${minutes}`;
  let mainDate = document.querySelector(".mainCard .dateTime");
  mainDate.innerHTML = sentence;
}

todayDate();

function formatHour(timestamp) {
  let date = new Date(timestamp * 1000);
  let hour = date.getHours();
  let hours = [
    "00:00",
    "01:00",
    "02:00",
    "03:00",
    "04:00",
    "05:00",
    "06:00",
    "07:00",
    "08:00",
    "09:00",
    "10:00",
    "11:00",
    "12:00",
    "13:00",
    "14:00",
    "15:00",
    "16:00",
    "17:00",
    "18:00",
    "19:00",
    "20:00",
    "21:00",
    "22:00",
    "23:00",
  ];

  return hours[hour];
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  return days[day];
}

function displayForecastNextDays(response) {
  console.log(response.data.daily);
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecastNextDays");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6 && index > 0) {
      forecastHTML =
        forecastHTML +
        `<div class="col-12">
                <div class="row underrow">
                  <div class="col underColDay">
                    <h6 class="forecastDay">${formatDay(forecastDay.time)}</h6>
                  </div>
                  <div class="col underCol">
                    <img
                      class="weatherIconDay"
                      src="icon-images/${forecastDay.condition.icon}.png"
                      alt="weatherIcon"
                    />
                  </div>
                  <div class="col underCol">
                    <h6 class="forecastTemperature">
                      <span class="maximumTemperatureNextDays">${Math.round(
                        forecastDay.temperature.maximum
                      )}°</span> /
                      <span class="minimumTemperatureNextDays">${Math.round(
                        forecastDay.temperature.minimum
                      )}°</span>
                    </h6>
                  </div>
                </div>
              </div>`;
    }
  });

  forecastHTML = forecastHTML + "</div>";
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let unit = "metric";
  let apiKey = "b63aaaf20055735f7aobt7dfe52195a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/forecast?lat=${coordinates.latitude}&lon=${coordinates.longitude}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(displayForecastNextDays);
}

function showData(response) {
  console.log(response.data.daily);
  console.log(response.data.condition.icon);
  document.querySelector("h2").innerHTML = response.data.city;
  document.querySelector(".temperatureMain").innerHTML = Math.round(
    response.data.temperature.current
  );
  document.querySelector("h4").innerHTML = response.data.condition.description;
  document.querySelector(".feelsLikeTemp").innerHTML = Math.round(
    response.data.temperature.feels_like
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.temperature.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector(".mainIcon")
    .setAttribute("src", `icon-images/${response.data.condition.icon}.png`);
  document
    .querySelector(".mainIcon")
    .setAttribute("alt", response.data.condition.description);
  document.body.style.backgroundImage = `url('cats-images/${response.data.condition.icon}.jpg')`;

  celsiusTemperature = response.data.temperature.current;

  getForecast(response.data.coordinates);
}

function searchCity(city) {
  let unit = "metric";
  let apiKey = "b63aaaf20055735f7aobt7dfe52195a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

function searchSubmitCity(event) {
  event.preventDefault();
  let city = document.querySelector("#input-city").value;
  searchCity(city);
}

let searchCityForm = document.querySelector("#search");
searchCityForm.addEventListener("submit", searchSubmitCity);

function handleGeolocation(position) {
  let lat = position.coords.latitude;
  let lon = position.coords.longitude;
  let unit = "metric";
  let apiKey = "b63aaaf20055735f7aobt7dfe52195a4";
  let apiUrl = `https://api.shecodes.io/weather/v1/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

function locationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleGeolocation);
}

let locationButton = document.querySelector("#location");
locationButton.addEventListener("click", locationTemp);

function getTempLondon(event) {
  event.preventDefault();
  searchCity("London");
}

let LondonButton = document.querySelector("#locationLondon");
LondonButton.addEventListener("click", getTempLondon);

function getTempNewYork(event) {
  event.preventDefault();
  searchCity("New York");
}

let NewYorkButton = document.querySelector("#locationNewYork");
NewYorkButton.addEventListener("click", getTempNewYork);

function getTempTokyo(event) {
  event.preventDefault();
  searchCity("Tokyo");
}

let TokyoButton = document.querySelector("#locationTokyo");
TokyoButton.addEventListener("click", getTempTokyo);

function desplayFahrenheitTemp(event) {
  event.preventDefault();
  celsiusLink.classList.remove("active");
  fahrenheitLink.classList.add("active");
  let temperatureElement = document.querySelector(".temperatureMain");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

let celsiusTemperature = null;

let fahrenheitLink = document.querySelector("#fahrenheit");
fahrenheitLink.addEventListener("click", desplayFahrenheitTemp);

function desplayCelsiusTemp(event) {
  event.preventDefault();
  celsiusLink.classList.add("active");
  fahrenheitLink.classList.remove("active");
  let temperatureElement = document.querySelector(".temperatureMain");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius");
celsiusLink.addEventListener("click", desplayCelsiusTemp);

searchCity("London");
