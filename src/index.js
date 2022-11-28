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

function displayForecastToday() {
  let forecastElement = document.querySelector("#forecastToday");
  let forecastHTML = `<div class="row">`
  let hours = ["15:00", "16:00", "17:00", "18:00", "19:00"];
  hours.forEach(function(hour){
    forecastHTML = forecastHTML + `<div class="col">
              <form>
                <div class="forecastTimeToday">${hour}</div>
                <div class="forecastIconToday">
                  <img
                    class="weatherIcon-hour"
                    src="images/01d.png"
                    alt="weatherIcon"
                  />
                </div>
                <div class="forecastTemperatureToday">31°</div>
              </form>
              </div>`;
  })

  forecastHTML = forecastHTML + '</div>';
  forecastElement.innerHTML = forecastHTML;
}

function displayForecastNextDays() {
  let forecastElement = document.querySelector("#forecastNextDays");
  let forecastHTML = `<div class="row">`
  let days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"];
  days.forEach(function(day){
    forecastHTML = forecastHTML + `<div class="col-12">
                <div class="row underrow">
                  <div class="col underCol">
                    <h6 class="forecastDay">${day}</h6>
                  </div>
                  <div class="col underCol">
                    <img
                      class="weatherIcon-day"
                      src="images/01d.png"
                      alt="weatherIcon"
                    />
                  </div>
                  <div class="col underCol">
                    <h6 class="forecastTemperature">
                      <span class="maximumTemperatureNextDays">38°</span> /
                      <span class="minimumTemperatureNextDays">25°</span>
                    </h6>
                  </div>
                </div>
              </div>`;
  })

  forecastHTML = forecastHTML + '</div>';
  forecastElement.innerHTML = forecastHTML;
}

function showData(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector(".temperatureMain").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h4").innerHTML = response.data.weather[0].description;
  document.querySelector(".feelsLikeTemp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
  document
    .querySelector(".mainIcon")
    .setAttribute("src", `images/${response.data.weather[0].icon}.png`);
  document
    .querySelector(".mainIcon")
    .setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;
}

function searchCity(city) {
  let unit = "metric";
  let apiKey = "143a36703971e065c5d4b5c5115143f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${unit}`;

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
  let apiKey = "143a36703971e065c5d4b5c5115143f0";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}&units=${unit}`;

  axios.get(apiUrl).then(showData);
}

function locationTemp(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(handleGeolocation);
}

let button = document.querySelector("#location");
button.addEventListener("click", locationTemp);

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

displayForecastToday();
displayForecastNextDays();
searchCity("London");

