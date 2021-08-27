const c = document.getElementById('c');

let context = c.getContext('2d');
context.fillStyle = 'white';
context.fillRect(0, 0, c.width, c.height);

let color = '#ffffff';
let size = 2;
let drawing = false;

c.addEventListener('touchstart', start, false);
c.addEventListener('touchmove', draw, false);
c.addEventListener('mousedown', start, false);
c.addEventListener('mousemove', draw, false);

c.addEventListener('touchend', stop, false);
c.addEventListener('mouseup', stop, false);
c.addEventListener('mouseout', stop, false);

function start(event) {
    drawing = true;
    context.beginPath();
    context.moveTo(event.clientX - c.offsetLeft, event.clientY - c.offsetTop + 20);
    event.preventDefault();
}

function draw(event) {
    if(drawing){
        getParam();
        context.lineTo(event.clientX - c.offsetLeft, event.clientY - c.offsetTop + 20);
        context.strokeStyle = color;
        context.lineWidth = size;
        context.lineCap = 'round';
        context.lineJoin = 'round';
        context.stroke();
    }
    event.preventDefault();
}

function stop(event) {
    if(drawing){
        context.stroke();
        context.closePath();
        drawing = false;
    }
    event.preventDefault();
}

function getParam() {
    color = document.querySelector('input[type=color]').value;
    size = document.querySelector('input[type=range]').value;
}

document.querySelector('button').onclick = () => {
    context.fillStyle = 'white';
    context.clearRect(0, 0, c.width, c.height);
    context.fillRect(0, 0, c.width, c.height);
}