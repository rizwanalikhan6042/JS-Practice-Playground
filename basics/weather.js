const locationRef = document.querySelector('.time_location p');
const tempRef = document.querySelector('.temp');
const timeLocationRef = document.querySelector('.time_location span');
const imgRef = document.querySelector('.weather_condition p img');
const conditionRef = document.querySelector('.weather_condition span');
const inputRef = document.querySelector('nav input');

function renderWeatherData(weatherData) {
    tempRef.innerText = weatherData.current.temp_c;
    locationRef.innerText = weatherData.location.name;
    timeLocationRef.innerText = locationDetail(weatherData.current.last_updated, weatherData.current.is_day);
    conditionRef.innerText = weatherData.current.condition.text;
    imgRef.src = weatherData.current.condition.icon;
}

inputRef.addEventListener('submit', function(e){
   e.preventDefault();
   const inputRef = document.querySelector('input.searchField');
   const inputValue = inputRef.value;
   console.log(inputValue);
   fetchWeatherData(inputValue);
});

function fetchWeatherData(location){
    fetch(`https://api.weatherapi.com/v1/current.json?key=35af7ff606db422880d141328231305&q=${location}&aqi=no`)
    .then((res) => res.json())
    .then((data) => renderWeatherData(data))
    .catch((err) => console.error(err));
}
