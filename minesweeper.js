class tile {
    constructor() {
        this.isMine = false;
        this.isRevealed = false;
        this.isFlagged = false;
        this.neighborMines = 0;
    }

    revealCell () {
        this.isRevealed = true;
    }
    toggleFlag() {
        this.isFlagged = true;
    }
}

class minefield {
    constructor() {
        this.cols = 9
        this.rows = 9
        this.grid = new Array(this.cols)
    }

    generateboard () {
        for (let i = 0; i <= this.rows; i++) {
            let row = new Array(this.rows)
            for (let j = 0; j <= this.cols; j++) {
            row[j] = new tile()
        }
        this.grid[i] = row
     }
    return this.grid
    }
}

$(document).ready(function () {
    const Minefield = new minefield().generateboard()
    for (let i = 0; i < Minefield.length; i++) {
        for (let j = 0; j <Minefield[i].length; j++){
            const tile = document.createElement("button")
            $("#minefield").append(tile);
        }
        $("#minefield").append(document.createElement("br"));

    }

    
})