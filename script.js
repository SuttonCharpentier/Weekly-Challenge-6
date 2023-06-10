// Variables
const searchBtn = document.querySelector('.btn');
const showCurrent = document.querySelector('.show-current-city');
const searchList = document.querySelector('.list-group');
const dayOne = document.querySelector('.day-1');
const dayTwo = document.querySelector('.day-2');
const dayThree = document.querySelector('.day-3');
const dayFour = document.querySelector('.day-4');
const dayFive = document.querySelector('.day-5');
const keyApi = 'a9e9a4caf387b979bb5c239fbceb489a';
const apiUrl = 'https://api.openweathermap.org/data/2.5';

// Get weather
function getWeather() {
    const city = JSON.parse(localStorage.getItem('coords'));
    fetch(`${apiUrl}/weather?lat=${city.lat}&lon=${city.long}&appid=${keyApi}&units=imperial`)
        .then(function(response){
            return response.json()
        })
        .then(function (data) {
            showCurrent.style.background = '#1986e6';
            showCurrent.style.opacity = '.7';
            showCurrent.style.borderRadius = '10px';
            showCurrent.innerHTML = `<p>${data.name} ${dayjs().format('MM/DD/YYYY')}<p/>
                    <img  class ="icon" src="http://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${data.main.temp} <p>
                    <p> ${'Humidity:'} ${data.main.humidity}</p>
                    <p>  ${'Wind:'} ${data.wind.speed}</p>`
// 5 days forecast
            fetch(`${apiUrl}/forecast?lat=${city.lat}&lon=${city.long}&appid=${keyApi}&units=imperial`)
                .then(function(response) {
                    return response.json()
                        .then(function (data) {
                            data.list.every(myFunction);
                            function myFunction(value, index, array) {
                                var arr = [];
                                for (i = 0; i < array.length; i = i + 8) {
                                    arr.push(array[i]);
                                }
                                dayOne.innerHTML =
                                    `
                                    <p>${dayjs().add(1, 'day').format('MM/DD/YY')}</p>
                    <img src="http://openweathermap.org/img/wn/${array[0].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[0].main.temp} <p>
                    <p> ${'Humidity:'} ${array[0].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[0].wind.speed}</p>`;
                                dayTwo.innerHTML =
                                    `<p>${dayjs().add(2, 'day').format('MM/DD/YY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[1].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[1].main.temp} <p>
                    <p> ${'Humidity:'} ${array[1].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[1].wind.speed}</p>`;
                                dayThree.innerHTML =
                                    `<p>${dayjs().add(3, 'day').format('MM/DD/YY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[2].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[2].main.temp} <p>
                    <p> ${'Humidity:'} ${array[2].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[2].wind.speed}</p>`;
                                dayFour.innerHTML =
                                    `<p>${dayjs().add(4, 'day').format('MM/DD/YY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[3].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[3].main.temp} <p>
                    <p> ${'Humidity:'} ${array[3].main.humidity}</p>
                    <p> ${'Wind:'} ${array[3].wind.speed}</p>`;
                                dayFive.innerHTML =
                                    `<p>${dayjs().add(5, 'day').format('MM/DD/YY')}</p>
                                    <img src="http://openweathermap.org/img/wn/${array[4].weather[0].icon}.png" alt=""> 
                    <p> ${'Temp:'} ${array[4].main.temp} <p>
                    <p> ${'Humidity:'} ${array[4].main.humidity}</p>
                    <p>  ${'Wind:'} ${array[4].wind.speed}</p>`;
                            }
                        }) 
                })
        })
    addText();
}
// Shows text above 5day forecast
function addText() {
    document.querySelector('.text').innerHTML = `
    <h3>5Day forecast</h3>
    `
}

 // Get the latitude and longitude of the city
function getLatitudeAndLongitude(name) {
    let cityName = name.length ? name : document.querySelector('#tags').value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${keyApi}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.length) {
                alert('City not found!')
                return
            }
            localStorage.clear()
            localStorage.setItem('coords', JSON.stringify({ lat: `${data[0].lat}`, long: `${data[0].lon}`, name: cityName }));
            getWeather();
            createButton();
        })
}
// Show weather clicking on a button.
function showWeatherClickingOnButton(name) {
    let cityName = name.length ? name : document.querySelector('#tags').value;
    fetch(`https://api.openweathermap.org/geo/1.0/direct?q=${cityName}&appid=${keyApi}`)
        .then(function (response) {
            return response.json();
        })
        .then(function (data) {
            if (!data.length) {
                testResult.style.border = "1px solid red";
                alert('City not found!')
                return
            }
            localStorage.clear();
            localStorage.setItem('coords', JSON.stringify({ lat: `${data[0].lat}`, long: `${data[0].lon}`, name: cityName }));
            getWeather();
        })
}
// Create a new city button
function createButton() {
    const city = JSON.parse(localStorage.getItem('coords'));
    fetch(`https://api.openweathermap.org/data/2.5/forecast?lat=${city.lat}&lon=${city.long}&appid=${keyApi}&units=imperial`)
    .then(function (response) {
        return response.json()
            .then(function (data) {
                    let list = document.createElement('button');
                    list.classList.add('btn', 'bg-primary', 'text-light', 'mt-2', 'btn-city');
                    list.setAttribute('data-city', city.name);
                    searchList.append(list);
                    list.textContent = city.name;
            })
    })
}

// Adds event listeners to the search list.
searchList.addEventListener('click', function (event) {
    let dataFromButton = event.target.getAttribute('data-city');
    showWeatherClickingOnButton(dataFromButton);
})
searchBtn.addEventListener('click', getLatitudeAndLongitude); 
