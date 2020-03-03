document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
const board = {};
function createBoard() {
  const boardSize = Number(document.querySelector("input[name='size']:checked").value);
  console.log(boardSize)
  
  board.cells = [];
  for(let i = 0; i < boardSize; i++) {
    for(let j = 0; j < boardSize; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: Math.random() < 0.1,
        hidden: true
      })
    }
  }
}

function startGame () {
  //Create game board
  createBoard();

  //Re-enable click on game board after win
  document.querySelector(".board").style.pointerEvents = "auto";

  //Check for surrounding mines
  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);

  }

  //Resets board when size change is selected
  const boardSizeRadio = document.getElementsByName("size");
  for (let i = 0; i < boardSizeRadio.length; i++) {
    boardSizeRadio[i].addEventListener("click", resetBoard);
  }

  //Reset game board when reset button is pressed
  const reset = document.querySelector("#reset")
  reset.addEventListener("click", resetBoard);

  //Change difficulty

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

function resetBoard() {
  //Reset existing board
  document.getElementsByClassName("board")[0].innerHTML = ""

  //Start new game
  startGame();
}

function changeDifficulty() {

}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
  for (cell in board.cells) {
    if (board.cells[cell].isMine && !board.cells[cell].isMarked) {
      return
    } else if (!board.cells[cell].isMine && board.cells[cell].hidden) {
      return
    }
  }

  document.querySelector(".board").style.pointerEvents = "none";

  return lib.displayMessage('You win!');
}

// Define this function to count the number of mines around the cell
// (there could be as many as 8). You don't have to get the surrounding
// cells yourself! Just use `lib.getSurroundingCells`: 
//
//   var surrounding = lib.getSurroundingCells(cell.row, cell.col)
//
// It will return cell objects in an array. You should loop through 
// them, counting the number of times `cell.isMine` is true.
function countSurroundingMines (cell) {
  const surrounding = lib.getSurroundingCells(cell.row, cell.col);
  let count = 0;
  
  for (let i = 0; i < surrounding.length; i++) {
    if (surrounding[i].isMine) {
      count++;
    }
  }
  return count;
}
