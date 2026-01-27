const searchBtn = document.getElementById('searchBtn');
const cityInput = document.getElementById('cityInput');
const weatherResult = document.getElementById('weatherResult');

const API_KEY = "79c55fdba9cbbeed8e36bcbfb7969899";

searchBtn.addEventListener('click', getWeather);

async function getWeather() {
    const city = cityInput.value.trim();

    if (city === '') {
        alert('Enter city name');
        return;
    }

    weatherResult.innerHTML = "Loading...";

    try {
        const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
        );

        const data = await response.json();

        if (data.cod === "404") {
            weatherResult.innerHTML = "City not found";
            return;
        }

       const icon = data.weather[0].icon;

weatherResult.innerHTML = `
    <h2>${data.name}</h2>
    <img src="https://openweathermap.org/img/wn/${icon}@2x.png">
    <p>Temperature: ${data.main.temp}°C</p>
    <p>Weather: ${data.weather[0].description}</p>
    <p>Humidity: ${data.main.humidity}%</p>
`;

    } catch (error) {
        weatherResult.innerHTML = "Error fetching data";
    }
}
cityInput.addEventListener("keypress", function(e) {
    if (e.key === "Enter") {
        searchBtn.click();
    }
});
