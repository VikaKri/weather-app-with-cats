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

function showData(response) {
  document.querySelector("h2").innerHTML = response.data.name;
  document.querySelector(".temperatureMain").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("h4").innerHTML = response.data.weather[0].main;
  document.querySelector(".feelsLikeTemp").innerHTML = Math.round(
    response.data.main.feels_like
  );
  document.querySelector(".humidity").innerHTML = Math.round(
    response.data.main.humidity
  );
  document.querySelector(".wind").innerHTML = Math.round(
    response.data.wind.speed
  );
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

searchCity("London");

function temperatureFormat(event) {
  event.preventDefault();
  let target = event.target;
  let showMainTemp = document.querySelector(".temperatureMain");

  if (target.id === "celsius") {
    showMainTemp.innerHTML = 30;
  } else if (target.id === "fahrenheit") {
    let temperatureMainC = 30;
    showMainTemp.innerHTML = (temperatureMainC * 9) / 5 + 32;
  }
}

let mainTemperature = document.querySelector(".mainCardRight");
mainTemperature.addEventListener("click", temperatureFormat);
