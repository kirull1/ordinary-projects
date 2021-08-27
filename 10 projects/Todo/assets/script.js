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

function addBlock(id, cont) {
    cont = JSON.parse(cont);
    let content = `<div id="${id}" class="value_block"><div class="value_block_cont"><button class="value_block_action ${cont.status === true ? 'value_block_action_corr' : ''}"></button><span class="value_text">${cont.content}</span></div><button class="del">x</button></div>`;
    document.querySelector('.content_value').insertAdjacentHTML('beforeend', content);
}

function addContent(cont) {
    let allEl = document.getElementsByClassName('value_block');
    let lastId;

    if(allEl.length !== 0){
        lastId = parseInt(allEl[allEl.length - 1].id) + 1;
    }else lastId = 1;

    let obj = `{"content":"${cont}","status":"false"}`;

    setStorage(lastId, obj);
    addBlock(lastId, obj);
}

function changeContent(id, type) {
    let value = getStorage(id);
    value.status = type;
    setStorage(id, value);
}

function start() {
    let content = {...getStorageAll()};
    for(el in content){
        addBlock(el, content[el]);
    }
}

document.querySelector('.content_value').onclick = (event) => {
    let val = event.target;
    let id = val.closest('.value_block').id;
    if(val.closest('.value_block_action') && !val.closest('.value_block_action_corr')){
        setStorage(id, `{"content":"${document.getElementById(id).getElementsByClassName('value_text')[0].innerHTML}","status":true}`);
        val.classList.add('value_block_action_corr');
    }else if(val.closest('.value_block_action') && val.closest('.value_block_action_corr')){
        setStorage(id, `{"content":"${document.getElementById(id).getElementsByClassName('value_text')[0].innerHTML}","status":false}`);
        val.classList.remove('value_block_action_corr');
    }else if(val.closest('.del')){
        deleteStorage(id);
        document.getElementById(id).remove();
    }
}

document.querySelector('.content_input').addEventListener('keydown', (event) => {
    if(event.keyCode === 13){
        if(event.target.value){
            addContent(event.target.value);
            event.target.value = '';
        }
    }
});

start()