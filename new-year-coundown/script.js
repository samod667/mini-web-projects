const year = document.getElementById("year");
const days = document.getElementById("days");
const hours = document.getElementById("hours");
const minutes = document.getElementById("minutes");
const seconds = document.getElementById("seconds");
const countdown = document.getElementById("countdown");

const currentYear = new Date().getFullYear();

const getNewYear = new Date(`Janurary 01 ${currentYear + 1} 00:00:00`);

function updateCountdown() {
    const currentTime = new Date();
    const diff = getNewYear - currentTime;

    const d = Math.floor(diff / 1000 / 60 / 60 / 24);
    const h = Math.floor(diff / 1000 / 60 / 60) % 4;
    const m = Math.floor(diff / 1000 / 60) % 60;
    const s = Math.floor(diff / 1000) % 60;
    console.log(s);
};

updateCountdown();

