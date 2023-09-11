<?php
$equipes = array(
    "Canada" => "/assets/img/rugbyCdm/canada.png",
    "Chilie" => "/assets/img/rugbyCdm/chile.png",
    "Angleterre" => "/assets/img/rugbyCdm/england.png",
    "Fijans" => "/assets/img/rugbyCdm/fijans.png",
    "France" => "/assets/img/rugbyCdm/french.png",
    "Georgie" => "/assets/img/rugbyCdm/georgia.png",
    "Ireland" => "/assets/img/rugbyCdm/irish.png",
    "Italie" => "/assets/img/rugbyCdm/italie.png",
    "Ivoir" => "/assets/img/rugbyCdm/ivory.png",
    "Japon" => "/assets/img/rugbyCdm/japan.png",
    "Lakapi" => "/assets/img/rugbyCdm/lakapi.png",
    "Argentine" => "/assets/img/rugbyCdm/losPumas.png",
    "Namibia" => "/assets/img/rugbyCdm/namibia.png",
    "Nouvelle-Zelande" => "/assets/img/rugbyCdm/newZealand.png",
    "Portugais" => "/assets/img/rugbyCdm/portuguese.png",
    "Roumanie" => "/assets/img/rugbyCdm/romania.png",
    "Russie" => "/assets/img/rugbyCdm/russia.png",
    "Ecosse" => "/assets/img/rugbyCdm/scottish.png",
    "Espagne" => "/assets/img/rugbyCdm/spain.png",
    "Springbok" => "/assets/img/rugbyCdm/springbok.png",
    "Tonga" => "/assets/img/rugbyCdm/tonga.png",
    "Uruguay" => "/assets/img/rugbyCdm/uruguay.png",
    "US" => "/assets/img/rugbyCdm/usa.png",
    "Wales" => "/assets/img/rugbyCdm/wales.png",
    "Australie" => "/assets/img/rugbyCdm/wallabies.png",
    "Zimbabwe" => "/assets/img/rugbyCdm/zimbabwe.png",

);

// Sélectionne 8 équipes aléatoirement
$selected_teams_keys = array_rand($equipes, 8);
$selected_logos = [];
foreach ($selected_teams_keys as $key) {
    $selected_logos[$key] = $equipes[$key];
}

// Double les équipes pour le jeu de mémorisation
$game_logos = array_merge($selected_logos, $selected_logos);

// Mélange les équipes pour l'affichage
shuffle_assoc($game_logos);

// Fonction pour mélanger un tableau associatif
function shuffle_assoc(&$array)
{
    $keys = array_keys($array);
    shuffle($keys);
    $new = [];
    foreach ($keys as $key) {
        $new[$key] = $array[$key];
    }
    $array = $new;
    return true;
}
?>

<!DOCTYPE html>
<html lang="fr">
<head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Memory Game</title>
    <link rel="stylesheet" href="/assets/style/style.css" />
</head>
<body>
    <header>
        <p id="moveCounter">Mouvements : 0</p>
        <p id="timer">Temps écoulé : 0s</p>
    </header>

    <main id="gameContainer">
    <section class="memory-game">
        <?php foreach ($game_logos as $nom => $logo): ?>
            <div class="memory-card" data-framework="<?=$nom;?>">
                <img class="front-face" src="<?=$logo;?>" alt="<?=$nom;?>"/>
                <img class="back-face" src="/assets/img/rugbyCdm/backgroundCard.png" alt="Rugby badge"/>
            </div>
            <div class="memory-card" data-framework="<?=$nom;?>">
                <img class="front-face" src="<?=$logo;?>" alt="<?=$nom;?>"/>
                <img class="back-face" src="/assets/img/rugbyCdm/backgroundCard.png" alt="Rugby badge"/>
            </div>
        <?php endforeach;?>
    </section>
        <aside id="congratsModal" style="display: none">
            <h2 id="congratsMessage">
                Félicitations ! Vous avez gagné !
            </h2>
            <p id="finalMoveCounter">Mouvements : 0</p>
            <p id="finalTimer">Temps écoulé : 0s</p>
            <button id="resetButton">Rejouer</button>
        </aside>
    </main>

    <script src="/assets/script/script.js"></script>
</body>
</html>