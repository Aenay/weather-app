const apiKey = "79b04c8755c04f1f0eaf2e24f5a1a72d";
const apiUrl = "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";

const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");

async function checkWeather() {
    const city = document.querySelector(".search input").value;
    if (!city) {
        alert("Please enter a location.");
        return;
    }
    try {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);
        const data = await response.json();

        if (response.status == 404) {
            document.querySelector(".error").style.display = "block";
            document.querySelector(".weather").style.display = "none";
        } else {
            document.querySelector(".city").innerHTML = data.name;
            document.querySelector(".temperature").innerHTML = Math.round(data.main.temp) + "°C";
            document.querySelector(".speed").innerHTML = Math.round(data.wind.speed) + "km/h";
            document.querySelector(".hum").innerHTML = data.main.humidity + "%";

            if (data.weather[0].main == "Clouds") {
                weatherIcon.src = "images/clouds.png";
            } else if (data.weather[0].main == "Clear") {
                weatherIcon.src = "images/clear.png";
            } else if (data.weather[0].main == "Rain") {
                weatherIcon.src = "images/rain.png";
            } else if (data.weather[0].main == "Drizzle") {
                weatherIcon.src = "images/drizzle.png";
            } else if (data.weather[0].main == "Mist") {
                weatherIcon.src = "images/mist.png";
            }
            document.querySelector(".weather-container").style.display = "block";
            document.querySelector(".error").style.display = "none";
        }



    } catch (error) {
        console.error("Error fetching weather data:", error);
    }
}



searchBtn.addEventListener("click", () => {
    checkWeather(searchBox.value);
})