const cellELements = document.querySelectorAll("[data-cell]");
const board = document.getElementById("board");
const winningMessageText = document.querySelector('[data-winning-message-text]')
const winningMessageElement = document.getElementById('winningMessage')
let oTurn;
const restartButton = document.getElementById('restartButton')
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
const X_Class = "x";
const O_Class = "o";

startGame();

restartButton.addEventListener('click',startGame)

function startGame() {
    oTurn = false;
    cellELements.forEach((cell) => {
        cell.classList.remove(X_Class)
        cell.classList.remove(O_Class)
        cell.removeEventListener('click',handleClick)
        cell.addEventListener("click", handleClick, { once: true });
    });
    setBoardHoverClass();
    winningMessageElement.classList.remove('show')
}

function handleClick(e) {
    const cell = e.target;
    const currentClass = oTurn ? O_Class : X_Class;
    placeMark(cell, currentClass);
    if (checkWin(currentClass)) {
        endGame(false)
    } else if (isDraw()) {
        endGame(true)
    }
    else {
        swapTurn();
        setBoardHoverClass();
    }
}

function placeMark(cell, currentClass) {
    cell.classList.add(currentClass);
}
function swapTurn() {
    oTurn = !oTurn;
}
function setBoardHoverClass() {
    board.classList.remove(X_Class);
    board.classList.remove(O_Class);
    if (oTurn) {
        board.classList.add(O_Class);
    } else {
        board.classList.add(X_Class);
    }
}

function isDraw() {
    return [...cellELements].every(cell => {
        return cell.classList.contains(X_Class) || 
        cell.classList.contains(O_Class)
    })
}

function endGame(draw) {
    if (draw) {
        winningMessageText.innerHTML = "Draw!";
    }
    else {
        winningMessageText.innerHTML = `${oTurn ? "O's" : "X's"} Wins!`
    }
    winningMessageElement.classList.add('show')
}

function checkWin(currentClass) {
    return winningCombinations.some(combination => {
        return combination.every(index => {
            return cellELements[index].classList.contains(currentClass)
        })
    })
}