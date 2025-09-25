      const apiKey = "db10ba2489824df8c0f58167d54e7733";
      const apiUrl =
        "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
      const cityName = document.querySelector(".search input");
      const searchBtn = document.querySelector(".search button");
      async function checkWeather(city) {
        const response = await fetch(apiUrl + city + `&appid=${apiKey}`);

        if (response.status == 404) {
          //Eğer hatalı bir şehir adı girildiyse hata mesajı göster
          document.querySelector(".error").style.display = "block";
          document.querySelector(".weather").style.display = "none";
          return;
        } else {
          //Geçerli bir şehir adı girildiyse hata mesajını gizle ve hava durumu bilgilerini göster
          var data = await response.json();

          document.querySelector(".city").innerHTML = data.name;
          document.querySelector(".temp").innerHTML =
            Math.round(data.main.temp) + "°C"; // Gelen derece bilgisini yuvarla ve °C ekle
          document.querySelector(".wind").innerHTML = data.wind.speed + " km/h";
          document.querySelector(".humidity").innerHTML =
            data.main.humidity + "%";

          if (data.weather[0].main == "Clouds") {
            document.querySelector(".weather-icon").src = "images/clouds.png";
          } else if (data.weather[0].main == "Clear") {
            document.querySelector(".weather-icon").src = "images/clear.png";
          } else if (data.weather[0].main == "Rain") {
            document.querySelector(".weather-icon").src = "images/rain.png";
          } else if (data.weather[0].main == "Drizzle") {
            document.querySelector(".weather-icon").src = "images/drizzle.png";
          } else if (data.weather[0].main == "Mist") {
            document.querySelector(".weather-icon").src = "images/mist.png";
          } else if (data.weather[0].main == "Snow") {
            document.querySelector(".weather-icon").src = "images/snow.png";
          }
          document.querySelector(".weather").style.display = "block";
          document.querySelector(".error").style.display = "none";
        }
      }

      searchBtn.addEventListener("click", () => {
        checkWeather(cityName.value);
      });
      cityName.addEventListener("keydown", (event) => {
        // Enter tuşuna basıldığında arama yap
        if (event.key === "Enter") {
          checkWeather(cityName.value);
        }
      });