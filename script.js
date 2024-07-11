const cells = document.querySelectorAll('.cell');
const clickSound = new Audio('tap.mp3');
const winSound = new Audio('game-won.mp3');
clickSound.volume = 0.5;
winSound.volume = 0.8;

const currentPlayerDisplay = document.getElementById('currentPlayer');
const xWinsDisplay = document.getElementById('xWins');
const oWinsDisplay = document.getElementById('oWins');
const resetButton = document.getElementById('resetButton');
const messageDisplay = document.getElementById('messageDisplay');

let currentPlayer = '♚';
let board = Array(9).fill(null);
let xWins = 0;
let oWins = 0;

const checkWinner = () => {
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

    for (const combination of winningCombinations) {
        const [a, b, c] = combination;
        if (board[a] && board[a] === board[b] && board[a] === board[c]) {
            return board[a];
        }
    }
    return null;
};

const displayMessage = (message) => {
    messageDisplay.textContent = message;
    messageDisplay.style.display = 'block';
};

const handleClick = (e) => {
    const index = e.target.dataset.index;

    if (board[index] || checkWinner()) {
        return;
    }

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    clickSound.play();

    const winner = checkWinner();
    if (winner) {
        winSound.play();
        const winnerMessage = `The player wins ${winner}!`;
        displayMessage(winnerMessage);

        if (winner === '♚') {
            xWins++;
            xWinsDisplay.textContent = xWins;
        } else {
            oWins++;
            oWinsDisplay.textContent = oWins;
        }
    }

    currentPlayer = currentPlayer === '♚' ? '♛' : '♚';
    currentPlayerDisplay.textContent = currentPlayer;
};

const resetGame = () => {
    board.fill(null);
    cells.forEach(cell => cell.textContent = '');
    currentPlayer = '♚';
    currentPlayerDisplay.textContent = '♚';
    messageDisplay.textContent = '';
    messageDisplay.style.display = 'none';
};

cells.forEach(cell => cell.addEventListener('click', handleClick));
resetButton.addEventListener('click', resetGame);
