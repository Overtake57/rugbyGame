// ----- Variables globales -----

const equipes = {
  canada: "../img/rugbyCdm/canada.png",
  chili: "../img/rugbyCdm/chile.png",
  angleterre: "../img/rugbyCdm/england.png",
  fidji: "../img/rugbyCdm/fijans.png",
  france: "../img/rugbyCdm/french.png",
  georgie: "../img/rugbyCdm/georgia.png",
  irlande: "../img/rugbyCdm/irish.png",
  italie: "../img/rugbyCdm/italie.png",
  coteIvoire: "../img/rugbyCdm/ivory.png",
  japon: "../img/rugbyCdm/japan.png",
  lakapi: "../img/rugbyCdm/lakapi.png",
  argentine: "../img/rugbyCdm/losPumas.png",
  namibia: "../img/rugbyCdm/namibia.png",
  nouvelleZelande: "../img/rugbyCdm/newZealand.png",
  portugal: "../img/rugbyCdm/portuguese.png",
  roumanie: "../img/rugbyCdm/romania.png",
  russie: "../img/rugbyCdm/russia.png",
  ecosse: "../img/rugbyCdm/scottish.png",
  espagne: "../img/rugbyCdm/spain.png",
  springbok: "../img/rugbyCdm/springbok.png",
  tonga: "../img/rugbyCdm/tonga.png",
  uruguay: "../img/rugbyCdm/uruguay.png",
  usa: "../img/rugbyCdm/usa.png",
  wales: "../img/rugbyCdm/wales.png",
  australie: "../img/rugbyCdm/wallabies.png",
  zimbabwe: ".../img/rugbyCdm/zimbabwe.png",
};

let cards = document.querySelectorAll(".memory-card");
let gameLogos = {};

// ----- Fonctions utilitaires -----

function previewCards(difficulty) {
  const previewTimes = {
    easy: 2000,
    medium: 1500,
    hard: 1000,
    impossible: 300,
  };

  const previewDuration = previewTimes[difficulty];

  cards.forEach((card) => card.classList.add("flip"));
  setTimeout(() => {
    cards.forEach((card) => card.classList.remove("flip"));
    lockBoard = false; // Permet aux joueurs de cliquer sur les cartes après la prévisualisation
  }, previewDuration);
}

function duplicateLogos(logos) {
  let duplicated = {};
  for (let key in logos) {
    duplicated[key + "_1"] = logos[key];
    duplicated[key + "_2"] = logos[key];
  }
  return duplicated;
}

function getRandomKeys(obj, num) {
  let shuffledKeys = Object.keys(obj);
  let result = [];
  while (result.length < num) {
    let randomIndex = Math.floor(Math.random() * shuffledKeys.length);
    result.push(shuffledKeys.splice(randomIndex, 1)[0]);
  }
  return result;
}

function shuffleAssoc(obj) {
  const entries = Object.entries(obj);
  for (let i = entries.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [entries[i], entries[j]] = [entries[j], entries[i]];
  }
  return Object.fromEntries(entries);
}

function generateGameLogos(difficulty) {
  let numTeams;
  switch (difficulty) {
    case "easy":
      numTeams = 6;
      break;
    case "medium":
      numTeams = 8;
      break;
    case "hard":
      numTeams = 10;
      break;
    case "impossible":
      numTeams = 10;
      break;
  }

  const selectedTeamsKeys = getRandomKeys(equipes, numTeams);
  gameLogos = {};
  selectedTeamsKeys.forEach((key) => {
    gameLogos[key] = equipes[key];
  });

  gameLogos = duplicateLogos(gameLogos);
  gameLogos = shuffleAssoc(gameLogos);
}

function generateCards(difficulty) {
  const cardsContainer = document.getElementById("cardsContainer");
  cardsContainer.innerHTML = ""; // Réinitialise le conteneur des cartes seulement

  Object.entries(gameLogos).forEach(([team, logo]) => {
    const card = document.createElement("div");
    card.className = "memory-card";
    card.dataset.framework = team;

    const frontFace = document.createElement("img");
    frontFace.className = "front-face";
    frontFace.src = logo;

    const backFace = document.createElement("img");
    backFace.className = "back-face";
    backFace.src = "../img/rugbyCdm/backgroundCard.png";

    card.appendChild(frontFace);
    card.appendChild(backFace);
    cardsContainer.appendChild(card);
  });

  cards = document.querySelectorAll(".memory-card");

  cards.forEach((card) => card.addEventListener("click", flipCard));

  console.log("Nombre de cartes générées:", cards.length);

  // Prévisualisation des cartes pour le joueur
  previewCards(difficulty);
}

