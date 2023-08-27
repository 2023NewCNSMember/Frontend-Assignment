const apiKey = '6cb08faa165808cef5f64335f15272fc';

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
      .then((data) => console.log(data));
  });