"use strict";
//variables
const scoreBoard = document.querySelector(".jsScore");
const timeBoard = document.querySelector(".jsTime");
const btn= document.querySelector('.jsBtn');
const bowl= document.querySelector('.jsBowl');
const avocados = document.querySelectorAll('.jsAvocado');
const message = document.querySelector('.jsSms');
const MAX_TIME = 60;
const AVOCADO_NUMBERS = 9;
const AVOCADO_POSITION_UP = '-4px';
const AVOCADO_POSITION_DOWN = '48px';

let score= 0;
let counter = MAX_TIME;
let avocadoTimeUp = 1000;
let maxCurrentAvocados = 1;
let tempId;
let avocadoUpIntervalId;


//3-funciones
//sumar puntos a la puntuación
function addingScore(){
    score++;
    scoreBoard.innerHTML = `${score * 10}`;   
}
//cambiar el mensaje de abajo
function changeMessage(){
    if(counter === MAX_TIME){
        message.innerHTML = `Preparando los utensilios...`;
    }else if(counter >= MAX_TIME/3){
        message.innerHTML = `...añadiendo el resto de los ingredientes...`

    }else if(counter > 0 && counter <= MAX_TIME/3){
        message.innerHTML = `...¡¡Corre, el guacamole casi está listo!!...`
    
    }else{
        message.innerHTML = `Se acabó el tiempo, ¡a comer!`
    }
}
//conseguir que el aguacate salga de forma aleatoria
function randomAvocadoId(){
    const avocadoId =  Math.round(Math.random() * AVOCADO_NUMBERS);
    return avocadoId;
}

function randomAvocadoNumbers(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

//funcion terminar el juego
function endGame(){
    clearInterval(tempId);
    clearInterval(avocadoUpIntervalId);
    for (const avocado of avocados) {
        avocado.removeEventListener('click', addingScore);
    };  
}
//funcion cuenta atrás
function updateTimeRemaining() {
  counter--;
  timeBoard.innerHTML = counter;

  if (counter <= 0){
    endGame();
  }
  if (counter <= MAX_TIME/4){
    avocadoTimeUp = 500;
  }
  if (counter <= MAX_TIME -15){
    maxCurrentAvocados = 3;
  }

  changeMessage();
}
//función reiniciar juego

function restart(){
        endGame();
        score= 0;
        counter = MAX_TIME;
        avocadoTimeUp = 1000;
        maxCurrentAvocados = 1;
        scoreBoard.innerHTML = '0';
        timeBoard.innerHTML = `${MAX_TIME}`;
        btn.innerHTML = 'Start';
        changeMessage();
}
function letsPlay(){
    for(let j = 0; j < randomAvocadoNumbers(1,maxCurrentAvocados); j++){
        const selectedAvocado = randomAvocadoId();
        for (let i = 0; i < avocados.length; i++) {
            if(i === selectedAvocado) {
                avocados[i].style.top = AVOCADO_POSITION_UP;
                setTimeout(() => {
                    avocados[i].style.top = AVOCADO_POSITION_DOWN;
                }, avocadoTimeUp);
            }
        }
    }
}

//función comenzar el juego
function startGame(event){
    event.preventDefault();

    if(btn.innerHTML === "Reiniciar"){
        // window.location.reload();
        restart();
    } else { // Empezar el juego
        tempId = setInterval(updateTimeRemaining, 1000);
        avocadoUpIntervalId = setInterval(letsPlay, 2000);
        for (const avocado of avocados) {
            avocado.addEventListener('click', addingScore) 
        };
        btn.innerHTML = "Reiniciar";  
    }
}




//2-eventos

btn.addEventListener('click', startGame);
