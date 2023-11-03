
const $ = (selector) => document.querySelector(selector);
canvas = $("#gameboard")
function gamestart (evt) {

// initializing the game timer    
setInterval(()=> {
const timerbox = $('#gametimer');
timerbox.textContent = ('000' + (parseInt(timerbox.textContent) + 1)).slice(-3)}, 1000)

//create the board
for (let i = 0; i < Math.sqrt(evt.target.dataset.size); i++) {
    for (let j = 0; j < Math.sqrt(evt.target.dataset.size); j++) {
      const node = document.createElement("button");
      node.textContent = "0"; //used instead of "#" for visibility
      node.dataset.coordinates = [i, j];
      $("#minefield").appendChild(node);
    }
    $("#minefield").appendChild(document.createElement("br"));
  }

};



document.addEventListener("DOMContentLoaded", () => {
    let isGameOver = false;
    const difficulty = [{"difficulty":"easy", "size":81, "bombs":10},{"difficulty":"medium", "size":256, "bombs":10},{"difficulty":"hard", "size":480, "bombs":10}]
    
    difficulty.forEach((value)=> {
    let button = document.createElement("button")
    button.textContent = value.difficulty
    button.dataset.size = value.size
    button.dataset.bombs = value.bombs
    button.addEventListener("click", gamestart)
    canvas.appendChild(button)
})
})
