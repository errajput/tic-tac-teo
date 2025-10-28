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
 * 1. Start the game
 * 2. Reset all cells and event listeners
 * 3. Hide winning message
 * 4. Show the first turn indicator
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
    updateTurnIndicator(); //  added here
}

/**
 * Handles each cell click
 */
function handleClick(e) {
    const cell = e.target;
    const currentClass = circleTurn ? CIRCLE_CLASS : X_CLASS;

    // Place mark
    cell.classList.add(currentClass);

    // Check for win or draw
    if (checkWin(currentClass)) {
        endGame(false);
    } else if (isDraw()) {
        endGame(true);
    } else {
        circleTurn = !circleTurn;
        updateTurnIndicator(); // update turn after each move
    }
}

/**
 * Checks all possible winning combinations
 */
function checkWin(currentClass) {
    return WINNING_COMBINATIONS.some((combination) => {
        return combination.every((index) => {
            return cellElements[index].classList.contains(currentClass);
        });
    });
}

/**
 * Ends the game and shows message
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
 * Checks for draw condition
 */
function isDraw() {
    return [...cellElements].every((cell) => {
        return (
            cell.classList.contains(X_CLASS) ||
            cell.classList.contains(CIRCLE_CLASS)
        );
    });
}

/**
 *  New Feature: Show whose turn it is
 */
function updateTurnIndicator() {
    const indicator = document.getElementById("turn-indicator");
    if (!indicator) {
        const turnDiv = document.createElement("div");
        turnDiv.id = "turn-indicator";
        turnDiv.style.textAlign = "center";
        turnDiv.style.fontSize = "1.5rem";
        turnDiv.style.color = "#fff";
        turnDiv.textContent = `Turn: X`;
        // insert before the board
        document.body.insertBefore(turnDiv, board);
    } else {
        indicator.textContent = `Turn: ${circleTurn ? "O" : "X"}`;
    }
}
