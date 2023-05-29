'use strict'


// const PACMAN = '😀'
const PACMAN = '<img src="img/Pacman.png">'
var gPacman

function createPacman(board) {
    gPacman = {
        location: {
            i: 7,
            j: 7
        },
        isSuper: false
    }
    board[gPacman.location.i][gPacman.location.j] = PACMAN
}

function onMovePacman(ev) {
    if (!gGame.isOn) return


    // console.log('gGhosts', gGhosts)
    // console.log('gPacman.isSuper', gPacman.isSuper)

    const nextLocation = getNextLocation(ev)
    // console.log('nextLocation:', nextLocation)
    if (!nextLocation) return

    const nextCell = gBoard[nextLocation.i][nextLocation.j]
    // console.log('nextCell:', nextCell)
    // return if cannot move
    if (nextCell === WALL) return
    // hitting a ghost? call gameOver
    if (nextCell === GHOST) {
        if (gPacman.isSuper) {
            var elSpan = document.querySelector(`td.cell-${nextLocation.i}-${nextLocation.j} span`)
            // console.log('elSpan', elSpan)
            console.log('gGhosts', gGhosts)
            var ghostIndex = gGhosts.findIndex((ghost) => ghost.id === elSpan.dataset.id)
            gGhosts.splice(ghostIndex, 1)
            console.log('gGhosts', gGhosts)
        } else {
            gameOver('.gameover-modal')
            return
        }
    }
    if (nextCell === FOOD) {
        updateScore(1)
        console.log('checkFoodCount()', checkFoodCount())
        var x = checkFoodCount
        console.log('x', x)
        if (!checkFoodCount()) gameOver('.victory-modal')
    }
    if (nextCell === CHERRY) {
        updateScore(10)
    }
    if (nextCell === POWER) {
        if (nextCell === POWER && gPacman.isSuper) return
        powerOn()
    }



    // moving from current location:
    // update the model
    gBoard[gPacman.location.i][gPacman.location.j] = EMPTY
    // update the DOM
    renderCell(gPacman.location, EMPTY)

    // Move the pacman to new location:
    // update the model
    gPacman.location = nextLocation
    gBoard[gPacman.location.i][gPacman.location.j] = PACMAN
    // update the DOM
    renderCell(gPacman.location, PACMAN)
}

function getNextLocation(eventKeyboard) {
    var nextLocation = {
        i: gPacman.location.i,
        j: gPacman.location.j
    }
    // console.log('eventKeyboard.code:', eventKeyboard.code)

    switch (eventKeyboard.code) {
        case 'ArrowUp':
            nextLocation.i--
            break
        case 'ArrowDown':
            nextLocation.i++
            break
        case 'ArrowRight':
            nextLocation.j++
            break
        case 'ArrowLeft':
            nextLocation.j--
            break
        default: return null
    }

    return nextLocation
}

function powerOn() {
    // do we need isPowerOn?
    gGame.isPowerOn = true
    gPacman.isSuper = true
    setTimeout(powerOff, 5000)
}

function powerOff() {
    // do we need isPowerOn?
    gGame.isPowerOn = false
    gPacman.isSuper = false
}