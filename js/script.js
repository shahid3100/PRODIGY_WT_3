let board = ["", "", "", "", "", "", "", "", ""];
let currentPlayer = "X";
let gameActive = false;
let mode = "";

const statusText = document.getElementById("status");
const cells = document.querySelectorAll(".cell");

const winConditions = [
    [0,1,2],[3,4,5],[6,7,8],
    [0,3,6],[1,4,7],[2,5,8],
    [0,4,8],[2,4,6]
];

function setMode(selectedMode) {
    mode = selectedMode;
    resetGame();
    statusText.innerText = "Player X's Turn";
    gameActive = true;
}

function makeMove(index) {
    if (!gameActive || board[index] !== "") return;

    board[index] = currentPlayer;
    cells[index].innerText = currentPlayer;

    if (checkWinner()) {
        statusText.innerText = `Congrats \u{1f44f} Player ${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (!board.includes("")) {
        statusText.innerText = "It's a Draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === "X" ? "O" : "X";
    statusText.innerText = `Player ${currentPlayer}'s Turn`;

    if (mode === "ai" && currentPlayer === "O") {
        setTimeout(aiMove, 500);
    }
}

function aiMove() {
    let emptyCells = board
        .map((val, idx) => val === "" ? idx : null)
        .filter(v => v !== null);

    let randomIndex = emptyCells[Math.floor(Math.random() * emptyCells.length)];
    makeMove(randomIndex);
}

function checkWinner() {
    return winConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
}

function resetGame() {
    board = ["", "", "", "", "", "", "", "", ""];
    cells.forEach(cell => cell.innerText = "");
    currentPlayer = "X";
    gameActive = true;
    statusText.innerText = "Player X's Turn";
}
