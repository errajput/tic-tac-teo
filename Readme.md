# tic-tac-teo

## Tic-Tac-Toe Game

A simple and interactive Tic-Tac-Toe game built with HTML, CSS, and JavaScript.
This version includes dynamic turn indication, restart and reset functionality, and win/draw detection with a clean UI.

### Features

-   Two-player gameplay — Play as X or O turn by turn
-   Turn Indicator — Displays whose turn it is (X or O)
-   Winning Detection — Automatically checks for winning combinations
-   Draw Detection — Declares a draw if all cells are filled without a winner
-   Restart Game — Restarts the game instantly without reloading the page
-   Reset Game — Resets the entire board and starts a fresh game
-   Responsive UI — Works smoothly across different devices

### How It Works

The game board consists of 9 cells (3x3 grid).

Players take turns marking cells with either X or O.

The first player to align three of their marks (horizontally, vertically, or diagonally) wins.

If all cells are filled and no player wins, the game ends in a draw.

The turn indicator updates after every move to show whose turn it is next.

The Restart and Reset buttons allow you to replay easily.

### Game Logic Overview

Core Variables:

X_CLASS and CIRCLE_CLASS: Used to mark X’s and O’s moves.

WINNING_COMBINATIONS: Defines all possible win patterns.

circleTurn: Boolean value that tracks the current player.

Main Functions:

startGame() → Initializes or restarts the game.

handleClick() → Handles player moves and triggers checks.

checkWin(currentClass) → Checks all winning combinations for a winner.

isDraw() → Checks if all cells are filled (draw condition).

endGame(draw) → Displays winning or draw message.

updateTurnIndicator() → Displays whose turn it is dynamically.
