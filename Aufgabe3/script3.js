const board = document.getElementById("board");
const cells = [];
let currentPlayer = "X";

let xMoves = [];
let oMoves = [];

const winningCombinations = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

function createBoard() {
    for (let i = 0; i < 9; i++) {
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
        cells.push(cell);
        cell.addEventListener('click', () => makeMove(i));
    }
}

function makeMove(index) {
    if (cells[index].textContent === "") {
        cells[index].textContent = currentPlayer;
        cells[index].style.backgroundImage = "none";
        cells[index].classList.add("geklickt");
        if (currentPlayer === "X") {
            cells[index].style.backgroundColor = "lightblue";
            currentPlayer = "O";
            xMoves.push(index);
            setTimeout(() => {
                botMove();
            }, 300);
        } else {
            cells[index].style.backgroundColor = "lightcoral";
            currentPlayer = "X";
            oMoves.push(index);
        }
        gameFinished();
    }
}

function gameFinished() {
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        if (combination.every((value) => xMoves.includes(value))) {
            finishGame("Player X Won");
            return;
        }
        if (combination.every((value) => oMoves.includes(value))) {
            finishGame("Player O Won");
            return;
        }
    }

    const totalMoves = oMoves.length + xMoves.length;
    if (totalMoves === 9 && !xMoves.length === !oMoves.length) {
        finishGame("Stalemate");
    }
}

function botMove() {
    let botIndex = -1;
    for (let i = 0; i < winningCombinations.length; i++) {
        const combination = winningCombinations[i];
        const emptyCells = combination.filter((value) => !xMoves.includes(value) && !oMoves.includes(value));
        if (emptyCells.length === 1) {
            botIndex = emptyCells[0];
            break;
        }
    }

    if (botIndex === -1) {
        const availableMoves = cells.reduce((acc, cell, index) => {
            if (cell.textContent === "") {
                acc.push(index);
            }
            return acc;
        }, []);

        const randomIndex = Math.floor(Math.random() * availableMoves.length);
        botIndex = availableMoves[randomIndex];
    }

    cells[botIndex].style.backgroundImage = "none";
    cells[botIndex].textContent = "O";
    cells[botIndex].style.backgroundColor = "lightcoral";
    oMoves.push(botIndex);

    currentPlayer = "X";
    cells[botIndex].classList.add("geklicked");
    gameFinished();
}

function finishGame(text) {
    setTimeout(() => {
        if (!alert(text)) {
            window.location.reload();
        }
    }, 100);
}

createBoard();

