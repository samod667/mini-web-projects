const container = document.getElementById('container');
const text = document.getElementById('text');

const totalTime = 7500;
const breatheTime = (totalTime / 5) * 2;
const holdTime = totalTime / 5;


breathAnimation();

function breathAnimation() {
    container.className = 'container grow';
    text.innerHTML = 'Breath in';

    setTimeout(() => {
        text. innerText = 'Hold'
        setTimeout(() => {
            container.classList.remove('grow');
            container.className = 'container shrink';
            text.innerText = 'Breathe out...'
        }, holdTime)
    }, breatheTime)
}


setInterval(breathAnimation, totalTime);