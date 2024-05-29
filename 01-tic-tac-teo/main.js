// 1. add event on all cells
// 2. make css classes for X and Zero
// 2. on click on cell make 1 st time zero then x

// 0 -- Zero
// 1 -- X

const box = document.getElementById('box');
const winningMessageElement = document.getElementById('winningMessage');
// const restartButton = Document.getElementById('restartButton');
const X_CLASS = 'x';
const CIRCLE_CLASS = 'circle';
const cellElements = document.querySelectorAll('[data-cell]');
const winningMessageTextElement = document.querySelector(
  '[data-winning-message-text]'
);
const WINNING_COMBINATIONS = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 4, 8],
  [2, 4, 6],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
];
let circleTurn = true;
cellElements.forEach((cell) => {
  cell.addEventListener(
    'click',
    function (e) {
      // handleClick
      const cell = e.target;
      const currentClass = circleTurn ? X_CLASS : CIRCLE_CLASS;
      cell.classList.add(currentClass);
      circleTurn = !circleTurn;
      const isWin = checkWin(currentClass);

      if (isWin) {
        endGame(false);
      } else {
        endGame(true);
      }

      console.log('isWin', isWin);
    },
    { once: true }
  );
  console.log('cell', cell);
});

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
