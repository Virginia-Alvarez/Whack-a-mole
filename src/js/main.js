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

let score= 0;
let counter = MAX_TIME;
let tempId;

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
    }else if(counter >= MAX_TIME/2){
        message.innerHTML = `...añadiendo el resto de los ingredientes...`

    }else if(counter > 0 && counter <= MAX_TIME/4){
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
//funcion terminar el juego
function endGame(){
    clearInterval(tempId)
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
  changeMessage();
}
//función reiniciar juego

function restart(){
        endGame();
        score= 0;
        counter = MAX_TIME;
        scoreBoard.innerHTML = '0';
        timeBoard.innerHTML = `${MAX_TIME}`;
        btn.innerHTML = 'Start';
        changeMessage();
}
//función comenzar el juego
function startGame(event){
    event.preventDefault();

    if(btn.innerHTML === "Reiniciar"){
        // window.location.reload();
        restart();
    } else {
        tempId = setInterval(updateTimeRemaining, 1000);
        for (const avocado of avocados) {
            avocado.addEventListener('click', addingScore) 
        };
        btn.innerHTML = "Reiniciar";  
    }
}




//2-eventos

btn.addEventListener('click', startGame);
