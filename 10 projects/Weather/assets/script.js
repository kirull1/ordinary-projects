const apiKey = '628d709755a44712b28155321212608';

function getWearher(q) {
    let forecast = document.querySelector('.content');

    fetch(`http://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${q}&days=10&aqi=no&alerts=no`).then(data => data.json()).then(data => {
        document.querySelector('h1').innerHTML = Math.floor(data.current.temp_c) + '°';
        document.querySelector('.main_title').innerHTML = data.location.name + ', ' + data.location.country;
        document.querySelector('.main_text').innerHTML = data.current.condition.text;

        forecast.innerHTML = '';

        data.forecast.forecastday.forEach(el => {
            let date = new Date(el.date).toLocaleTimeString('en-us', {weekday: 'long'}).split(' ')[0];
            forecast.insertAdjacentHTML('beforeend', `<div class="content-block"><span>${date}</span><div class="content-block_text"><span>${Math.floor(el.day.avgtemp_c)}°</span><img class="img_content_block" src="http:${el.day.condition.icon}"></div></div>`)
        });
    });
}

async function getCity() {
    let location;
    let ip;
    await fetch('https://api.ipify.org?format=json').then(data => data.json()).then(data => {
        ip = data.ip;
    });
    await fetch(`http://api.ipstack.com/${ip}?access_key=e44bf08e75dca9e641808d0b479d521b`).then(data => data.json()).then(data => {
        location = data.city;
    });
    return location;
}

function update() {
    let val = document.querySelector('.search');
    if(val.value){
        getWearher(val.value);
        val.value = '';
    }
}

document.querySelector('button').onclick = update;
document.querySelector('.search').addEventListener('keydown', (event) => {
    if(event.keyCode === 13){
        update();
    }
});

getCity().then(data => getWearher(data));
