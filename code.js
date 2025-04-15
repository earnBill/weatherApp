const inputCity = document.querySelector('.city-name');
const searchButton = document.querySelector('.search-button');
let cityName;
// async function getWeather() {
//     const response  = await fetch('https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/Trikala?key=LE3MMXGG34B5UKT9653UQ7KAL');
//     const weather = await response.json();
//     console.log(weather);
//     console.log(weather.address);
// }

// getWeather()

searchButton.addEventListener('click', ()=> {
    cityName = inputCity.value;
    console.log(cityName)
    fetch(`https://weather.visualcrossing.com/VisualCrossingWebServices/rest/services/timeline/${cityName}?key=LE3MMXGG34B5UKT9653UQ7KAL`)
    .then((response) => {
      return response.json()
    }).then((weather) => {
        console.log(weather);
        console.log(weather.address);
        console.log(weather.currentConditions.conditions);
    }).catch( error => {
        console.log(error);
    });
})


  
