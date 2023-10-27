
const $ = (selector) => document.querySelector(selector);

const generate_board = (evt) => {

    let hasbombs = bombarray(evt.target.bombs, evt.target.size)
    let sequence = 0

    const minefield = document.createElement("div");
    minefield.setAttribute("id", "minefield"); 
    const old = $("#minefield");
    old.replaceWith(minefield);
    const root = $("#minefield");

    let y = Math.round(evt.target.size/2)

    for (let i = 0; i < evt.target.size; i++) {

        let x = 0 - Math.round(evt.target.size/2)

    for (let i = 0; i < evt.target.size; i++) {
        const node = document.createElement("button");
        node.setAttribute("xvalue", x);
        node.setAttribute("yvalue", y);
        node.hasbomb = hasbombs[sequence]

        if (node.hasbomb == 1){
            node.textContent = "💣"}
        else {node.textContent = "⬜ "};
        node.style.backgroundColor = "white";
        root.appendChild(node);

        x += 1
        sequence += 1
    }
    y -= 1
    
    root.appendChild(document.createElement("br"));
    }
}

function bombarray (bombs, size) {
    let bombShuffle = [];
    for (let i = 0; i < (size*size); i ++)
    {if (bombShuffle.length < bombs) {bombShuffle.push(1)}
else {bombShuffle.push(0)}}
bombShuffle.sort(function(){return 0.5 - Math.random()});
return bombShuffle
}

function Dangerlevel (client) {

}

document.addEventListener("DOMContentLoaded", () => {
    const minefield = document.createElement("div");
    minefield.setAttribute("id", "minefield");
    document.body.appendChild(minefield);
    const root = $("#minefield");
    let y = 4
    for (let i = 0; i < 9; i++) {
        let x = -4
      for (let i = 0; i < 9; i++) {
        const node = document.createElement("button");
        node.textContent = "⬜";
        node.colourvalue = 0;
        node.style.backgroundColor = "white";

        root.appendChild(node);
        x += 1
      }
      y -= 1
      root.appendChild(document.createElement("br"));
    }
    const easy = document.createElement("button");
    easy.textContent = "easy"
    easy.size = 9
    easy.bombs = 10
    easy.addEventListener("click",generate_board)
    const medium = document.createElement("button");
    medium.textContent = "medium"
    medium.size = 16
    medium.bombs = 40
    medium.addEventListener("click",generate_board)
    const expert = document.createElement("button");
    expert.size = 22
    expert.bombs = 99
    expert.addEventListener("click",generate_board)
    expert.textContent = "expert"
    document.body.appendChild(easy);
    document.body.appendChild(medium);
    document.body.appendChild(expert);
  });