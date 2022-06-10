//query selectors
const EventContainer = document.getElementsByClassName('event-container');
const FormContainer = document.getElementsByClassName('form-container');

//event selectors
const DaysCount = document.querySelector('#days-count');
const HoursCount = document.querySelector('#hours-count');
const MinutesCount = document.querySelector('#minutes-count');
const SecondsCount = document.querySelector('#seconds-count');

//time selectors
const second = 1000;
const minute = second * 60;
const hour = minute * 60;
const day = hour * 24;

//countdown timer
let countdown;

function addHiddenClass(element) {
    element.classList.add('hidden');
    // element.hidden = true;
}

function removeHiddenClass(element) {
    element.classList.remove('hidden');
    // element.hidden = false;
}

function showForm() {
    removeHiddenClass(FormContainer);
    addHiddenClass(EventContainer);
}

function checkLocalStorage() {
    // FormContainer.hidden = true;
    // EventContainer.hidden = true;
    if (localStorage.getItem('eventTracker.event') === "", localStorage.getItem
        ('eventTracker.event') === "[]") {
        showForm();
    }
    else {
        const event = JSON.parse(localStorage.getItem('eventTracker.event'));
        showEvent(event.title, event.date);
    }
}

//event: window load
window.addEventListener('DOMContentLoaded', checkLocalStorage);



function showEvent(title, event) {

    // saveEventToLocalStorage(title, date);
    // startCountdownTimer(title, date);
    removeHiddenClass(EventContainer);
    addHiddenClass(FormContainer);
}

const form = document.getElementById('event-form').addEventListener('submit', (e) => {
    //const onClick = () => {
    e.preventDefault();
    const title = document.querySelector('#title');
    const eventInput = document.querySelector('#event');
    const event = new Date(eventInput.value).getTime();

    if (title.value === '' || eventInput.value === '') {
        return alert("Please enter a title and a date!");
    }
    showEvent(title.value, event);
    title.value = '';
    event.value = '';
})
// }
// )