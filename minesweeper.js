
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
        x = Math.floor(Math.random() * (max - (min + 1) ) + (min));
        y = Math.floor(Math.random() * (max - (min + 1) ) + (min));
    } while (mines.some(mine => mine.x === x && mine.y === y));
    mines.push({ x, y })
};

//create the board
for (let i = Math.round(size/2) - size; i < Math.round(size/2); i++) {
    for (let j = Math.round(size/2) - size; j < Math.round(size/2); j++) {
      const node = document.createElement("button");
      mines.some(mine => mine.x == i && mine.y == j)? node.textContent = "-1": node.textContent = "0"; // Set "M" for mine:

      $("#minefield").appendChild(node);
    }
    $("#minefield").appendChild(document.createElement("br"));}

}



document.addEventListener("DOMContentLoaded", () => {
    let isGameOver = false;
    const difficulty = [{"difficulty":"easy", "size":81, "bombs":10},{"difficulty":"medium", "size":256, "bombs":40},{"difficulty":"hard", "size":480, "bombs":99}]
    
    difficulty.forEach((value)=> {
    let button = document.createElement("button")
    button.textContent = value.difficulty
    button.dataset.size = value.size
    button.dataset.bombs = value.bombs
    button.addEventListener("click", gamestart)
    canvas.appendChild(button)
})
})
