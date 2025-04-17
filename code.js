const inputCity = document.querySelector('.city-name');
const searchButton = document.querySelector('.search-button');
const city = document.querySelector('.city');
const weatherInfo = document.querySelector('.weather-info');


let cityName;
let weatherPic;

// async function getWeather() {
//     const response  = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Trikala?key=LE3MMXGG34B5UKT9653UQ7KAL');
//     const weather = await response.json();
//     console.log(weather);
//     console.log(weather.address);
// }

// getWeather()

function getWeather() {
  cityName = inputCity.value;
  console.log(cityName);

  fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=LE3MMXGG34B5UKT9653UQ7KAL`)
  .then((response) => {
    return response.json()
  }).then((weather) => {
      console.log(weather);
      console.log(weather.address);
      console.log(weather.currentConditions.conditions);
      weatherPic = 'cloudy';
      city.textContent = cityName;
      weatherInfo.textContent = weather.currentConditions.conditions;
      getPhoto();
  }).catch( error => {
      console.log(error);
  });
}

function getPhoto() {
  console.log(weatherPic);
  fetch(`https://api.giphy.com/v1/gifs/search/tags?api_key=VzxsoPxqRsGjsOj39PEYhqzUmS0ZLT3U&q=${weatherPic}&limit=25&offset=0`)
  .then(response => {
    return response.json();
  }).then(image => {
    console.log(image);
  }).catch(error => {
    console.log(error);
  });
}

searchButton.addEventListener('click', ()=> {
   getWeather();
   getPhoto();
})





  
