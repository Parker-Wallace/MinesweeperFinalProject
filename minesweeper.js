
const $ = (selector) => document.querySelector(selector);







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
        node.setAttribute("xvalue", x);
        node.setAttribute("yvalue", y);
        hasbomb = Math.round(Math.random());
        if (hasbomb == 1){node.textContent = "💣"}
        else {node.textContent = "⬜ "}; //used instead of "#" for visibility
        node.colourvalue = 0;
        node.style.backgroundColor = "white";

        root.appendChild(node);
        x += 1
      }
      y -= 1
      root.appendChild(document.createElement("br"));
    }
  });