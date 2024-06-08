const board = document.getElementById("board");
const winningMessageElement = document.getElementById("winningMessage");
const restartButton = document.getElementById("restartButton");
const reset = document.getElementById("reset");
const cellElements = document.querySelectorAll("[data-cell]");
const winningMessageTextElement = document.querySelector(
    "[data-winning-message-text]"
);
const X_CLASS = "x";
const CIRCLE_CLASS = "circle";
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
restartButton.addEventListener("click", startGame);
reset.addEventListener("click", startGame);

/**
 * 1. start the game using foreach loop for multiple cell clicking
 * 2. use addeventlistener on every cell for click
 * 3. use removeeventlistener on every cell when the game is restarted
 * 4. use once for clicking one time for a one cell
 * 5. use classList property for removing x , 0 and message when the game is restarted
 */
function startGame() {
    circleTurn = false;
    cellElements.forEach((cell) => {
        cell.classList.remove(X_CLASS);
        cell.classList.remove(CIRCLE_CLASS);
        cell.removeEventListener("click", handleClick);
        cell.addEventListener("click", handleClick, { once: true });
    });
    winningMessageElement.classList.remove("show");
}

/**
 * 1. Get and add cell class based on turn
 * 2. Check win condition
 * 3. check draw condition
 * 4. swap turn when when condition checked
 */
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
        circleTurn = !circleTurn;
    }
}

/**
 * 1. check winning condition for every cell
 * 2. checking possible win combination for 3 horizontal, 3 vertical and 2 diagonal
 */
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

/**
 * 1. check condition if condition is draw then show draw message
 * 2. check o or x win condition then show message according to that
 */
function endGame(draw) {
    if (draw) {
        winningMessageTextElement.innerText = "Draw!";
    } else {
        winningMessageTextElement.innerText = `${
            circleTurn ? "O's" : "X's"
        } Wins!`;
    }
    winningMessageElement.classList.add("show");
}

/**
 * 1. checking every cell have elements(o or x)
 * 2. if every cell have element then no move farther
 */
function isDraw() {
    return [...cellElements].every((cell) => {
        return (
            cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
        );
    });
}
