const cityData = [];

async function fetchText() {
  const API_KEY = "43d3a208aa47e06c1f9965395597f683";
  const city = document.querySelector(".cityname").value;
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

  try {
    const response = await fetch(apiUrl);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log('Weather Data:', data);

    const cityName = data.name;
    const weatherConditions = data.weather.map(weather => weather.description).join(', ');
    const temperature = data.main.temp;
    const countryCode = data.sys.country;
    const H = data.coord.lat;
    const L = data.coord.lon;
    const iconCode = data.weather[0].icon;
    // console.log(iconCode)

    cityData.push({
      city: cityName,
      temperature,
      countryCode,
      H,
      L,
      weatherConditions,
      iconCode,
    });

    cityData.sort((a, b) => a.city.localeCompare(b.city));

    const weatherBox = document.querySelector(".weather-box");
    weatherBox.innerHTML = '';

    cityData.forEach(city => {
        const iconUrl = `https://openweathermap.org/img/wn/${city.iconCode}.png`;
      weatherBox.innerHTML += `<div class="weather">
        <div class="box1">
          <h1 class="degree">${city.temperature}&deg;</h1>
          <img src="${iconUrl}" alt="weather">
        </div>
        <span class="temperature">H:${city.H}° L:${city.L}°</span>
        <div class="location-1">
          <p>${city.city}, ${city.countryCode}</p>
          <p>${city.weatherConditions}</p>
        </div>
      </div>`;
    });

    document.querySelector(".cityname").value = '';
  } catch (error) {
    console.error('Error fetching weather data:', error);
  }
}
