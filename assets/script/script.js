const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0;
let matchedCount = 0;
let timer;
let seconds = 0;

function previewCards() {
  cards.forEach((card) => card.classList.add("flip"));

  // Cachez les cartes après 3 secondes
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip"));
  }, 2000);
}

// Appel de la fonction preview au chargement de la page
window.onload = () => {
  shuffle();
  previewCards();
};

function startTimer() {
  timer = setInterval(function () {
    seconds++;
    document.getElementById("timer").textContent = `Temps écoulé : ${seconds}s`;
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
}

function incrementCounter() {
  moveCount++;
  document.getElementById(
    "moveCounter"
  ).textContent = `Mouvements : ${moveCount}`;
}

function flipCard() {
  if (lockBoard) return;
  if (this === firstCard) return;

  this.classList.add("flip");

  if (!hasFlippedCard) {
    if (moveCount === 0) startTimer();

    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  incrementCounter();
  checkForMatch();
}

function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matchedCount += 2;
  if (matchedCount === cards.length) {
    stopTimer();

    document.getElementById(
      "finalMoveCounter"
    ).textContent = `Mouvements : ${moveCount}`;
    document.getElementById(
      "finalTimer"
    ).textContent = `Temps écoulé : ${seconds}s`;

    document.getElementById("congratsModal").style.display = "block";
  }

  resetBoard();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

cards.forEach((card) => card.addEventListener("click", flipCard));

document.getElementById("resetButton").addEventListener("click", function () {
  // Cachez le modal
  document.getElementById("congratsModal").style.display = "none";

  moveCount = 0;
  matchedCount = 0;
  seconds = 0;
  document.getElementById(
    "moveCounter"
  ).textContent = `Mouvements : ${moveCount}`;
  document.getElementById("timer").textContent = `Temps écoulé : ${seconds}s`;

  shuffle();

  cards.forEach((card) => {
    card.classList.remove("flip");
    card.classList.remove("matched");
    card.addEventListener("click", flipCard);
  });

  // Redémarrez le timer
  startTimer();
});

shuffle();
