const board = document.getElementById('game-board');
const result = document.getElementById('result');
const resetButton = document.getElementById('reset-button');

let currentPlayer = 'X';
let cells = Array.from({ length: 9 });

function handleCellClick(index) {
    if (!cells[index] && !result.textContent) {
        cells[index] = currentPlayer;
        renderBoard();
        checkWinner();
        currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    }
}

function renderBoard() {
    board.innerHTML = '';
    cells.forEach((cell, index) => {
        const cellElement = document.createElement('div');
        cellElement.classList.add('cell');
        cellElement.textContent = cell;
        cellElement.addEventListener('click', () => handleCellClick(index));
        board.appendChild(cellElement);
    });
}

function checkWinner() {
    const winningCombos = [
        [0, 1, 2], [3, 4, 5], [6, 7, 8],
        [0, 3, 6], [1, 4, 7], [2, 5, 8],
        [0, 4, 8], [2, 4, 6]
    ];

    for (const combo of winningCombos) {
        const [a, b, c] = combo;
        if (cells[a] && cells[a] === cells[b] && cells[a] === cells[c]) {
            result.textContent = `${currentPlayer} wins!`;
            return;
        }
    }

    if (!cells.includes(undefined)) {
        result.textContent = 'It\'s a draw!';
    }
}

function resetGame() {
    cells = Array.from({ length: 9 });
    currentPlayer = 'X';
    result.textContent = '';
    renderBoard();
}

resetButton.addEventListener('click', resetGame);

renderBoard();
