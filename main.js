// 1. add event on all cells
// 2. make css classes for X and Zero
// 2. on click on cell make 1 st time zero then x

// 0 -- Zero
// 1 -- X

const board = document.getElementById('board');
const winningMessageElement = document.getElementById('winningMessage');
const restartButton = document.getElementById('restartButton');
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];
let circleTurn;
startGame();
restartButton.addEventListener('click', startGame);

//  start the game
function startGame() {
  circleTurn = false;
  cellElements.forEach((cell) => {
    cell.classList.remove(X_CLASS);
    cell.classList.remove(CIRCLE_CLASS);
    cell.removeEventListener('click', handleClick);
    cell.addEventListener('click', handleClick, { once: true });
  });
  // setBoardHoverClass();
  winningMessageElement.classList.remove('show');
}

// handle Click
function handleClick(e) {
  const cell = e.target;
  const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

  // check place holder
  cell.classList.add(currentClass);

  if (checkWin(currentClass)) {
    endGame(false);
  } else if (isDraw()) {
    endGame(true);
  } else {
    //  swapping turns of x and 0
    circleTurn = !circleTurn;
    // setBoardHoverClass();
  }
}

//  check winning combination
function checkWin(currentClass) {
  return WINNING_COMBINATIONS.some((combination) => {
    return combination.every((index) => {
      return cellElements[index].classList.contains(currentClass);
    });
  });
}

// check winning condition
function endGame(draw) {
  if (draw) {
    winningMessageTextElement.innerText = 'Draw!';
  } else {
    winningMessageTextElement.innerText = `${circleTurn ? "O's" : "X's"} Wins!`;
  }
  winningMessageElement.classList.add('show');
}

// check draw condition
function isDraw() {
  return [...cellElements].every((cell) => {
    return (
      cell.classList.contains(X_CLASS) || cell.classList.contains(CIRCLE_CLASS)
    );
  });
}

// for Hover
// function setBoardHoverClass() {
//   board.classList.remove(X_CLASS);
//   board.classList.remove(CIRCLE_CLASS);
//   if (circleTurn) {
//     board.classList.add(CIRCLE_CLASS);
//   } else {
//     board.classList.add(X_CLASS);
//   }
// }
