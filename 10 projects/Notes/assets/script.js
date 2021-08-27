const main = document.querySelector('section');
let correctElement = Math.min.apply(null, Array.from(correctEl()).map((el) => parseInt(el)));

function setContent(id, text) {
    let block = document.getElementById(id).getElementsByClassName('content_text')[0];
    block.innerHTML = text;
}

function setStorage(key, value) {
    localStorage.setItem(key, value);
}

function deleteStorage(key) {
    return localStorage.removeItem(key);
}

function getStorage(id) {
    return localStorage.getItem(id);
}

function getStorageAll() {
    return localStorage;
}

function createBlock() {
    let get = {...getStorageAll()};
    get = Object.keys(get);
    let id = get[get.length - 1];
    if(typeof id === 'undefined'){
        id = 1;
    }else{
        id++;
    }
    setStorage(id, '');
    addBlock(id, '');
    setStatusOn(id, '');
}

function setStatusOn(id, text) {
    let cont = document.getElementById(id);
    let block = cont.getElementsByClassName('content_block')[0];
    cont.setAttribute('data', 'edit');
    block.innerHTML = `<textarea class="content_edit content_text" cols="30" rows="6">${text.trim()}</textarea>`;
    cont.getElementsByClassName('saved')[0].style.display = 'flex';
    cont.getElementsByClassName('next')[0].style.display = 'none';
}

function setStatusOff(id, text) {
    let cont = document.getElementById(id);
    let block = cont.getElementsByClassName('content_block')[0];
    cont.setAttribute('data', 'read');
    block.innerHTML = `<span class="content_text">${text}</span>`;
    cont.getElementsByClassName('saved')[0].style.display = 'none';
    cont.getElementsByClassName('next')[0].style.display = 'flex';
}


function addBlock(id, text) {
    let content = `<div id="${id}" class="content" style="display: none;"><div class="head"><div class="head_group"><img class="head_img head_img_add" src="assets/image/add.png"><img style="margin-left: 20px;" class="head_img head_img_edit" src="assets/image/edit.png"></div><img class="head_img head_img_delete" src="assets/image/delete.png"></div><div class="content_block"><span class="content_text">${text}</span></div><div style="display: none;" class="but saved"><span class="save">SAVE</span></div><div class="but next"><span class="save">NEXT</span></div></div>`;
    main.insertAdjacentHTML('beforeend', content);
}

function deleteBlock(id) {
    document.getElementById(id).remove();
}

function findAncestor(el, cls) {
    while ((el = el.parentElement) && !el.classList.contains(cls));
    return el;
}

function correctEl() {
    let get = {...getStorageAll()};
    get = Object.keys(get);
    return get;
}

function nextEl(id) {
    let i = 0;
    id++;
    while(getStorage(id) === null){
        if(i++ == 10){
            id = Math.min.apply(null, Array.from(correctEl()).map((el) => parseInt(el)));
            break;
        }
        id++;
    }
    return id;
}

function prevEl(id) {
    let i = 0;
    while(getStorage(id) === null){
        if(i++ == 10){
            return false;
        }
        id--;
    }
    return id;
}

function selectEl(prev, id) {
    document.getElementById(prev).style.display = 'none';
    document.getElementById(prev).style.transform = 'translateY(110vh)';
    document.getElementById(id).style.display = 'block';
    setTimeout(() => {
        document.getElementById(id).style.transform = 'translateY(0)';
    }, 0);
}

function removeClass() {
    let el = document.getElementsByClassName('content_back1');
    for(val of el){
        val.classList.remove('content_back1');
    }
    el = document.getElementsByClassName('content_back2');
    for(val of el){
        val.classList.remove('content_back2');
    }
}

function start() {
    let st = {...getStorageAll()};
    for(el in st){
        addBlock(el, st[el]);
    }
    document.getElementById(correctElement).style.display = 'block';
    document.getElementById(correctElement).style.transform = 'translateY(0)';
}

start()

document.querySelector('section').onclick = (event) => {
    let place = event.target;
    if(place.closest('.head_img_edit')){
        let res = findAncestor(place, 'content');
        let el = res.getElementsByClassName('content_text')[0].innerHTML;
        if(res.getAttribute('data') != 'edit'){
            setStatusOn(res.id, el);
        }else{
            setStatusOff(res.id, el);
        }
    }else if(place.closest('.saved')){
        let res = findAncestor(place, 'content');
        let el = res.getElementsByClassName('content_text')[0].value;
        setStorage(res.id, el);
        setStatusOff(res.id, el);
    }else if(place.closest('.head_img_add')){
        createBlock();
    }else if(place.closest('.head_img_delete')){
        let res = findAncestor(place, 'content');
        selectEl(res.id, nextEl(res.id));
        deleteStorage(res.id);
        deleteBlock(res.id);
        removeClass(res.id);
    }else if(place.closest('.next')){
        let res = findAncestor(place, 'content');
        let next = nextEl(res.id);
        let prev1 = prevEl(res.id);
        let prev2 = prevEl(prev1 - 1);
        selectEl(res.id, next);
        removeClass(res.id);
        if(next > res.id){
            document.getElementById(prev1).classList.add('content_back1');
            document.getElementById(prev2).classList.add('content_back2');
        }
    }
};