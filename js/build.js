'use strict'

const EMPTY = 0
const BOMB = '💥'
const COVER = '⬜'
const MINE = '🏴‍☠️'
const OPEN = 'open'

var runTime = 0.0
var gBombs = []
var glife = '3'
var score = 0
var gsizeBoard = 5
var gBoard
var gNumBomb = 2
var gmaxScore
var time = '0.0'
var timer
var gameActive = true
var gfirstClick = true

//
function init() {

    clearInterval(timer)
    creatGame()
    countMax()
    printLife()
    printSmily()
    updateScore()
    showTimer()
}

//
function level(levelUser) {
    gsizeBoard = 5
    gNumBomb = levelUser * 2
    gsizeBoard += levelUser
    countMax()
    playAgein(gNumBomb, gsizeBoard)
}

//
function creatGame() {
    gBoard = buildBoard(gsizeBoard, EMPTY, COVER)
    var selector = '.board-container'
    printMat(gBoard, selector)
}

//
function printSmily(smiley = "img/Smily.jpg") {
    var imgSmily = document.querySelector('.smiley')
    imgSmily.innerHTML = `<img src=${smiley} alt="smily" height="100px"></img>`
}



//
function countMax() {
    gmaxScore = gsizeBoard ** 2
    gmaxScore -= gNumBomb
}



//
function hideBomb(neighbors) {
    // חיפוש פצצה
    var loctionBomb = true
    for (let i = 0; i < gNumBomb; i++) {
        var col = getRandomIntInclusive(0, gsizeBoard - 1)
        var row = getRandomIntInclusive(0, gsizeBoard - 1)
        // var col = +prompt()
        // var row = +prompt()
        // הנחת הפצצה, והשמה במערך
        var loctionBomb = checkBombs(col, row, neighbors)
        if (loctionBomb) {
            gBombs[i] = {
                i: col,
                j: row
            }
            gBoard[col][row].value = BOMB
            countNeighbors(col, row)
        } else i--
    }
   
    gfirstClick = false
}

function checkBombs(col, row, neighbors) {

    for (let y = 0; y < neighbors.length; y++) {
        var neighbor = neighbors[y]
               if (neighbor.i === col && neighbor.j === row) return false
    }
    if (gBombs.length === 0) return true
       for (let x = 0; x < gBombs.length; x++) {
        var bomb = gBombs[x]
        console.log('bomb ', bomb)
        if (bomb.i === col && bomb.j === row) return false
    }


    return true
}


//
function gameOver(end) {

    gameActive = false
    clearInterval(timer)
    if (end) {
        var mesegeEnd = `YOU WIN <br> your score: ${score}`
        var buttonAgein = 'play agein'
        var smiley = "img/happysmily.jpg"
    } else {
        var mesegeEnd = 'GAME OVER'
        var buttonAgein = 'try agein'
        var smiley = "img/sadsmily.jpg"
    }
    printSmily(smiley)
    var elModalEnd = document.querySelector('.modal-end')
    elModalEnd.innerHTML = mesegeEnd + `<br><button onclick="playAgein()" type="reset">${buttonAgein}</button>`
    elModalEnd.style.display = 'block'
}

//
function playAgein() {
    gameActive = true
    gfirstClick = true
    score = 0
    updateScore(score)
    glife = 3
    gBoard = []
    gBombs = []
    score = 0
    var elModalEnd = document.querySelector('.modal-end')
    elModalEnd.style.display = 'none'
    init()
}

//
function neighborsBombFirstClick(cellI, cellJ, select) {
    var neighbor = false;

    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            if (select.i === i && select.j === j) {
                neighbor = true
                return neighbor
            }
        }
    }
    return neighbor;
}

//
window.oncontextmenu = function (e) {
    e.preventDefault()
    if (gfirstClick) return
    if (!gameActive) return
    var rightClick = getLocationClick(e.target.id)
    var i = rightClick.i
    var j = rightClick.j
    if (gBoard[i][j].vague === OPEN) return
    if (gBoard[i][j].vague === MINE) var display = COVER
    if (gBoard[i][j].vague === COVER) var display = MINE

    renderCell(rightClick, display)
    gBoard[rightClick.i][rightClick.j].vague = display

}


//
function printLife(strlife = '❤❤❤') {
    var elLife = document.querySelector('.life')
    elLife.innerHTML = strlife
}
//
function updateScore(score = 0) {
    var scoreNow = document.querySelector('.score-num')
    scoreNow.innerHTML = score
}