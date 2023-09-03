"use strict";
class Player {
    constructor(name, mark) {
    }
}
var Game;
(function (Game) {
    // square = the game element, tile = the display element
    Game.statusArray = ["", "O", "", "", "X", "", "", "", ""];
    function play(squareToPlay, marker) {
        const arrayRef = Number(squareToPlay);
        Game.statusArray[arrayRef] = marker;
        Display.refreshBoard();
    }
    Game.play = play;
})(Game || (Game = {}));
var Display;
(function (Display) {
    let gameContainer = document.getElementById("gameContainer");
    function newTile(status, ref) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.className = "square";
        newDisplayTile.id = String(ref);
        newDisplayTile.addEventListener("click", () => {
            Game.play(newDisplayTile.id, "X");
        });
        return (newDisplayTile);
    }
    function setupBoard() {
        Game.statusArray.forEach(tile => {
            const tileRef = Game.statusArray.indexOf(tile);
            gameContainer.appendChild(newTile(tile, tileRef));
        });
    }
    Display.setupBoard = setupBoard;
    function refreshBoard() {
        const gameBoard = document.getElementsByClassName("square");
        Array.from(gameBoard).forEach((tile) => {
            tile.remove();
        });
        setupBoard();
    }
    Display.refreshBoard = refreshBoard;
})(Display || (Display = {}));
function main() {
    Display.setupBoard();
}
main();
