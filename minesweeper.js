document.addEventListener('DOMContentLoaded', startGame)

// Define your `board` object here!
const board = {};
function createBoard() {
  board.cells = [];
  for(let i = 0; i < 5; i++) {
    for(let j = 0; j < 5; j++) {
      board.cells.push({
        row: i,
        col: j,
        isMine: Math.random() < 0.1,
        hidden: true
      })
    }
  }
  console.log(board);
  return board;
}

/*
var board = {
  cells: [{
    row: 0,
    col: 0,
    isMine: true,
    hidden: true
  }, {
    row: 0,
    col: 1,
    isMine: false,
    hidden: true
  }, {
    row: 0,
    col: 2,
    isMine: true,
    hidden: true
  }, {
    row: 1,
    col: 0,
    isMine: false,
    hidden: true
  }, {
    row: 1,
    col: 1,
    isMine: true,
    hidden: true
  }, {
    row: 1,
    col: 2,
    isMine: false,
    hidden: true
  }, {
    row: 2,
    col: 0,
    isMine: true,
    hidden: true
  }, {
    row: 2,
    col: 1,
    isMine: false,
    hidden: true
  }, {
    row: 2,
    col: 2,
    isMine: false,
    hidden: true
  }]
};
*/

function startGame () {

  document.addEventListener("click", checkForWin);
  document.addEventListener("contextmenu", checkForWin);

  const board = createBoard();

  for (let i = 0; i < board.cells.length; i++) {
    board.cells[i].surroundingMines = countSurroundingMines(board.cells[i]);

  }

  // Don't remove this function call: it makes the game work!
  lib.initBoard()
}

// Define this function to look for a win condition:
//
// 1. Are all of the cells that are NOT mines visible?
// 2. Are all of the mines marked?
function checkForWin () {

    if (checkMine() === checkMarkedMine() && checkHiddenEmpty() === 0) {
      lib.displayMessage('You win!');
    }
  
  // You can use this function call to declare a winner (once you've
  // detected that they've won, that is!)
  //   lib.displayMessage('You win!')
}

function checkMine () {
  let mineCount = 0;

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine) {
      mineCount++;
    }
  }
  return mineCount;
}

function checkMarkedMine() {
  let markedMineCount = 0;

  for (let i = 0; i < board.cells.length; i++) {
    if (board.cells[i].isMine && board.cells[i].isMarked) {
      markedMineCount++;
    }
  }
  return markedMineCount;
}

function checkHiddenEmpty() {
  let hiddenCount = 0;

  for (let i = 0; i < board.cells.length; i++) {
    if (!board.cells[i].isMine && board.cells[i].hidden) {
      hiddenCount++;
    }
  }
  return hiddenCount;
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

