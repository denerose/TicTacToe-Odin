"use strict";
var GameBoard;
(function (GameBoard) {
    GameBoard.gameArray = [];
    function newBoard() {
        for (let index = 1; index <= 9; index++) {
            let newTile = { value: "", tileID: index };
            GameBoard.gameArray.push(newTile);
        }
    }
    GameBoard.newBoard = newBoard;
    function getTileStatus(ref) {
        const tileIndex = GameBoard.gameArray.findIndex((tile) => {
            if (ref === String(tile.tileID)) {
                return true;
            }
            return false;
        });
        let tileStatus = GameBoard.gameArray[tileIndex].value;
        return (tileStatus);
    }
    GameBoard.getTileStatus = getTileStatus;
    function setTileStatus(ref, status) {
        const tileIndex = GameBoard.gameArray.findIndex((tile) => {
            if (ref === String(tile.tileID)) {
                return true;
            }
            return false;
        });
        GameBoard.gameArray[tileIndex].value = status;
    }
    GameBoard.setTileStatus = setTileStatus;
})(GameBoard || (GameBoard = {}));
class Player {
    constructor(name, marker) {
        this.name = name;
        this.marker = marker;
    }
    playTile(tileRef) {
        const mark = this.marker;
        const tileToPlay = document.getElementById(tileRef);
        let currentStatus = GameBoard.getTileStatus(tileRef);
        if (currentStatus != "") {
            return;
        }
        else {
            GameBoard.setTileStatus(tileRef, mark);
        }
    }
}
var Display;
(function (Display) {
    let Player1 = new Player("Saphron", "X");
    let Player2 = new Player("Kim", "O");
    let currentPlayer = Player1;
    function updatePlayer() {
        if (currentPlayer === Player1) {
            currentPlayer = Player2;
        }
        else if (currentPlayer === Player2) {
            currentPlayer = Player1;
        }
        else
            throw Error("wrong player!");
    }
    function tileToAdd(status, ref) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.id = String(ref);
        newDisplayTile.className = "square";
        newDisplayTile.addEventListener("click", () => {
            currentPlayer.playTile(String(ref));
            updatePlayer();
            newDisplayTile.innerText = GameBoard.getTileStatus(newDisplayTile.id);
        });
        return (newDisplayTile);
    }
    function displayBoard() {
        const gameContainer = document.getElementById("gameContainer");
        GameBoard.gameArray.forEach((item) => {
            const status = item.value;
            const ID = item.tileID;
            gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.appendChild(tileToAdd(status, ID));
        });
    }
    Display.displayBoard = displayBoard;
})(Display || (Display = {}));
function main() {
    GameBoard.newBoard();
    Display.displayBoard();
}
main();
