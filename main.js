const apiKey = '88696efc50f0ce92ae2a33fec6ab7645';
const city = 'Daegu';

const mondayBtn = document.getElementById('mon');
const tuesdayBtn = document.getElementById('tues');
const wednesdayBtn = document.getElementById('wednes');
const thursdayBtn = document.getElementById('thurs');
const fridayBtn = document.getElementById('fri');
const saturdayBtn = document.getElementById('satur');
const sundayBtn = document.getElementById('sun');

mondayBtn.addEventListener('click', () => fetchWeatherForDay('월요일', 1));
tuesdayBtn.addEventListener('click', () => fetchWeatherForDay('화요일', 2));
wednesdayBtn.addEventListener('click', () => fetchWeatherForDay('수요일', 3));
thursdayBtn.addEventListener('click', () => fetchWeatherForDay('목요일', 4));
fridayBtn.addEventListener('click', () => fetchWeatherForDay('금요일', 5));
saturdayBtn.addEventListener('click', () => fetchWeatherForDay('토요일', 6));
sundayBtn.addEventListener('click', () => fetchWeatherForDay('일요일', 0));

function fetchWeatherForDay(day, dayIndex) {
    const weatherContainer = document.getElementById('weather-data');
    const currentDate = new Date();
    const currentDay = currentDate.getDay(); // 0 (일요일) 부터 6 (토요일) 까지

    // 요일 차이 계산
    const dayDifference = dayIndex - currentDay;
    const targetDate = new Date(currentDate);
    targetDate.setDate(currentDate.getDate() + dayDifference);

    const dateString = targetDate.toLocaleDateString('kr-KR', { month: 'long', day: 'numeric' });

    weatherContainer.innerHTML = `<h2>${day} 날씨 (${dateString})</h2>`;

    const apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;

    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            const filteredData = data.list.filter(item => {
                const dateTime = new Date(item.dt * 1000);
                const dayOfWeek = dateTime.getDay();
                return dayOfWeek === dayIndex;
            });

            if (filteredData.length > 0) {
                const weatherInfo = filteredData[0];
                const description = weatherInfo.weather[0].description;
                const rainProbability = (weatherInfo.pop * 100).toFixed(0); // Convert to percentage without decimals
                const minTemperature = weatherInfo.main.temp_min;
                const maxTemperature = weatherInfo.main.temp_max;

                weatherContainer.insertAdjacentHTML('beforeend', `<p>날씨 : ${description}</p>`);
                weatherContainer.insertAdjacentHTML('beforeend', `<p>최저 온도 : ${minTemperature.toFixed(2)}°C</p>`);
                weatherContainer.insertAdjacentHTML('beforeend', `<p>최고 온도 : ${maxTemperature.toFixed(2)}°C</p>`);
                weatherContainer.insertAdjacentHTML('beforeend', `<p>강수 확률 : ${rainProbability}%</p>`);
            } else {
                weatherContainer.textContent = '해당 날짜의 날씨 정보를 찾을 수 없습니다.';
            }
        })
        .catch(error => {
            console.error('날씨 정보를 가져오는 동안 오류 발생:', error);
            weatherContainer.textContent = '날씨 정보를 불러오지 못했습니다.';
        });
}
