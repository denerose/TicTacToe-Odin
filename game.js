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
    function clearBoard() {
        GameBoard.gameArray.length = 0;
    }
    GameBoard.clearBoard = clearBoard;
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
    function checkForWin(currentMark) {
        let win = false;
        const winRows = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        winRows.forEach((possibleWin, i) => {
            if (GameBoard.gameArray[possibleWin[0]].value === currentMark && GameBoard.gameArray[possibleWin[1]].value === currentMark
                && GameBoard.gameArray[possibleWin[2]].value === currentMark) {
                win = true;
            }
        });
        return (win);
    }
    GameBoard.checkForWin = checkForWin;
    function checkForTie() {
        const tieTest = GameBoard.gameArray.every(tile => tile.value != "");
        return (tieTest);
    }
    GameBoard.checkForTie = checkForTie;
})(GameBoard || (GameBoard = {}));
class Player {
    constructor(name, marker, score) {
        this.name = name;
        this.marker = marker;
        this.score = score;
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
    setName(newName) {
        this.name = newName;
    }
    getScore() { return (this.score); }
    setScore() { this.score++; }
}
var Display;
(function (Display) {
    let Player1 = new Player("Saphron", "X", 0);
    let Player2 = new Player("Kim", "O", 0);
    let winner = "";
    let currentPlayer = Player1;
    function updateScores() {
        const P1Display = document.getElementById("P1Score");
        const P2Display = document.getElementById("P2Score");
        if (P1Display)
            P1Display.innerText = String(Player1.getScore());
        if (P2Display)
            P2Display.innerText = String(Player2.getScore());
    }
    function showWinner(winnerName) {
        const winnerDisplay = document.getElementById("winnerDisplay");
        if (winnerDisplay)
            winnerDisplay.innerText = winnerName + " wins!!!";
        updateScores();
    }
    function showTie() {
        if (winner = "DRAW") {
            const winnerDisplay = document.getElementById("winnerDisplay");
            if (winnerDisplay)
                winnerDisplay.innerText = "TIE! No one wins :(";
        }
        else
            return;
    }
    function updatePlayer() {
        const resetBtn = document.getElementById("resetBtn");
        if (GameBoard.checkForWin(currentPlayer.marker)) {
            winner = currentPlayer.name;
            currentPlayer.setScore();
            resetBtn.disabled = false;
            showWinner(winner);
        }
        else if (GameBoard.checkForTie()) {
            winner = "DRAW";
            resetBtn.disabled = false;
            showTie();
        }
        else if (currentPlayer === Player1) {
            currentPlayer = Player2;
        }
        else if (currentPlayer === Player2) {
            currentPlayer = Player1;
        }
        else
            return;
    }
    function tileToAdd(status, ref) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.id = String(ref);
        newDisplayTile.className = "square";
        newDisplayTile.addEventListener("click", () => {
            let currentTileStatus = GameBoard.getTileStatus(newDisplayTile.id);
            if (currentTileStatus === "" && winner === "") {
                currentPlayer.playTile(String(ref));
                newDisplayTile.innerText = GameBoard.getTileStatus(newDisplayTile.id);
                updatePlayer();
            }
            else
                return;
        });
        return (newDisplayTile);
    }
    function displayBoard() {
        const gameContainer = document.getElementById("gameContainer");
        if (gameContainer)
            gameContainer.innerHTML = "";
        GameBoard.gameArray.forEach((item) => {
            const status = item.value;
            const ID = item.tileID;
            gameContainer === null || gameContainer === void 0 ? void 0 : gameContainer.appendChild(tileToAdd(status, ID));
        });
        updateScores();
    }
    Display.displayBoard = displayBoard;
    function refreshGame() {
        const btn1 = document.getElementById("P1btn");
        const btn2 = document.getElementById("P2btn");
        btn1.disabled = false;
        btn2.disabled = false;
        GameBoard.clearBoard();
        GameBoard.newBoard();
        displayBoard();
    }
    Display.refreshGame = refreshGame;
    function addPlayerInputButtons() {
        const P1Form = document.getElementById("P1Form");
        const P2Form = document.getElementById("P1Form");
        const resetBtn = document.getElementById("resetBtn");
        P1Form.addEventListener("submit", (e) => {
            e.preventDefault();
            const P1Input = document.getElementById("P1Name");
            const btn = document.getElementById("P1btn");
            Player1.setName(P1Input.value);
            btn.disabled = true;
        });
        P2Form.addEventListener("submit", (e) => {
            e.preventDefault();
            const P2Input = document.getElementById("P2Name");
            const btn = document.getElementById("P2btn");
            Player2.setName(P2Input.value);
            btn.disabled = true;
        });
        resetBtn.addEventListener("click", () => {
            refreshGame();
            resetBtn.disabled = true;
        });
        resetBtn.disabled = true;
    }
    Display.addPlayerInputButtons = addPlayerInputButtons;
})(Display || (Display = {}));
function main() {
    GameBoard.newBoard();
    Display.addPlayerInputButtons();
    Display.displayBoard();
}
main();
