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
        this.isFlagged = !this.isFlagged
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
                        const tempRow = i + x;
                        const tempCol = j + y;
    
                        if (tempRow >= 0 && tempRow < numRows && tempCol >= 0 && tempCol < numCols) {
                            if (grid[tempRow][tempCol].isMine) {
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
    
    GameOver() {
        GameOver = true;
        this.grid.forEach((row, rowindex) => {
            row.forEach((tile, colindex) => {
                if (tile.isMine) {
                    $(`#${rowindex}-${colindex}`).html("&#128163;")}
                    $(`#${rowindex}-${colindex}`).off()
            });
            
        });
        $('.tile').off()
    }
}

class Timer {
    constructor() {
        this.seconds = 0;
        this.intervalId = null;
    }

    start() {
        this.intervalId = setInterval(() => {
            this.seconds++;
            this.updateDisplay();
        }, 1000);
    }

    stop() {
        clearInterval(this.intervalId);
    }

    reset() {
        this.seconds = 0;
        this.updateDisplay();
    }    
    
    updateDisplay() {
        $('#timer').text(('000' + this.seconds).slice(-3));
    }
}

const timer = new Timer();

function clicktile (row, col, minefield){
    const tile = minefield.grid[row][col];
    if (!tile.isRevealed && !tile.isFlagged && !tile.isMine)
    {$("#clickcounter").text(parseInt($("#clickcounter").text()) + 1)}
    revealCell(row, col, minefield)
}

function revealCell(row, col, minefield) {
    const tile = minefield.grid[row][col];

    if (!tile.isRevealed && !tile.isFlagged) {
        tile.revealCell();
        if (tile.isMine) {
            $(`#${row}-${col}`).css("background-color", "red");
            minefield.GameOver()
            // Handle game over logic (e.g., display a message or end the game)
        } else {
            // Check if the revealed cell has zero neighboring mines
            if (tile.neighborMines == 0) {
               $(`#${row}-${col}`).css("background-color", "rgb(211,211,211)");
                $(`#${row}-${col}`).html("&#8203;")
                revealNeighboringCells(row, col, minefield);
            } else {
                $(`#${row}-${col}`).text(tile.neighborMines)
            }
        }
    }
}

function revealNeighboringCells(row, col, minefield) {
    const numRows = minefield.grid.length;
    const numCols = minefield.grid[0].length;

    // Loop through neighboring cells
    for (let x = -1; x <= 1; x++) {
        for (let y = -1; y <= 1; y++) {
            const newRow = row + x;
            const newCol = col + y;

            // Check if the neighboring cell is within bounds
            if (newRow >= 0 && newRow < numRows && newCol >= 0 && newCol < numCols) {
                // Recursively reveal the neighboring cell
                revealCell(newRow, newCol, minefield);
            }
        }
    }
}

function flagCell(row, col, minefield) {
    const tile = minefield.grid[row][col];
    
    if (!tile.isRevealed) {
        tile.toggleFlag();
        $(`#${row}-${col}`).html(tile.isFlagged?"&#128681":"&nbsp;")
        // Implement logic to update the UI based on flag status
        // For simplicity, I'll just print the coordinates and the flag status.
        console.log(`Cell at (${row}, ${col}) flagged: ${tile.isFlagged}`);
    }
}

function difficultySelection(evt) {
    const rows = parseInt(evt.target.dataset.rows);
    const cols = parseInt(evt.target.dataset.cols);
    const mines = parseInt(evt.target.dataset.bombs)
    initializeGame(rows, cols, mines);
}

let GameOver = false;

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
    timer.stop();
    timer.reset();
    timer.start();
    $("#minefield").show();
    $("#resultscreen").hide();
    
    let minefield = new Minefield(rows, cols)
    minefield.generateBoard();
    minefield.populateMines(minefield.grid, mines);
    minefield.calculateNeighbors(minefield.grid)
    
    const minefieldDiv = $("#minefield");
    minefieldDiv.empty()


    for (let i = 0; i < minefield.grid.length; i++) {
        for (let j = 0; j < minefield.grid[i].length; j++) {
            const tile = document.createElement("button");
            tile.innerHTML = "&nbsp;"
            tile.setAttribute("class", "tile");
            tile.id = `${i}-${j}`
            tile.addEventListener("click", () => {
                if (!GameOver) {
                    clicktile(i, j, minefield)
                }
            });
            tile.addEventListener("contextmenu", (event) => {
                event.preventDefault(); // Prevent context menu on right-click
                flagCell(i, j, minefield);
            });
            minefieldDiv.append(tile);
        }
        minefieldDiv.append(document.createElement("br"));
    }
}
