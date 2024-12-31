const apiKey = "79b04c8755c04f1f0eaf2e24f5a1a72d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");


async function fetchWeatherByCoordinates(lat, lon) {
    try {
        const response = await fetch(`${apiUrl}&lat=${lat}&lon=${lon}&appid=${apiKey}`);
        const data = await response.json();
        updateWeatherUI(data);
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}


async function fetchWeatherByCity(city) {
    try {
        const response = await fetch(`${apiUrl}&q=${city}&appid=${apiKey}`);
        const data = await response.json();
        if (response.status === 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather-container").style.display = "none";
        } else {
            updateWeatherUI(data);
        }
    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}

function updateWeatherUI(data) {
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
    document.querySelector(".speed").innerHTML = Math.round(data.wind.speed) + " km/h";
    document.querySelector(".hum").innerHTML = data.main.humidity + "%";

    const weatherMain = data.weather[0].main;
    if (weatherMain === "Clouds") {
        weatherIcon.src = "images/clouds.png";
    } else if (weatherMain === "Clear") {
        weatherIcon.src = "images/clear.png";
    } else if (weatherMain === "Rain") {
        weatherIcon.src = "images/rain.png";
    } else if (weatherMain === "Drizzle") {
        weatherIcon.src = "images/drizzle.png";
    } else if (weatherMain === "Mist") {
        weatherIcon.src = "images/mist.png";
    }

    document.querySelector(".weather-container").style.display = "block";
    document.querySelector(".error").style.display = "none";
}

function getUserLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                fetchWeatherByCoordinates(latitude, longitude);
            },
            (error) => {
                console.error("Geolocation error:", error);
                alert("Unable to retrieve your location. Please enter a city name.");
            }
        );
    } else {
        alert("Geolocation is not supported by this browser. Please enter a city name.");
    }
}

searchBtn.addEventListener("click", () => {
    const city = searchBox.value;
    if (city) {
        fetchWeatherByCity(city);
    } else {
        alert("Please enter a city name.");
    }
});

window.addEventListener("load", getUserLocation);