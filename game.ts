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
}

class Player {

    constructor(public name: string, public marker: "X" | "O") {

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

}

namespace Display {

    let Player1 = new Player("Saphron", "X");
    let Player2 = new Player("Kim", "O");

    let currentPlayer = Player1

    function updatePlayer() {
        if (currentPlayer === Player1) {
            currentPlayer = Player2
        }
        else if (currentPlayer === Player2) {
            currentPlayer = Player1
        } else throw Error("wrong player!")
    }

function tileToAdd(status: string, ref: number) {
    const newDisplayTile = document.createElement("div");
    newDisplayTile.innerText = status;
    newDisplayTile.id = String(ref);
    newDisplayTile.className = "square"
    newDisplayTile.addEventListener("click", () => {
        currentPlayer.playTile(String(ref));
        updatePlayer();
        newDisplayTile.innerText = GameBoard.getTileStatus(newDisplayTile.id)
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
}
}

function main() {
    GameBoard.newBoard();
    Display.displayBoard();
}

main();