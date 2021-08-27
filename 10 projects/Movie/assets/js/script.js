const key = 'd0b276c44968a2419ccdf07968e7b1df';
const movieApiUrl = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${key}&page=1`;
const movieSearch = `https://api.themoviedb.org/3/search/movie?api_key=${key}&query=`;
const movApi = (id) => { return `https://api.themoviedb.org/3/movie/${id}?api_key=${key}&language=en-US`; }
const newMain = document.querySelector('.main_new');
const main = document.querySelector('main');

function setMovie(data, place){
    let movie = `<a  href="#" data="${data.id}" class="main_content_block_value"><img class="main_content_block_image" src="https://image.tmdb.org/t/p/w500/${data.poster_path}"><div class="main_content_text"><span class="movie_name">${data.title}</span><span class="rating">${data.vote_average}</span></div></a>`;
    let wh = document.getElementsByClassName(place);
    wh[0].innerHTML += movie;
    wh[1].innerHTML += movie;
}

function getTime(min) {
    let hour = 0;
    while(min > 60){
        hour++;
        min -= 60;
    }
    return `${hour}h ${min}min`;
}

function correctPage(id) {
    fetch(movApi(id)).then((data) => data.json()).then((data) => {
        document.querySelector('.content_main_block_img').setAttribute('src', 'https://image.tmdb.org/t/p/w500/' + data.poster_path);
        document.querySelector('h1').innerText = data.title;
        document.querySelector('.content_main_text').querySelector('span').innerText = data.overview.length == 1 ? data.overview + '.0' : data.overview;
        document.querySelector('.content_main_block_group_text').innerText = data.vote_average;
        document.querySelector('.total').innerText = data.vote_count;
        document.getElementById('runtime').innerHTML = getTime(data.runtime);
        console.log(data);
    });
}

function openPage() {
    newMain.style.cssText = `transform : translateX(0%);`;
    main.style.cssText = `overflow : hidden;`;
}

function closePage() {
    newMain.style.cssText = `transform : translateX(105%);`;
    main.style.cssText = `overflow : scroll;`;
}

function start() {
    let page = '<div class="main_content"><div class="main_content_title"><h3>Fantasy/Science fiction</h3><a class="main_content_title_a" href="#">See all ></a></div><div class="main_contents"><div class="shodow"></div><div class="main_content_block"></div></div></div>';
    document.querySelector('main').insertAdjacentHTML('beforeend', page);
    document.querySelector('main').insertAdjacentHTML('beforeend', page);

    document.querySelectorAll('.main_search_content').forEach(el => {
        el.remove();
    });


    fetch(movieApiUrl).then((data) => data.json()).then((data) => {
        data = data.results;
        for(el of data){
            setMovie(el, 'main_content_block');
        }
    });

    const block = document.getElementsByClassName('main_content_block')[0];

    block.onclick = (event) => {
        let target = event.target.closest('.main_content_block_value');
        correctPage(target.getAttribute('data'));
        openPage();
    };
}

document.querySelector('.header_back').onclick = () => {
    closePage();
};

function search(text){
    document.querySelectorAll('.main_content').forEach(el => {
        el.remove();
    });
    document.querySelectorAll('.main_search_content').forEach(el => {
        el.remove();
    });
    if(document.getElementsByClassName('main_search_content')){
        let el = document.createElement('div');
        document.querySelector('main').append(el);
        el.setAttribute('class', 'main_search_content');
    }
    fetch(movieSearch + text).then(el => el.json()).then(el => {
        for(data of el.results){
            let elem = `<a  href="#" data="${data.id}" class="main_content_block_value main_search_content_a"><img class="main_content_block_image" src="https://image.tmdb.org/t/p/w500/${data.poster_path}"><div class="main_content_text"><span class="movie_name">${data.title}</span><span class="rating">${data.vote_average}</span></div></a>`;
            document.querySelector('.main_search_content').insertAdjacentHTML('beforeend', elem);
        }
    });

    const block = document.getElementsByClassName('main_search_content')[0];

    block.onclick = (event) => {
        let target = event.target.closest('.main_content_block_value');
        correctPage(target.getAttribute('data'));
        openPage();
    };
}

document.querySelector('.input_form').oninput = (event) => {
    let s = event.target.value;
    if(s.length > 0){
        search(s);
    }else start();
};

start();