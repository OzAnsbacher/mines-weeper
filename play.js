'use strict'

//
function playGame(click) {
    var select = getLocationClick(click.id)
    var neighbors = openCover(select)
    if (gfirstClick) hideBomb(neighbors)
}

//
function getLocationClick(strCellId) {
    var str = strCellId.toString()
    var parts = str.split('-'); // ['cell','2','7']
    var clickLocation = {
        i: +parts[1],
        j: +parts[2]
    }
    return clickLocation
}

//select= i: j:
function openCover(select) {
    if (!gameActive) return
var valueSelect=gBoard[select.i][select.j].value
    if (valueSelect===0||valueSelect===EMPTY) var neighbors = cellNeighbors(select)
    else{
        var neighbors= []
        neighbors[0]=select
    } 
    console.log ('neighbors ', neighbors)
    for (let i = 0; i < neighbors.length; i++) {
        var cell = neighbors[i]
        var value = gBoard[cell.i][cell.j].value
        if (value === MINE) continue
        if (gBoard[cell.i][cell.j].vague === OPEN) continue
        if (value === EMPTY || value === 0) {
            gBoard[cell.i][cell.j].vague = OPEN
            renderCell(cell, EMPTY)
        } else if (value > 0) {
            gBoard[cell.i][cell.j].vague = OPEN
            renderCell(cell, value)
        }
        else if (value === BOMB && i === 0) {
            renderCell(select, value)
            ceckLife()
            continue
        }
        score++
        updateScore(score)
        if (gmaxScore === score) {
            gameOver(true)
        }
    } return neighbors
}




function cellNeighbors(select) {
    var cellI = select.i
    var cellJ = select.j
    var neighbors = [
        {
            i: cellI,
            j: cellJ
        }]
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            var cell = {
                i: i,
                j: j
            }
            neighbors.push(cell)
        }
    } return neighbors
}

//
function ceckLife() {
    glife--
    var strlife = ''
    for (let i = 0; i < glife; i++) {
        strlife += '❤'
    }
    printLife(strlife)

    if (glife === 0) {
        for (let i = 0; i < gBombs.length; i++) {

            renderCell(gBombs[i], BOMB)

        }
        gameOver(false)
    }
    return
}