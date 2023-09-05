namespace GameBoard {
    interface Tile {
        value: "" | "X" | "O";
        tileID: number;
    }

    export const gameArray: Tile[] = []

    export function newBoard() {
        for (let index = 1; index <= 9; index++) {
            let newTile: Tile = { value: "", tileID: index }
            gameArray.push(newTile)
        }
    }

    export function getTileStatus(ref: string) {
        const tileIndex = GameBoard.gameArray.findIndex((tile) => {
            if (ref === String(tile.tileID)) {
                return true;
            }
            return false;
        })
        let tileStatus = GameBoard.gameArray[tileIndex].value
        return (tileStatus)
    }

    export function setTileStatus(ref: string, status: "X" | "O") {
        const tileIndex = GameBoard.gameArray.findIndex((tile) => {
            if (ref === String(tile.tileID)) {
                return true;
            }
            return false;
        })
        GameBoard.gameArray[tileIndex].value = status;
    }

    export function checkForWin(currentMark: "X" | "O"): boolean {
        let win = false
        const winRows: number[][] = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ]
        winRows.forEach((possibleWin, i) => {
            if (gameArray[possibleWin[0]].value === currentMark && gameArray[possibleWin[1]].value === currentMark
                && gameArray[possibleWin[2]].value === currentMark) {
                win = true
            }
        })
        return (win)
    }

    export function checkForTie(): boolean {
       const tieTest = gameArray.every(tile => tile.value != "") 
       return(tieTest)
    }
}

class Player {

    constructor(public name: string, public marker: "X" | "O", private score: number) {

    }

    playTile(tileRef: string) {
        const mark = this.marker;
        const tileToPlay = document.getElementById(tileRef) as HTMLDivElement
        let currentStatus = GameBoard.getTileStatus(tileRef)
        if (currentStatus != "") {
            return
        } else {
            GameBoard.setTileStatus(tileRef, mark);
        }
    }

    setName(newName: string) {
        this.name = newName;
    }

    getScore() {return(this.score)}

    setScore() {this.score++}
}

namespace Display {

    let Player1 = new Player("Saphron", "X", 0);
    let Player2 = new Player("Kim", "O", 0);
    let winner = ""

    let currentPlayer = Player1

    function updateScores() {
        const P1Display = document.getElementById("P1Score")
        const P2Display = document.getElementById("P2Score")
        if (P1Display) P1Display.innerText = String(Player1.getScore())
        if (P2Display) P2Display.innerText = String(Player2.getScore())
    }

    function showWinner(winnerName: string) {
        const winnerDisplay = document.getElementById("winnerDisplay")
        if (winnerDisplay) winnerDisplay.innerText = winnerName + " wins!!!"
        updateScores();
    }

    function showTie() {
        if (winner = "DRAW") {
        const winnerDisplay = document.getElementById("winnerDisplay")
        if (winnerDisplay) winnerDisplay.innerText = "TIE! No one wins :("
        } else return
    }

    function updatePlayer() {
        if (GameBoard.checkForWin(currentPlayer.marker)) {
            winner = currentPlayer.name
            currentPlayer.setScore();
            showWinner(winner);
        }
        else if (GameBoard.checkForTie()) {
            winner = "DRAW"
            showTie();
        }
        else if (currentPlayer === Player1) {
            currentPlayer = Player2
        }
        else if (currentPlayer === Player2) {
            currentPlayer = Player1
        } else return
    }

    function tileToAdd(status: string, ref: number) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.id = String(ref);
        newDisplayTile.className = "square"
        newDisplayTile.addEventListener("click", () => {
            let currentTileStatus = GameBoard.getTileStatus(newDisplayTile.id)
            if (currentTileStatus === "" && winner === "") {
                currentPlayer.playTile(String(ref));
                newDisplayTile.innerText = GameBoard.getTileStatus(newDisplayTile.id)
                updatePlayer();
            }
            else return;
        })
        return (newDisplayTile)
    }

    export function displayBoard() {
        const gameContainer = document.getElementById("gameContainer")
        GameBoard.gameArray.forEach((item) => {
            const status = item.value
            const ID = item.tileID
            gameContainer?.appendChild(tileToAdd(status, ID))
        })
        updateScores();
    }

    export function addPlayerInputButtons() {
        const P1Form = document.getElementById("P1Form") as HTMLFormElement
        const P2Form = document.getElementById("P1Form") as HTMLFormElement

        P1Form.addEventListener("submit", (e) => {
            e.preventDefault();
            const P1Input = document.getElementById("P1Name") as HTMLInputElement
            Player1.setName(P1Input.value)
        })

        P2Form.addEventListener("submit", (e) => {
            e.preventDefault();
            const P2Input = document.getElementById("P2Name") as HTMLInputElement
            Player2.setName(P2Input.value)
        })
    }

}

function main() {
    GameBoard.newBoard();
    Display.addPlayerInputButtons();
    Display.displayBoard();
}

main();