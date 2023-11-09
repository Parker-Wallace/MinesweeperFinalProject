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

class Minefield {
    constructor(rows, cols) {
        this.cols = cols
        this.rows = rows
        this.grid = new Array()
    }

    generateBoard() {
        for (let i = 0; i < this.rows; i++) { // Use this.rows
            let row = new Array(this.cols); // Use this.cols
            for (let j = 0; j < this.cols; j++) { // Use this.cols
                row[j] = new tile();
            }
            this.grid[i] = row;
        }
        return this.grid;
    }

    calculateNeighbors(grid) {
        const numRows = grid.length;
        const numCols = grid[0].length;
    
        for (let i = 0; i < numRows; i++) {
            for (let j = 0; j < numCols; j++) {
                if (grid[i][j].isMine) {
                    // Skip mines
                    continue;
                }
                
                let mineCount = 0;
    
                // Check the eight neighboring cells for mines
                for (let x = -1; x <= 1; x++) {
                    for (let y = -1; y <= 1; y++) {
                        const newRow = i + x;
                        const newCol = j + y;
    
                        if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                            if (grid[newRow][newCol].isMine) {
                                mineCount++;
                            }
                        }
                    }
                }
    
                // Update the neighborMines property for the cell
                grid[i][j].neighborMines = mineCount;
            }
        }
    }

    populateMines(grid, numMines) {
        const numCols = grid[0].length; // Use this.cols for columns
        const numRows = grid.length;   // Use this.rows for rows
    
        let minesPlaced = 0;
    
        while (minesPlaced < numMines) {
            const randomRow = Math.floor(Math.random() * numRows);
            const randomCol = Math.floor(Math.random() * numCols);
    
            if (!grid[randomRow][randomCol].isMine) {
                grid[randomRow][randomCol].isMine = true;
                minesPlaced++;
            }
        }
    }
    
    
}

function difficultySelection(evt) {
    const rows = parseInt(evt.target.dataset.rows);
    const cols = parseInt(evt.target.dataset.cols);
    const mines = parseInt(evt.target.dataset.bombs)
    initializeGame(rows, cols, mines);
}

$(document).ready(function () {
    //create the minefield

    
    const difficulty = [
        { level: "easy", rows: 9, cols: 9, bombs: 10 },
        { level: "medium", rows: 16, cols: 16, bombs: 40 },
        { level: "hard", rows: 20, cols: 24, bombs: 99 }
    ];

    difficulty.forEach((value) => {
        let button = document.createElement("button");
        button.textContent = value.level;
        button.dataset.rows = value.rows;
        button.dataset.cols = value.cols;
        button.dataset.bombs = value.bombs;
        button.addEventListener("click", difficultySelection); 
        $("#gamebar").append(button);
    });
});

function initializeGame(rows, cols, mines) {
    // Implement your game initialization logic here
    console.log(`Selected difficulty: Rows ${rows}, Cols ${cols}`);
    let minefield = new Minefield(rows, cols)
    minefield.generateBoard();
    minefield.populateMines(minefield.grid, mines);
    minefield.calculateNeighbors(minefield.grid)
    const minefieldDiv = $("#minefield");
    minefieldDiv.empty()


    for (let i = 0; i < minefield.grid.length; i++) {
        for (let j = 0; j < minefield.grid[i].length; j++) {
            const tile = document.createElement("button");
            tile.textContent = (minefield.grid[i][j].isMine ? 1 : minefield.grid[i][j].neighborMines) ;
            minefieldDiv.append(tile);
        }
        minefieldDiv.append(document.createElement("br"));
    }
}