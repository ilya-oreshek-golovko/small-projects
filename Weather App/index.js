const apiKey = "867b33897526ecff03865577896fa1df";
const weatherUrl = "https://api.openweathermap.org/data/2.5/weather";

// --------------------- Node Elements ---------------------
const searchInput = document.querySelector('.search__input'),
    btnSubmit     = document.querySelector('.search__btn-submit'),
    wind          = document.querySelector('.wind'),
    humidity      = document.querySelector('.humidity'),
    city          = document.querySelector('.weather__city'),
    temperature   = document.querySelector('.weather__temperature'),
    weatherImg    = document.querySelector('.weather__img');

searchInput.addEventListener("keypress", (e) => {
    if(e.key != "Enter") return;

    e.preventDefault();
    btnSubmit.click();
});

btnSubmit.addEventListener("click", (e) => {
    if(!searchInput.value) return;
    console.log(searchInput.value);

    getWeatherData(searchInput.value);
});

async function getWeatherData(cityName){
    const response = await fetch(weatherUrl + `?q=${cityName}&units=metric&appid=` + apiKey);
    const data = await response.json();
    console.log(data);
    if(data.cod != 200){
        document.querySelector('.error-body').style.display = 'block';
        document.querySelector('.weather-info').style.display = 'none';
        return;
    } 

    document.querySelector('.error-body').style.display = 'none';
    document.querySelector('.weather-info').style.display = 'block';
    wind.textContent = `${Math.round(data.wind.speed)} km/h`;
    humidity.textContent = `${data.main.humidity} %`;
    city.textContent = data.name;
    temperature.textContent = `${Math.round(data.main.temp)} °C`;
    weatherImg.src = `./images/${data.weather[0].main}.png`;

}