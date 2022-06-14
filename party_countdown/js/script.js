//query selectors
const EventContainer = document.getElementById('event-container');
const FormContainer = document.getElementById('form-container');

//event selectors
const DaysCount = document.getElementById('days-count');
const HoursCount = document.getElementById('hours-count');
const MinutesCount = document.getElementById('minutes-count');
const SecondsCount = document.getElementById('seconds-count');

//time
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//countdown timer
let countdown;

function addHiddenClass(element) {
    element.classList.add('hidden');
}

function removeHiddenClass(element) {
    element.classList.remove('hidden');
}

function deleteEventFromLocalStorage() {
    localStorage.setItem('eventTracker.event', '[]');
}


function saveEventToLocalStorage(title, date) {
    const event = {
        title,
        date,
    };
    localStorage.setItem('eventTracker.event', JSON.stringify(event));
}

function updateCoundown(date) {
    const currentTime = new Date().getTime();
    const countdownTime = date - currentTime;

    const newDay = Math.floor(countdownTime / day);
    const newHour = Math.floor((countdownTime % day) / hour);
    const newMinute = Math.floor((countdownTime % hour) / minute);
    const newSecond = Math.floor((countdownTime % minute) / second);

    DaysCount.innerHTML = newDay;
    HoursCount.innerHTML = newHour;
    MinutesCount.innerHTML = newMinute;
    SecondsCount.innerHTML = newSecond;

    if (newDay === 0 && newHour === 0 && newMinute === 0 && newSecond === 0) {
        // do this for 4 seconds
        var duration = 4 * 1000;
        var end = Date.now() + duration;

        (function frame() {
            // launch a few confetti from the left edge
            confetti({
                particleCount: 7,
                angle: 60,
                spread: 55,
                origin: { x: 0 }
            });
            // and launch a few from the right edge
            confetti({
                particleCount: 7,
                angle: 120,
                spread: 55,
                origin: { x: 1 }
            });

            // keep going until we are out of time
            if (Date.now() < end) {
                requestAnimationFrame(frame);
            }
        }());
        clearInterval(countdown);
        setTimeout(() => {
            showForm();
        }, 2000);
    }
}

function startCountdownTimer(title, date) {
    document.getElementById('event-title').innerHTML = title;
    updateCoundown(date);
    countdown = setInterval(() => {
        updateCoundown(date);
    }, 1000);
}

function showForm() {
    removeHiddenClass(FormContainer);
    addHiddenClass(EventContainer);
    deleteEventFromLocalStorage();
    const title = document.getElementById('title');
    title.focus();
    const date = document.getElementById('event');
    date.value = 'дд.мм.гггг --:--';
    document.body.style.background = "rgb(181,34,158)";
    document.body.style.background = "linear-gradient(320deg, rgba(181,34,158,1) 0%, rgba(104,100,255,1) 53%, rgba(79,229,228,1) 100%)";


}

function checkLocalStorage() {

    if (localStorage.getItem('eventTracker.event') === "", localStorage.getItem
        ('eventTracker.event') === "[]" || localStorage.getItem('eventTracker.event') === null) {
        showForm();
    }
    else {
        const event = JSON.parse(localStorage.getItem('eventTracker.event'));
        showEvent(event.title, event.date);
    }
}

//event: window load
window.addEventListener('DOMContentLoaded', checkLocalStorage);


function showEvent(title, date) {

    saveEventToLocalStorage(title, date);
    startCountdownTimer(title, date);
    removeHiddenClass(EventContainer);
    addHiddenClass(FormContainer);
    document.body.style.background = "rgb(254,255,0)";
    document.body.style.background = "linear-gradient(320deg, rgba(254,255,0,1) 0%, rgba(255,129,19,1) 53%, rgba(255,35,35,1) 100%)";


}

// const form = 
document.getElementById('event-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const title = document.getElementById('title');
    const eventInput = document.getElementById('event');
    const event = new Date(eventInput.value).getTime();
    let current = new Date().getTime();
    if (event === current || event < current) {
        return alert("Please enter a correct date!");
    }
    if (title.value === '' || eventInput.value === '') {
        return alert("Please enter a title and a date!");
    }
    showEvent(title.value, event);
    title.value = '';
    event.value = '';
})

