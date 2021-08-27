const url = 'https://api.github.com/users/';
const main = document.querySelector('section');

function start(user) {
    let i = 0;
    fetch(url + user).then(data => data.json()).then(data => {
        main.querySelector('.content_image').setAttribute('src', data.avatar_url)
        main.querySelector('h2').innerHTML = data.name ? data.name : 'null';
        main.querySelector('.content_status_followers').innerHTML = data.followers;
        main.querySelector('.content_status_following').innerHTML = data.following;
        main.querySelector('.content_status_repos').innerHTML = data.public_repos;
        main.querySelector('.content_text').innerHTML = data.bio;
    });
    document.querySelector('.content_rep_block').innerHTML = '';
    fetch(`https://api.github.com/users/${user}/repos`).then(data => data.json()).then(data => {
        for(el of data){
            document.querySelector('.content_rep_block').insertAdjacentHTML('beforeend', `<a href="${el.html_url}" class="content_rep">${el.name}</a>`);
            if(i++ == 10) break;
        };
    });
}

document.querySelector('.search').addEventListener('keydown', (event) => {
    if(event.keyCode === 13){
        let val = event.target.value;
        if(!val.trim()) val = 'kirill22111333';
        start(val);
    }
});

start('kirill22111333')