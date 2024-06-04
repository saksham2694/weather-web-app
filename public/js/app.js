const searchBox = document.querySelector('.search-box');
searchBox.addEventListener('keypress', setQuery);

function setQuery(evt) {
    if (evt.keyCode == 13) {
        getResults(searchBox.value);
    }
}

let city = document.querySelector('.location .city');
let date = document.querySelector('.location .date');
let temp = document.querySelector('.current .temp');
let weather_el = document.querySelector('.current .weather');
let feelsLike = document.querySelector('.hi-low');


function getResults (location) {
    city.innerText = 'Loading...'
    date.innerText = ''
    temp.innerHTML = ''
    weather_el.innerText = ''
    feelsLike.innerHTML = ''

    fetch('/weather?address=' + location).then((response) => {
        response.json().then((data) => {
            if (data.error) {
                city.textContent = data.error
                console.log(data.error)
            } else {
                

                city.innerText = data.location

                let now = new Date();
                date.innerText = dateBuilder(now)

                let weathers = data.forecast.split(",")
                
                temp.innerHTML = `${Math.round(weathers[0])}<span>°C</span>`;
                weather_el.innerText = weathers[1];
                feelsLike.innerHTML = `${weathers[2]}<span>°c</span>.${weathers[3]}`;

                console.log(data.location)
                console.log(data.forecast)
            }
        })
    })
}


function dateBuilder (d) {
    let months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    let days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

    let day = days[d.getDay()];
    let date = d.getDate();
    let month = months[d.getMonth()];
    let year = d.getFullYear();

    return `${day} ${date} ${month} ${year}`;
}