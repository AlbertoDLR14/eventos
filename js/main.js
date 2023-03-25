let eventos = [];
let arr = []; //cargar la info y asignarla a events

const eventName = document.querySelector("#eventName");
const eventDate = document.querySelector("#eventDate");
const bAdd = document.querySelector("#bAdd");
const eventsContainer = document.querySelector("#eventsContainer");

const json = load();

try {
    arr = JSON.parse(json);
} catch (error) {
    arr = [];
}

eventos = arr ? [...arr] : [];
renderEvents();

document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    addEvent();
})
bAdd.addEventListener('click', e => {
    e.preventDefault();
    addEvent();
})

function addEvent(){
    if(eventName.value == '' || eventDate.value == ''){
        return;
    }

    if(dateDiff(eventDate.value) < 0){
        return;
    }

    const newEvent = {
        id: ((Math.random()*100).toString(36).slice(3)).toUpperCase(),
        name: eventName.value,
        date: eventDate.value,
    };

    eventos.unshift(newEvent);
    save(JSON.stringify(eventos));

    eventName.value = "";

    renderEvents();
}

function dateDiff(d){
    const dateTarget = new Date(d);
    const dateNow = new Date();
    const diferencia = dateTarget.getTime() - dateNow.getTime();
    const days = Math.ceil(diferencia / (1000 * 3600 * 24));
    return days;
}

function renderEvents(){
    const eventsHTML = eventos.map(event => {
        return `
        <div class="event">
            <div class="days">
                <span class="days-number">${dateDiff(event.date)}</span>
                <span class="days-text">días</span>
            </div>
            <div class="event-name">${event.name}</div>
            <div class="event-name">${event.date}</div>
            <div class="actions">
                <button class="eliminar" data-id="${event.id}">Eliminar</button>
            </div>
        </div>
        `;

    });
    eventsContainer.innerHTML = eventsHTML.join("");
    document.querySelectorAll(".eliminar").forEach(button =>{
        button.addEventListener('click', (e) => {
            const id = button.getAttribute('data-id');
            eventos = eventos.filter(event => event.id != id);
            save(JSON.stringify(eventos));
            renderEvents();
        })
    });
}

function save(data){
    localStorage.setItem('items', data);
}

function load(){
    return localStorage.getItem('items');
}
