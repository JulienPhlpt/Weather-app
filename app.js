window.addEventListener("load", () => {
  let long;
  let lat;
  let temperatureDescription = document.querySelector(
    ".temperature-description"
  );

  let temperature = document.querySelector(".temperature-degree");
  let city = document.querySelector(".location-timezone");
  const date = document.getElementById("date");
  const icon = document.getElementById("icon");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition((position) => {
      long = position.coords.longitude;
      lat = position.coords.latitude;

      const API_KEY = "52bcc680401ac516888800f8805a3511";
      const api = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${long}&appid=${API_KEY}`;

      fetch(api)
        .then((response) => {
          return response.json();
        })
        .then((data) => {
          const today = new Date();
          const localOffset = data.timezone + today.getTimezoneOffset() * 60;
          const localDate = new Date(today.setUTCSeconds(localOffset));
          const options = {
            weekday: "long",
            month: "long",
            day: "numeric",
            hour: "numeric",
            minute: "numeric",
          };
          const formattedDate = localDate.toLocaleDateString("en-FR", options);
          const { temp } = data.main;
          const { description } = data.weather[0];

          date.innerText = formattedDate;
          icon.src = `https://openweathermap.org/img/w/${data.weather[0].icon}.png`;
          temperature.textContent = `${Math.round(temp) - 273}°C`;
          temperatureDescription.textContent = description.toUpperCase();
          city.textContent = `Weather in ${data.name}`;
        });
    });
  }
});

// const toggleIcon = document.getElementById("#icon");

const toggleZone = document.querySelector(".location");
const toggleTemp = document.querySelector(".temperature-degree");
const toggleIcon = document.querySelector(".temp-icon");

toggleZone.onclick = () => toggleZone.classList.toggle("toggle-zone");
toggleTemp.onclick = () => toggleTemp.classList.toggle("toggle-temp");
toggleIcon.onclick = () => toggleIcon.classList.toggle("toggle-icon");
