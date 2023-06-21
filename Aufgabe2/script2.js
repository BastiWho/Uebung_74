const board = document.getElementById("board");
const cells = [];
let currentPlayer = "X";

let xMoves = [];
let oMoves = [];

const winningCombinations = [ // Alle möglichen Gewinnkombinationen
    // Reihen
    [0, 1, 2], // Erste Reihe
    [3, 4, 5], // Zweite Reihe
    [6, 7, 8], // Dritte Reihe

    // Spalten
    [0, 3, 6], // Erste Spalte
    [1, 4, 7], // Zweite Spalte
    [2, 5, 8], // Dritte Spalte

    // Diagonalen
    [0, 4, 8], // Erste Diagonale
    [2, 4, 6] // Zweite Diagonale
];

function createBoard() {
    for (let i = 0; i < 9; i++){
        const cell = document.createElement("div");
        cell.classList.add("cell");
        board.appendChild(cell);
        cells.push(cell);
        cell.addEventListener('click', function () {
            makeMove(i);
        })
    }
}

function makeMove(index) {
    if (cells[index].textContent === ""){
        cells[index].textContent = currentPlayer;
        cells[index].style.backgroundImage = "none";
        cells[index].classList.add("geklickt")
        if (currentPlayer === "X"){
            cells[index].style.backgroundColor = "lightblue";
            currentPlayer = "O";
            xMoves.push(index);
        }else{
            cells[index].style.backgroundColor = "lightcoral";
            currentPlayer = "X";
            oMoves.push(index);
        }
        gameFinished();
    }
}

function gameFinished () {
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
    if (totalMoves === 9) {
        finishGame("Stalemate");
    }
}

function finishGame (text) {
    setTimeout(() => {
        if (!alert(text)) {
            window.location.reload();
        }
    }, 100)
    
}

createBoard();