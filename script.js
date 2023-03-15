const inputContainer = document.getElementById("input-container");
const countdownForm = document.getElementById("countdownForm");
const dateEl = document.getElementById("data-picer");

const countdownEl = document.getElementById("countdown");
const countdownElTitle = document.getElementById("countdown-title");
const countdownButton = document.getElementById("countdown-button");
const timeElements = document.querySelectorAll("span");

const completeEl = document.getElementById('complete');
const completeElInfo = document.getElementById('complete-info');
const completeBtn = document.getElementById('complete-button');

let countdownTitle = '';
let countdownDate = '';
let countdownValue = Date;
let countdownActive;

const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;
// set date Input Min with today's date
const today = new Date().toISOString().split("T")[0];
dateEl.setAttribute("min", today);

// populate Countdown
function updateDom() {
    countdownActive = setInterval(() => {
        const now = new Date().getTime();
        const distance = countdownValue - now;
        console.log(distance); 
        const days = Math.floor(distance / day);
        const hours = Math.floor((distance % day) / hour);
        const minutes = Math.floor((distance % hour) / minute);
        const seconds = Math.floor((distance % minute) / second);
        console.log(days, hours, minutes, seconds);

        // hide input container
        inputContainer.hidden = true;
     
        // If the countdown has ended, show final state
    if (distance < 0) {
        countdownEl.hidden = true;
        clearInterval(countdownActive);
        completeElInfo.textContent = `${countdownTitle} finished on ${countdownDate}`;
        completeEl.hidden = false;
        } else {
        // else, show the countdown in progress
        countdownElTitle.textContent = `${countdownTitle}`;
        timeElements[0].textContent = `${days}`;
        timeElements[1].textContent = `${hours}`;
        timeElements[2].textContent = `${minutes}`;
        timeElements[3].textContent = `${seconds}`;
        completeEl.hidden = true;
        countdownEl.hidden = false;
        }

    }, second);
}

// collect form data
function updateCountdown(e) {
    e.preventDefault();
    countdownTitle = e.srcElement[0].value;
    countdownDate = e.srcElement[1].value;
    console.log(countdownTitle, countdownDate);
    // Get number version of current Date, updateDom
    if (countdownDate === '') {
        alert("Please insert Date Value")
    } else {
        countdownValue = new Date(countdownDate).getTime();
        console.log(countdownValue);
        updateDom();
    }
   
}


function reset() {
    // hide countdown and show Input
    countdownEl.hidden = true;
    completeEl.hidden = true;
    inputContainer.hidden = false;
    // stop the countdown 
    clearInterval(countdownActive);
    // reset values 
    countdownTitle = '';
    countdownDate = '';
}


// Event Listiners
countdownForm.addEventListener("submit", updateCountdown);
countdownButton.addEventListener("click", reset);
completeBtn.addEventListener("click", reset);