// ----- Fonctions de gestion du jeu -----

let hasFlippedCard = false;
let lockBoard = false;
let firstCard, secondCard;
let moveCount = 0;
let matchedCount = 0;
let timer;
let seconds = 0;

function updateMoveCounter() {
  document.getElementById(
    "moveCounter"
  ).textContent = `Mouvements : ${moveCount}`;
}

function updateTimer() {
  document.getElementById("timer").textContent = `Temps écoulé : ${seconds}s`;
}

function startTimer() {
  if (timer) {
    clearInterval(timer);
  }
  timer = setInterval(() => {
    seconds++;
    updateTimer();
  }, 1000);
}

// ----- Fonctions de gestion du jeu -----

function resetBoard() {
  [hasFlippedCard, lockBoard] = [false, false];
  [firstCard, secondCard] = [null, null];
}

function flipCard() {
  if (lockBoard || this === firstCard) return;
  this.classList.add("flip");

  if (!hasFlippedCard) {
    if (moveCount === 0) startTimer();
    hasFlippedCard = true;
    firstCard = this;
    return;
  }

  secondCard = this;
  moveCount++;
  updateMoveCounter();
  checkForMatch();
}

function checkForMatch() {
  if (
    firstCard.classList.contains("death-card") ||
    secondCard.classList.contains("death-card")
  ) {
    endGame();
    return;
  }
  // Ignore les suffixes _1 et _2 lors de la comparaison
  let firstCardKey = firstCard.dataset.framework.replace(/(_1|_2)$/, "");
  let secondCardKey = secondCard.dataset.framework.replace(/(_1|_2)$/, "");

  let isMatch = firstCardKey === secondCardKey;
  isMatch ? disableCards() : unflipCards();
}

function unflipCards() {
  lockBoard = true;
  setTimeout(() => {
    firstCard.classList.remove("flip");
    secondCard.classList.remove("flip");
    resetBoard();
  }, 1500);
}

function disableCards() {
  firstCard.removeEventListener("click", flipCard);
  secondCard.removeEventListener("click", flipCard);
  firstCard.classList.add("matched");
  secondCard.classList.add("matched");
  matchedCount += 2;

  // Utiliser le tableau cards mis à jour
  if (matchedCount === cards.length) {
    clearInterval(timer);
    showCongratsModal();
  }

  resetBoard();
}

function startGame(difficulty) {
  generateGameLogos(difficulty);
  generateCards(difficulty);
  hideModals();
}

function endGame() {
  clearInterval(timer);
  alert("Vous avez cliqué sur la carte de la mort. Vous avez perdu !");
  resetGame();
}

function resetGame() {
  lockBoard = true;
  hideModals();
  document.getElementById("difficultyModal").style.display = "block";
  moveCount = 0;
  matchedCount = 0;
  seconds = 0;
  updateMoveCounter();
  updateTimer();
  generateCards();
  cards.forEach((card) => {
    card.classList.remove("flip");
    card.classList.remove("matched");
    card.addEventListener("click", flipCard);
  });
  // previewCards();  // À décommenter si nécessaire
}

// ----- Gestion des modals -----

function showDifficultyModal() {
  // document.getElementById("modalBackdrop").style.display = "block";
  document.getElementById("congratsModal").style.display = "none";
  document.getElementById("difficultyModal").style.display = "block";
  lockBoard = true;
}

function hideModals() {
  // document.getElementById("modalBackdrop").style.display = "none";
  document.getElementById("congratsModal").style.display = "none";
  document.getElementById("difficultyModal").style.display = "none";
  lockBoard = false;
}

function showCongratsModal() {
  document.getElementById(
    "finalMoveCounter"
  ).textContent = `Mouvements : ${moveCount}`;
  document.getElementById(
    "finalTimer"
  ).textContent = `Temps écoulé : ${seconds}s`;

  // document.getElementById("modalBackdrop").style.display = "block";
  document.getElementById("congratsModal").style.display = "block";
  document.getElementById("difficultyModal").style.display = "none";
  lockBoard = true;
}

// ----- Initialisation -----

// Appel de la fonction shuffle au chargement de la page
window.onload = () => {
  resetGame();
};

// Initialisation des écouteurs d'événements

cards.forEach((card) => card.addEventListener("click", flipCard));
document.getElementById("resetButton").addEventListener("click", resetGame);
document.querySelectorAll(".difficulty").forEach((button) => {
  button.addEventListener("click", function () {
    let difficulty = this.getAttribute("data-difficulty");
    startGame(difficulty);
  });
});
