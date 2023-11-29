let zipCode = document.getElementById("zipInput");
let countryCode = document.getElementById("codeInput");
let btnElement = document.getElementById("btnElement");
let resultsContainer = document.getElementById("searchResults");
var d = new Date();
var weekday = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", ];

function CheckDay(day) {
    if (day + d.getDay() > 6) {
        return day + d.getDay() - 7;
    } else {
        return day + d.getDay();
    }
}

function createAndDisplay(data) {
    for (let i = 0; i < 5; i++) {

        let searchResultsContainer = document.createElement("div");
        searchResultsContainer.classList.add("results-container", "mb-3");
        resultsContainer.appendChild(searchResultsContainer);

        let paragraphEl = document.createElement("p");
        paragraphEl.textContent = weekday[CheckDay(i)];
        paragraphEl.classList.add("day");
        searchResultsContainer.appendChild(paragraphEl);

        let iconEl = document.createElement("img");
        iconEl.src = "http://openweathermap.org/img/wn/" + data.list[i].weather[0].icon + ".png";
        iconEl.classList.add("icon");
        searchResultsContainer.appendChild(iconEl);

        let temperatureElement = document.createElement("p");
        temperatureElement.textContent = "Temperature : " + Number(data.list[i].main.temp - 273.15).toFixed(2) + "°";
        temperatureElement.classList.add("temp");
        searchResultsContainer.appendChild(temperatureElement);

        let humidityElement = document.createElement("p");
        humidityElement.textContent = "Humidity : " + Number(data.list[i].main.humidity).toFixed(2);
        humidityElement.classList.add("humidity");
        searchResultsContainer.appendChild(humidityElement);

        let pressureElement = document.createElement("p");
        pressureElement.textContent = "Pressure : " + Number(data.list[i].main.pressure).toFixed(2);
        pressureElement.classList.add("pressure");
        searchResultsContainer.appendChild(pressureElement);
    }
}

function searchWeather() {
    let options = {
        method: "Get",
    };
    fetch('https://api.openweathermap.org/data/2.5/forecast?zip=' + zipCode.value + ',' + countryCode.value + '&appid=71401e943e50cf4c1b772bac26fe3360', options)
        .then(function(response) {
            return response.json();
        })
        .then(function(jsonData) {
            console.log(jsonData);
            createAndDisplay(jsonData);
        });
}

btnElement.addEventListener("click", searchWeather);