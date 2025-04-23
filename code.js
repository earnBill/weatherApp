const inputCity = document.querySelector('.city-name');
const searchButton = document.querySelector('.search-button');
const city = document.querySelector('.city');
const weatherInfo = document.querySelector('.weather-info');
const time = document.querySelector('.time');
const description = document.querySelector('.description');
const weatherImage = document.querySelector('.weather-image');
const temprature = document.querySelector(".temprature");

let cityName = 'Athens';
let weatherPic;

// async function getWeather() {
//     const response  = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Trikala?key=LE3MMXGG34B5UKT9653UQ7KAL');
//     const weather = await response.json();
//     console.log(weather);
//     console.log(weather.address);
// }

getWeather();
console.log('eeeeeeeeeeeeeeee');

function getWeather() {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=LE3MMXGG34B5UKT9653UQ7KAL`)
  .then((response) => {
    return response.json()
  }).then((weather) => {
      console.log(weather);
      console.log(weather.address);
      console.log(weather.currentConditions.conditions);
      weatherPic = weather.currentConditions.icon;
      city.textContent = weather.resolvedAddress;
      time.textContent = weather.currentConditions.datetime.slice(0,5);
      temprature.textContent = weather.currentConditions.temp + '°F';
      weatherInfo.textContent = weather.currentConditions.conditions;
      description.textContent = weather.description;
      getPhoto();
  }).catch( error => {
      console.log(error);
  });
}

function getPhoto() {
  console.log(weatherPic);
  fetch(`https://api.giphy.com/v1/gifs/translate?api_key=VzxsoPxqRsGjsOj39PEYhqzUmS0ZLT3U&s=${weatherPic}`)
  .then(response => {
    return response.json();
  }).then(image => {
    console.log(image);
    weatherImage.src = image.data.images.original.url;
  }).catch(error => {
    console.log(error);
  });
}

searchButton.addEventListener('click', ()=> {
  cityName = inputCity.value;
  console.log(cityName);
  getWeather();
})


