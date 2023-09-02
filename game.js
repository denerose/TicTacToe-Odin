"use strict";
class Player {
    constructor(name) {
    }
}
var Game;
(function (Game) {
    Game.gameBoardArray = ["", "O", "", "", "X", "", "", "", ""];
})(Game || (Game = {}));
var Display;
(function (Display) {
    let gameContainer = document.getElementById("gameContainer");
    function newTile(status) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.className = "square";
        return (newDisplayTile);
    }
    function setupBoard() {
        Game.gameBoardArray.forEach(tile => {
            gameContainer.appendChild(newTile(tile));
        });
    }
    Display.setupBoard = setupBoard;
})(Display || (Display = {}));
function main() {
    Display.setupBoard();
}
main();
