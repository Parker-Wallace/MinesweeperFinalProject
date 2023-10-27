# Introduction 
> Microsoft’s Minesweeper game has been around since 1990. The game rules (found here) are simple but it demands logic to obtain a good score. You “win” when you have cleared the field of all hidden mines.

## the Challenge

Use your JavaScript skills and knowledge to implement the functionality of the game as closely as you can. The actual appearance/aesthetics of the presentation is secondary.

## Setup

Use HTML, CSS, JavaScript, and a web browser of your choice to create and test the game.

There is no starting code.

## Requirements
1. The field of play size must be selectable between:
    - that of Beginner (81 tiles and 10 mines)

    - Intermediate (256 tiles and 40 mines)

    - Expert (480 tiles and 99 mines). 
    >When the size is selected, the game begins.
2. When a tile is clicked:
    - If there is a mine at that location, the mine explodes, and the game is over.

    - If there is a number > 0 at that location, that number is displayed.

    - If the number at that location is 0, then that location is displayed as empty.

    - Automatically any adjacent tile that also has a value of 0 is also revealed as empty. This is repeated for each of the adjacent tiles with a value of 0 (hint: this could be a recursive process).

3. When a tile is right-clicked:
    - If the tile is uncovered, there is no action.

    - If the tile is still hidden and not already marked as a suspected mine, it is marked as a suspected mine.

    - If the tile is still hidden and is already marked as a suspected mine, it is.

4. A timer shall count the elapsed time of the current game. It starts at 0 at the beginning of a game.

5. A counter shall count the number of tiles revealed in the current game.

6. When the game is over (win or lose), the player will be asked if they want to play again.

7. The JavaScript must include: Objects and Classes, random numbers, event handlers, recursion, and arrays.

8. JavaScript must also construct the web page by creating DOM elements for the tiles.

## Caution

The code you submit must be your own. There are literally hundreds of solutions for this online. Look for ideas and insight, but not code. Nor can you take code from classmates. Exchange ideas and insights, but

not code. If I suspect that the code you submit is not your own, I will ask you to explain how the code works. If you cannot, you will not receive credit for this project.

## Submission

Compress and archive your code into one zip file and upload to the drop box in D2L. Due on or before Monday, 4 Dec.

## Rubric

| Rubric |  |  |  |  |
|---|---|---|---|---|
|  | spot on | almost | a ways away | too hidden to be seen  |
| Functional Completeness |  |  |  |  |
| 1. Field Size Selection | 5 | 4 | 2 | 0 |
| 2. play again? | 5 | 4 | 2 | 0 |
| Game Play |  |  |  |  |
| 3. Game Over & Scoring | 5 | 4 | 2 | 0 |
| 4. Tile Number Display | 5 | 4 | 2 | 0 |
| 5. Empty tile propagation | 15 | 10 | 5 | 0 |
| 6. Timer | 5 | 4 | 2 | 0 |
| 7. Counter | 5 | 4 | 2 | 0 |
| JavaScript |  |  |  |  |
| 8. Objects and Classes | 10 | 8 | 4 | 0 |
| 9. Random Numbers | 5 | 4 | 2 | 0 |
| 10. Event Handlers | 10 | 8 | 4 | 0 |
| 11. Recursion | 15 | 10 | 2 | 0 |
| 12. Array | 5 | 4 | 2 | 0 |
| 13. DOM interaction | 10 | 8 | 4 | 0 |