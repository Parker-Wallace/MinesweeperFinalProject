
const $ = (selector) => document.querySelector(selector);
canvas = $("#gameboard")
function gamestart (evt) {

//variables
const size = Math.sqrt(evt.target.dataset.size)
const minecount = evt.target.dataset.bombs
// initializing the game timer    
setInterval(()=> {
const timerbox = $('#gametimer');
timerbox.textContent = ('000' + (parseInt(timerbox.textContent) + 1)).slice(-3)}, 1000)

// generate the mines
let mines = []
let max = Math.round(size/2)
let min = Math.round(size/2) - size
for (let i = 0; i < minecount; i++) {
    do {
        col = Math.floor(Math.random() * (max - (min + 1) ) + (min));
        row = Math.floor(Math.random() * (max - (min + 1) ) + (min));
    } while (mines.some(mine => mine.col == col && mine.row == row));
    mines.push({ col, row })
};

//create the board
for (let i = Math.round(size/2) - size; i < Math.round(size/2); i++) {
    for (let j = Math.round(size/2) - size; j < Math.round(size/2); j++) {
      const node = document.createElement("button");
      const isMine = mines.some(mine => mine.col === i && mine.row === j);
      // Set "-1" for mine
      node.textContent = isMine ? "-1" : "0";
      if (!isMine) {
          // Count adjacent mines for non-mine buttons
          let adjacentMines = 0;
          for (let dx = -1; dx <= 1; dx++) {
              for (let dy = -1; dy <= 1; dy++) {
                  if (mines.some(mine => mine.col == i + dx && mine.row == j + dy)) {
                      adjacentMines++;
                  }
              }
          }
          node.textContent = adjacentMines;
      }
      $("#minefield").appendChild(node);
    }
    $("#minefield").appendChild(document.createElement("br"));}

}



document.addEventListener("DOMContentLoaded", () => {
    let isGameOver = false;
    const difficulty = [{"difficulty":"easy", "size":81, "bombs":10},{"difficulty":"medium", "size":256, "bombs":40},{"difficulty":"hard", "size":484, "bombs":99}]
    
    difficulty.forEach((value)=> {
    let button = document.createElement("button")
    button.textContent = value.difficulty
    button.dataset.size = value.size
    button.dataset.bombs = value.bombs
    button.addEventListener("click", gamestart)
    canvas.appendChild(button)
})
})
