function getUpLet() {
    return "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
}
function getLowLet() {
    return "abcdefghijklmnopqrstuvwxyz";
}
function getNum() {
    return "0123456789";
}
function getSym() {
    return "!\"#$%&'()*+,-./:;<=>?@[\\]^_`{|}~";
}

document.getElementById('button').onclick = () => {
    let length = document.getElementById('length').value;
    let uppercase = document.getElementById('uppercase');
    let lowercase = document.getElementById('lowercase');
    let numbers = document.getElementById('numbers');
    let symbols = document.getElementById('symbols');

    let string = '';
    let get = '';

    if(uppercase.checked === true) get += getUpLet();
    if(lowercase.checked === true) get += getLowLet();
    if(numbers.checked === true) get += getNum();
    if(symbols.checked === true) get += getSym();

    for(let i = 0; i < length; i++){
        string += get.charAt(Math.floor(Math.random() * get.length));
    }

    document.querySelector('#text').value = string;
}

document.getElementById('text').onclick = function() {
    this.select();
    document.execCommand('copy');
    alert('Password copied to clipboard');
}