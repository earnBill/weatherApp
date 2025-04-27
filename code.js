const inputCity = document.querySelector('.city-name');
const searchButton = document.querySelector('.search-button');
const city = document.querySelector('.city');
const weatherInfo = document.querySelector('.weather-info');
const time = document.querySelector('.time');
const description = document.querySelector('.description');
const weatherImage = document.querySelector('.weather-image');
const temprature = document.querySelector(".temprature");
const convertButton = document.querySelector('.convert-button');
const main = document.querySelector('main');
const mainContainer = document.querySelector('.main-container');
const header = document.querySelector('header');

let cityName = 'Athens';
let weatherPic;
let weatherTemp;
let loadingImg = document.createElement('img');
loadingImg.src = 'img/loading.gif';
loadingImg.style.display = 'none';
main.appendChild(loadingImg);


// async function getWeather() {
//     const response  = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Trikala?key=LE3MMXGG34B5UKT9653UQ7KAL');
//     const weather = await response.json();
//     console.log(weather);
//     console.log(weather.address);
// }

getWeather();

searchButton.addEventListener('click', ()=> {
  cityName = inputCity.value;
  mainContainer.style.display = 'none';
  loadingImg.style.display = 'block';
  convertButton.textContent = "°C";
  getWeather();
})

convertButton.addEventListener('click', () => {
  
  if (convertButton.textContent  === '°C') {
    convertButton.textContent = "°F";
    temprature.textContent = Math.round(toCelsius(temprature.textContent.slice(0,-2))) + '°C';
  } else {
    convertButton.textContent = "°C";
    temprature.textContent = weatherTemp + '°F'; 
  }
})


function getWeather() {
  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=LE3MMXGG34B5UKT9653UQ7KAL`)
  .then((response) => {
    return response.json()})
    .then((weather) => {
      console.log(weather);
      console.log(weather.address);
      console.log(weather.currentConditions.conditions);
      weatherPic = weather.currentConditions.icon;
      city.textContent = weather.resolvedAddress;
      time.textContent = weather.currentConditions.datetime.slice(0,5);
      weatherTemp = weather.currentConditions.temp;
      temprature.textContent = weather.currentConditions.temp + '°F';
      weatherInfo.textContent = weather.currentConditions.conditions;
      description.textContent = weather.description;
      loadingImg.style.display = 'none';
      mainContainer.style.display = "block";

      getPhoto();
  })
  .catch((error) => {
      console.log(error);
      loadingImg.style.display = 'none';
      mainContainer.style.display = "block";
      throwError();
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

function toCelsius(fahr) {
  console.log('its ok');
  return (fahr - 32) * (5 / 9);
}

function throwError() {
  alert('Please enter a corrent city Name');
}

