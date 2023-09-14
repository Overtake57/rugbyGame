<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Memory Game</title>
    <link rel="stylesheet" href="/assets/style/style.css">
</head>

<body>
    <header>
        <h1>Memory Game Rugby</h1>
        <div>
            <p id="moveCounter">Mouvements : 0</p>
            <p id="timer">Temps écoulé : 0s</p>
        </div>
    </header>

    <main id="gameContainer">
        <aside>
            <div id="difficultyModal" class="modal">
                <h2>Choisissez votre difficulté</h2>
                <button class="difficulty" data-difficulty="easy">Facile</button>
                <button class="difficulty" data-difficulty="medium">Moyen</button>
                <button class="difficulty" data-difficulty="hard">Difficile</button>
                <button class="difficulty" data-difficulty="impossible">Impossible</button>
            </div>
        </aside>

        <aside id="congratsModal" style="display: none">
            <h2 id="congratsMessage">Félicitations ! Vous avez gagné !</h2>
            <p id="finalMoveCounter">Mouvements : 0</p>
            <p id="finalTimer">Temps écoulé : 0s</p>
            <button id="resetButton">Rejouer</button>
        </aside>

        <section class="memory-game" id="cardsContainer">
        </section>
    </main>

    <script src="/assets/script/script.js"></script>
</body>

</html>
