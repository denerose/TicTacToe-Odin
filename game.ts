
class Player {

    constructor(name: string) {

    }
}

namespace Game {
    export const gameBoardArray: ("X" | "O" | "")[] = ["", "O", "", "", "X", "", "", "", ""];

}

namespace Display {
    let gameContainer = document.getElementById("gameContainer") as HTMLDivElement;
    function newTile(status: string) {
        const newDisplayTile = document.createElement("div");
        newDisplayTile.innerText = status;
        newDisplayTile.className = "square";
        return(newDisplayTile)
    }

    export function setupBoard() {
        Game.gameBoardArray.forEach(tile => {
            gameContainer.appendChild(newTile(tile))
    });}
}

function main() {
    Display.setupBoard();
}

main()