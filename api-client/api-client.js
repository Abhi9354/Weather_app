window.addEventListener("load", EnterCityName);
const weatherIcon = document.querySelector(".weather-icon");
function EnterCityName() {
  console.log("entercity called..");
  const cityname = document.querySelector("#search-city");

  const searchButton = document.querySelector(".search button");
  searchButton.addEventListener("click", () => {
    getDataFromApi(cityname.value);
  });
}

export async function getDataFromApi(cityname) {
  console.log("citynaem is...", cityname);
  const URL = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
  const API = "&appid=90d8a3a0dcdf1444068b468698f1509b";
  const response = await fetch(URL + cityname + API);
  if (response.status == 404) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    var data = await response.json();
    console.log("data is ", data);
    showData(data);
  }
}
function showData(data) {
  const city = document.querySelector(".city");
  city.innerHTML = data.name;
  const temp = document.querySelector(".temp");
  temp.innerHTML = data.main.temp + " °C";
  const humidity = document.querySelector(".humidity");
  humidity.innerHTML = data.main.feels_like + " %";
  const windSpeed = document.querySelector(".wind");
  windSpeed.innerHTML = data.wind.speed + " km/h";
  if (data.weather[0].main == "Clouds") {
    weatherIcon.src = "images/clouds.png";
  } else if (data.weather[0].main == "Rain") {
    weatherIcon.src = "images/rain.png";
  } else if (data.weather[0].main == "Clear") {
    weatherIcon.src = "images/clear.png";
  } else if (data.weather[0].main == "Drizzle") {
    weatherIcon.src = "images/drizzle.png";
  } else if (data.weather[0].main == "Mist") {
    weatherIcon.src = "images/mist.png";
  }
  const weather = document.querySelector(".weather");
  weather.style.display = "block";
}
