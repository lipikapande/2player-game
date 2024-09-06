"use strict";

// selecting elements
const score0El = document.querySelector("#score--0");
const score1El = document.querySelector("#score--1");
const diceEl = document.querySelector(".dice");
const btnRollEl = document.querySelector(".btn--roll");
const btnNewEl = document.querySelector(".btn--new");
const btnHoldEl = document.querySelector(".btn--hold");
const current0El = document.querySelector("#current--0");
const current1El = document.getElementById("current--1");
const player0El = document.querySelector(".player--0");
const player1El = document.querySelector(".player--1");

//initial conditions
let currentScore = 0;
let activePlayer = 0;
let scores = [0, 0];
let playing = true;

const init = function () {
  currentScore = 0;
  scores = [0, 0];
  activePlayer = 0;
  playing = true;
  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  diceEl.classList.add("hidden");
  player0El.classList.remove("player--winner");
  player1El.classList.remove("player--winner");
  player0El.classList.add("player--active");
  player1El.classList.remove("player--active");
};

init();

const switchPlayer = function () {
  document.querySelector(`#current--${activePlayer}`).textContent = 0;
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  player0El.classList.toggle("player--active");
  player1El.classList.toggle("player--active");
};

//rolling dice functionality
btnRollEl.addEventListener("click", function () {
  if (playing) {
    //1. generating a random dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;
    //2. display dice
    diceEl.classList.remove("hidden");
    diceEl.src = `dice-${dice}.png`;
    //3. check for rolled 1: if true, switch to next player
    if (dice !== 1) {
      //add dice number to current score
      currentScore += dice;
      document.querySelector(`#current--${activePlayer}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }
  }
});

btnHoldEl.addEventListener("click", function () {
  if (playing) {
    //1. add current score to active player's score
    scores[activePlayer] += currentScore;
    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];
    //2.check if player's score=== 100. If yes, terminate the game
    if (scores[activePlayer] >= 10) {
      playing = false;
      diceEl.classList.add("hidden");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add("player--winner");
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove("player--active");
    } else {
      switchPlayer();
    }
    //switch to next player
  }
});

btnNewEl.addEventListener("click", init);
