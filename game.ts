
class Player {

    constructor(name: string, mark: "X" | "O") {

    }
}

namespace Game {
    // square = the game element, tile = the display element
    export const statusArray: ("X" | "O" | "")[] = ["", "O", "", "", "X", "", "", "", ""];

    export function play(squareToPlay: string, marker: "X" | "O") {
        const arrayRef = Number(squareToPlay);
        Game.statusArray[arrayRef] = marker;
        Display.refreshBoard();
    }

}

namespace Display {
    let gameContainer = document.getElementById("gameContainer") as HTMLDivElement;
    function newTile(status: string, ref: number) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.className = "square";
        newDisplayTile.id = String(ref)
        newDisplayTile.addEventListener("click", () => {
            Game.play(newDisplayTile.id, "X")
        })
        return(newDisplayTile)
    }

    export function setupBoard() {
        Game.statusArray.forEach(tile => {
            const tileRef = Game.statusArray.indexOf(tile);
            gameContainer.appendChild(newTile(tile, tileRef))
    })}

    export function refreshBoard() {
        const gameBoard = document.getElementsByClassName("square");
        
        Array.from(gameBoard).forEach((tile) => {
            tile.remove();
        })
        setupBoard();
    }
}

function main() {
    Display.setupBoard();
}

main()