const apiKey = "6cb08faa165808cef5f64335f15272fc";

fetch(
  `http://api.openweathermap.org/geo/1.0/direct?q=Daegu&limit=5&appid=${apiKey}`
)
  .then((res) => res.json())
  .then((data) => {
    let geo = data;

    fetch(
      `http://api.openweathermap.org/data/2.5/forecast?lat=${geo[0].lat}&lon=${geo[0].lon}&appid=${apiKey}`
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data);

        // Value of object
        const idWeather = document.getElementById("weather");
        const idCityName = document.getElementById("cityName");
        const idTempMin = document.getElementById("tempMin");
        const idTempMax = document.getElementById("tempMax");
        const idWindSpeed = document.getElementById("windSpeed");

        idCityName.textContent =
          JSON.stringify(data.city.name);
        idWeather.textContent =
          JSON.stringify(data.list[39].weather[0].main);
        idTempMin.textContent =
          "최저 온도 : " +
          Math.round(JSON.stringify(data.list[39].main.temp_min) - 273.15);
        idTempMax.textContent =
          "최고 온도 : " +
          Math.round(JSON.stringify(data.list[39].main.temp_max) - 273.15);
        idWindSpeed.textContent =
          "풍속 : " + JSON.stringify(data.list[39].wind.speed);
      });
  });
