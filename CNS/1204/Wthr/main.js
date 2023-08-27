const apiKey =
  "HWlook6qqV8qC8xxi2SJmPQwSCeJ8hYnidb6MMW1H3egdrPArSiOTO8IQ9e%2B0PhXHv9JwvaXj4EF4nMCP%2Fx8Aw%3D%3D";
const city = "Daegu";
const apiUrl = `https://apis.data.go.kr/1360000/VilageFcstInfoService_2.0/getVilageFcst?serviceKey=${apiKey}&pageNo=1&numOfRows=20&dataType=JSON&base_date=20230827&base_time=0500&nx=89&ny=91`;

const monBtn = document.getElementById("mon");
const tuesBtn = document.getElementById("tues");
const wednBtn = document.getElementById("wednes");
const thursBtn = document.getElementById("thurs");
const friBtn = document.getElementById("fri");

monBtn.addEventListener("click", () => fetchWeatherForDay("Monday"));
tuesBtn.addEventListener("click", () => fetchWeatherForDay("Tuesday"));
wednBtn.addEventListener("click", () => fetchWeatherForDay("Wednesday"));
thursBtn.addEventListener("click", () => fetchWeatherForDay("Thursday"));
friBtn.addEventListener("click", () => fetchWeatherForDay("Friday"));

function fetchWeatherForDay(day) {
  const weatherContainer = document.getElementById("weather-data");
  weatherContainer.innerHTML = `<h2>${day}</h2>`;

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      const filteredData = data.list.filter((item) => {
        const dateTime = new Date(item.dt * 1000);
        const dayOfWeek = dateTime.toLocaleDateString("en-US", {
          weekday: "long",
        });
        return dayOfWeek === day;
      });

      if (filteredData.length > 0) {
        const weatherInfo = filteredData[0];
        const description = weatherInfo.weather[0].description;
        const rainPro = (weatherInfo.pop * 100).toFixed(0); // Convert to percentage without decimals
        const minTemp = weatherInfo.main.temp_min;
        const maxTemp = weatherInfo.main.temp_max;

        weatherContainer.insertAdjacentHTML(
          "beforeend",
          `<p>weather : ${description}</p>`
        );
        weatherContainer.insertAdjacentHTML(
          "beforeend",
          `<p>Minimum temperature : ${minTemp.toFixed(2)}°C</p>`
        );
        weatherContainer.insertAdjacentHTML(
          "beforeend",
          `<p>highest temperature : ${maxTemp.toFixed(2)}°C</p>`
        );
        weatherContainer.insertAdjacentHTML(
          "beforeend",
          `<p>rain probability : ${rainPro}%</p>`
        );
      } else {
        weatherContainer.textContent = "Not Found";
      }
    })
    .catch((error) => {
      console.error("날씨 정보를 가져오는 동안 오류 발생:", error);
      weatherContainer.textContent = "날씨 정보를 불러오지 못했습니다.";
    });
}
