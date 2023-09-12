// Récupération de toutes les cartes mémoire du DOM
const cards = document.querySelectorAll(".memory-card");

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0;
let matchedCount = 0;
let timer;
let seconds = 0;

// Fonction pour montrer brièvement toutes les cartes avant de commencer le jeu
function previewCards() {
  cards.forEach((card) => card.classList.add("flip"));

  // Cache les cartes après 2 secondes et démarre le chronomètre
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip"));
    startTimer(); // Démarrage du chronomètre après la prévisualisation
  }, 2000);
}

// Appelle la fonction preview au chargement de la page
window.onload = () => {
  shuffle();
  previewCards();
};

// Fonction pour démarrer le chronomètre
function startTimer() {
  if (timer) {
    stopTimer(); // Si le chronomètre est déjà démarré, l'arrêter
  }
  timer = setInterval(function () {
    seconds++;
    document.getElementById("timer").textContent = `Temps écoulé : ${seconds}s`;
  }, 1000);
}

// Fonction pour arrêter le chronomètre
function stopTimer() {
  clearInterval(timer);
}

// Incrémente le compteur de mouvements
function incrementCounter() {
  moveCount++;
  document.getElementById(
    "moveCounter"
  ).textContent = `Mouvements : ${moveCount}`;
}

// Fonction pour retourner une carte
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

// Vérifie si les deux cartes retournées correspondent
function checkForMatch() {
  let isMatch = firstCard.dataset.framework === secondCard.dataset.framework;
  isMatch ? disableCards() : unflipCards();
}

// Si les cartes correspondent, elles sont désactivées
function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");

  matchedCount += 2;
  if (matchedCount === cards.length) {
    stopTimer();

    // Affiche les stats finales
    document.getElementById(
      "finalMoveCounter"
    ).textContent = `Mouvements : ${moveCount}`;
    document.getElementById(
      "finalTimer"
    ).textContent = `Temps écoulé : ${seconds}s`;

    // Affiche le message de félicitations
    document.getElementById("congratsModal").style.display = "block";
  }

  resetBoard();
}

// Si les cartes ne correspondent pas, elles sont retournées face cachée
function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

// Réinitialise le tableau pour le prochain tour
function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

// Mélange les cartes
function shuffle() {
  cards.forEach((card) => {
    let randomPos = Math.floor(Math.random() * cards.length);
    card.style.order = randomPos;
  });
}

// Ajoute un écouteur d'événement à chaque carte pour détecter les clics
cards.forEach((card) => card.addEventListener("click", flipCard));

// Écouteur d'événement pour le bouton de réinitialisation
document.getElementById("resetButton").addEventListener("click", function () {
  // Cache le modal
  document.getElementById("congratsModal").style.display = "none";

  // Réinitialise les compteurs et les afficheurs
  moveCount = 0;
  matchedCount = 0;
  seconds = 0;
  document.getElementById(
    "moveCounter"
  ).textContent = `Mouvements : ${moveCount}`;
  document.getElementById("timer").textContent = `Temps écoulé : ${seconds}s`;

  shuffle();

  // Réinitialise l'état de chaque carte
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.classList.remove("matched");
    card.addEventListener("click", flipCard);
  });

  // Prévisualise les cartes avant de démarrer le jeu
  previewCards();
});

shuffle();
