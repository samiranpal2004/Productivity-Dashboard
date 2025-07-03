//For date and time
let dateElement = document.getElementById("date");
let timeElement = document.getElementById("day-time");
const months = [
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
const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];

function updateClock() {
  const now = new Date();
  //date
  const date = now.getDate();
  // console.log(date);
  const month = months[now.getMonth()];
  // console.log(month);
  const year = now.getFullYear();
  // console.log(year);

  //update the full date
  dateElement.innerText = `${date} ${month}, ${year}`;

  //day
  const day = days[now.getDay()];
  // console.log(day);
  //time
  const hour = now.getHours() % 12 || 12;
  // console.log(hour);
  const minute =
    now.getMinutes() < 10 ? `0${now.getMinutes()}` : now.getMinutes();
  // console.log(minute);
  // console.log(now.getSeconds());
  const amPm = now.getHours() >= 12 ? "PM" : "AM";

  //update the time and day
  timeElement.innerText = `${day}, ${hour}:${minute} ${amPm}`;
}
//initial call to update the clock
updateClock();
//update the clock every second
setInterval(updateClock, 1000);

// For location
const area = document.getElementById("area");

// Function to fetch location data using OpenCage Geocoding API
function getLocation(lat, lon) {
  let apiKey = "517c00b5724142a98973ab513316a839";
  let url = `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lon}&key=${apiKey}`;
  fetch(url)
    .then((rawData) => rawData.json())
    .then((data) => {
      console.log(data);
      const location = data.results[0].components;
      const state = location.state;
      console.log(state);
      const country = location.country;
      console.log(country);
      // Update the area element with the state and country
      area.innerText = `${state}, ${country}`;
      area.classList.remove("text-gray-500");
      area.classList.remove("animate-pulse");
    })
    .catch((error) => {
      console.error("Error fetching location data:", error);
      area.innerText = "Location not available";
    });
}

// For weather
let temp = document.getElementById("temp");
let wIcon = document.getElementById("wIcon");
let weth = document.getElementById("weth");
let preci = document.getElementById("preci");
let humidity = document.getElementById("humidity");
let wind = document.getElementById("wind");

// Function to fetch weather data using weatherapi API
function getWether(lat, lon) {
  let apiKey = "559412d7cc4a458ebb7145513252406";
  let url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${lat},${lon}&aqi=no`;
  fetch(url)
    .then((rawData) => rawData.json())
    .then((data) => {
      console.log(data);
      const weather = data.current;
      const temperature = weather.temp_c;
      console.log(temperature);
      temp.innerText = `${temperature}°C`;
      temp.classList.remove("animate-pulse");
      temp.classList.remove("text-gray-500");
      wIcon.src = weather.condition.icon;
      wIcon.classList.remove("bg-gray-500");
      wIcon.classList.remove("animate-pulse");
      const wType = weather.condition.text;
      console.log(wType);
      weth.innerText = wType;
      weth.classList.remove("text-gray-500");
      weth.classList.remove("animate-pulse");
      const precipitation = weather.precip_mm;
      console.log(precipitation);
      preci.innerText = `Precipitation: ${precipitation} mm`;
      preci.classList.remove("text-gray-500");
      preci.classList.remove("animate-pulse");
      const humi = weather.humidity;
      console.log(humi);
      humidity.innerText = `Humidity: ${humi}%`;
      humidity.classList.remove("text-gray-500");
      humidity.classList.remove("animate-pulse");
      const windSpeed = weather.wind_kph;
      console.log(windSpeed);
      wind.innerText = `Wind: ${windSpeed} kph`;
      wind.classList.remove("text-gray-500");
      wind.classList.remove("animate-pulse");
    })
    .catch((error) => {
      console.error("Error fetching weather data:", error);
    });
}

// Get the user's current position
navigator.geolocation.getCurrentPosition(
  (position) => {
    const lat = position.coords.latitude;
    const lon = position.coords.longitude;
    console.log(`Latitude: ${lat}, Longitude: ${lon}`);
    getLocation(lat, lon);
    getWether(lat, lon);
  },
  (error) => {
    console.error("Geolocation error:", error);
    area.innerText = "Location not available";
  },
  { enableHighAccuracy: true }
);
