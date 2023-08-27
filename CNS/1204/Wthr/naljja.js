function updateClock() {
  const currentTime = new Date();
  const currentDate = currentTime.toLocaleDateString("kr-KR");
  const currentTimeString = currentTime.toLocaleTimeString("en-US");
  const currentTimeElement = document.getElementById("current-time");
  currentTimeElement.textContent = `현재 시간 : ${currentDate} ${currentTimeString}`;
}

setInterval(updateClock, 1000);
