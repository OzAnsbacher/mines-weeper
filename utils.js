'use strict'

//
function buildBoard(sizeBoard, EMPTY, COVER) {
    var board = [];
    for (var i = 0; i < sizeBoard; i++) {
        board[i] = [];
        for (var j = 0; j < sizeBoard; j++) {
            board[i][j] = {
                value: EMPTY,
                vague: COVER
            }

        }
    } return board
}

//
function printMat(gboard, selector) {
    var strHTML = '<table border="0"><tbody>';
    for (var i = 0; i < gboard.length; i++) {
        strHTML += '<tr>';
        for (var j = 0; j < gboard[0].length; j++) {
            var cell = gboard[i][j].vague;
            var className = 'cell cell-' + i + '-' + j + ' ';
            var tdId = 'cell-' + i + '-' + j;
            strHTML += '<td id="' + tdId + '" onclick="playGame(this)" ' +
                'class="' + className + '">' + cell + '</td>';
        }
        strHTML += '</tr>'
    }
    strHTML += '</tbody></table>';
    var elContainer = document.querySelector(selector);
    elContainer.innerHTML = strHTML;
}

//
function countNeighbors(cellI, cellJ) {
    // var neighborsCount = 0;
    for (var i = cellI - 1; i <= cellI + 1; i++) {
        if (i < 0 || i >= gBoard.length) continue;
        for (var j = cellJ - 1; j <= cellJ + 1; j++) {
            if (i === cellI && j === cellJ) continue;
            if (j < 0 || j >= gBoard[i].length) continue;
            var val = gBoard[i][j].value
            if (val !== BOMB) {
                if (val >= 0) {
                    gBoard[i][j].value += 1
                } else gBoard[i][j].value = 0
                if (gBoard[i][j].vague === OPEN) {
                    var location = {
                        i: i,
                        j: j
                    }
                    renderCell(location, gBoard[i][j].value)
                }
            }
        }

        // if (mat[i][j].value === BOMB) neighborsCount++;
    }
}
// return neighborsCount;



// location such as: {i: 2, j: 7}
function renderCell(location, value) {
    // Select the elCell and set the value
if (value===0) value=''
    var elCell = document.querySelector(`.cell-${location.i}-${location.j}`);
    elCell.innerHTML = value;
}

//
function getRandomIntInclusive(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

function showTimer(count = '0.0') {
    var strTimer = document.querySelector('.timer')
    strTimer.innerHTML = count
  }
  function startTime() {
    runTime += 0.10
    var strTimer = document.querySelector('.timer')
    strTimer.innerHTML = runTime.toFixed(1)
  }