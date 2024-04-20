const html  = document.querySelector('html');
const botonCorto = document.querySelector('.app__card-button--corto');
const botonEnfoque = document.querySelector('.app__card-button--enfoque');
const botonLargo = document.querySelector('.app__card-button--largo');
const banner = document.querySelector('.app__image');
const titulo = document.querySelector('.app__title');
const botones = document.querySelectorAll('.app__card-button');
const inputEnfoqueMusica = document.querySelector('#alternar-musica');
const botonesTodos = document.querySelectorAll('.app__card-button');
const botonIniciarPausar = document.querySelector('#start-pause');
const textoIniciarPausar = document.querySelector('#start-pause span');
const iconoIniciarPausar = document.querySelector('.app__card-primary-butto-icon');
const tiempoEnPantalla = document.querySelector('#timer');

const musica = new Audio('sonidos/luna-rise-part-one.mp3');
const musicaBeeb = new Audio('sonidos/beep.mp3');
const musicaPause = new Audio('sonidos/pause.mp3');
const musicaPlay = new Audio('sonidos/play.wav');

let tiempoTranscurridoEnsegundos = 1500;
let idIntervalo = null;

musica.loop = true;

inputEnfoqueMusica.addEventListener('change', () => {
    if (musica.paused) {
        musica.play();
    } else {
        musica.pause();
    }
})

botonEnfoque.addEventListener('click', () => {
    tiempoTranscurridoEnsegundos = 1500;
    cambiarContexto('enfoque');
    botonEnfoque.classList.add('active');
    botonesTodos.classList.add('active');
})

botonCorto.addEventListener('click', () => {
    tiempoTranscurridoEnsegundos = 300;
    cambiarContexto('descanso-corto');
    botonCorto.classList.add('active');
    botonesTodos.classList.add('active');
})

botonLargo.addEventListener('click', () => {
    tiempoTranscurridoEnsegundos = 900;
    cambiarContexto('descanso-largo');
    botonLargo.classList.add('active');
    botonesTodos.classList.add('active');
})

function cambiarContexto (contexto) {
    mostarTiempo();
    botonesTodos.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    botones.forEach(function (contexto) {
        contexto.classList.remove('active');
    })
    html.setAttribute('data-contexto', contexto);
    banner.setAttribute('src', `imagenes/${contexto}.png`);

    switch (contexto) {
        case 'enfoque':
            titulo.innerHTML = `
            Optimiza tu productividad,<br>
                <strong class="app__title-strong">sumérgete en lo que importa.</strong>`;
            break;
        case 'descanso-corto':
            titulo.innerHTML = `
            ¿Que tal tomar un respiro?
            <strong class="app__title-strong">¡Haz una pausa!</strong>`
            break;
        case 'descanso-largo':
            titulo.innerHTML = `
            Hora de volver a la superficie
            <strong class="app__title-strong">Haz una pausa larga</strong>`;
            break;
    }
}

const cuentaRegresiva = () => {
    if  (tiempoTranscurridoEnsegundos <= 0) {
        musicaBeeb.play();
        alert('¡Tiempo final!');
        reiniciar();
        return;
    }
    textoIniciarPausar.textContent = 'Pausar';
    iconoIniciarPausar.setAttribute('src', 'imagenes/pause.png');
    tiempoTranscurridoEnsegundos -= 1;
    mostarTiempo();
}

botonIniciarPausar.addEventListener('click', iniciarPausar);

function iniciarPausar () {
    if (idIntervalo) {
        musicaPause.play();
        reiniciar();
        return;
    }
    musicaPlay.play();
    idIntervalo = setInterval(cuentaRegresiva, 1000);   
}

function reiniciar () {
    clearInterval(idIntervalo);
    textoIniciarPausar.textContent = 'Comenzar';
    iconoIniciarPausar.setAttribute('src', 'imagenes/play_arrow.png');
    idIntervalo = null;
}

function mostarTiempo () {
    const tiempo = new Date(tiempoTranscurridoEnsegundos * 1000);
    const tiempoFormateado = tiempo.toLocaleTimeString('es-MX', {minute: '2-digit', second: '2-digit'});
    tiempoEnPantalla.innerHTML = `${tiempoFormateado}`;
}
mostarTiempo();