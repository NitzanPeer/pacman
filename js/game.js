'use strict'

const POWER = '@'
const WALL = '#'
const FOOD = '.'
const EMPTY = ' '
const CHERRY = '🍒'

const gGame = {
    score: 0,
    isOn: false,
    foodToWin: 54,
    isPowerOn: false
}

var gBoard
var gCherryIntervalId


function onInit() {
    gGame.isOn = true
    gGame.isPowerOn = false
    gGame.foodToWin = 54
    gGame.score = 0
    console.log('hello')
    gBoard = buildBoard()
    createPacman(gBoard)
    createGhosts(gBoard)
    renderBoard(gBoard)
    document.querySelector('.gameover-modal').style.display = 'none'
    document.querySelector('.victory-modal').style.display = 'none'
    gCherryIntervalId = setInterval(addCherry, 15000)

}

function buildBoard() {
    const size = 10
    const board = []

    for (var i = 0; i < size; i++) {
        board.push([])

        for (var j = 0; j < size; j++) {
            board[i][j] = FOOD

            if (i === 0 || i === size - 1 ||
                j === 0 || j === size - 1 ||
                (j === 3 && i > 4 && i < size - 2)) {
                board[i][j] = WALL
            }

            if ((i === 1 && j === 8) || (i === 8 && j === 8) ||
            (i === 1 && j === 1) || (i === 8 && j === 1)) {
                board[i][j] = POWER
            }
        }
    }
    console.log('board:', board)
    return board
}

function renderBoard(board) {
    var strHTML = ''
    for (var i = 0; i < board.length; i++) {
        strHTML += '<tr>'
        for (var j = 0; j < board[0].length; j++) {

            const cell = board[i][j]
            const className = `cell cell-${i}-${j}`

            strHTML += `<td class="${className}">${cell}</td>`
        }
        strHTML += '</tr>'
    }
    const elContainer = document.querySelector('.board')
    elContainer.innerHTML = strHTML
}

// location is an object like this - { i: 2, j: 7 }
function renderCell(location, value) {
    // Select the elCell and set the value
    const elCell = document.querySelector(`.cell-${location.i}-${location.j}`)
    elCell.innerHTML = value
}

function updateScore(diff) {
    // update model and dom
    gGame.score += diff
    document.querySelector('h2 span').innerText = gGame.score
    if (gGame.score === gGame.foodToWin) gameOver('.victory-modal')
}

function gameOver(modal) {
    console.log('Game Over')
    gGame.isOn = false
    clearInterval(gIntervalGhosts)
    clearInterval(gCherryIntervalId)
    renderCell(gPacman.location, EMPTY)
    document.querySelector(modal).style.display = 'block'

}

function addCherry() {
    const emptyPos = getEmptyPos()
    if (!emptyPos) return

    gBoard[emptyPos.i][emptyPos.j] = CHERRY
    renderCell(emptyPos, CHERRY)
}


// change two modals to one and push a diff message each time (win lose)