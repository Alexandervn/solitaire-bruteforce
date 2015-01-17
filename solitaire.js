// Board: beginning and wanted result
var NONE  = 0,
    EMPTY = 1,
    PIN   = 2;

var boardStart = [
    [0, 0, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0],
    [2, 2, 2, 2, 2, 2, 2],
    [2, 2, 2, 1, 2, 2, 2],
    [2, 2, 2, 2, 2, 2, 2],
    [0, 0, 2, 2, 2, 0, 0],
    [0, 0, 2, 2, 2, 0, 0],
];

var boardEnd = [
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
    [1, 1, 1, 1, 1, 1, 1],
    [1, 1, 1, 2, 1, 1, 1],
    [1, 1, 1, 1, 1, 1, 1],
    [0, 0, 1, 1, 1, 0, 0],
    [0, 0, 1, 1, 1, 0, 0],
];

function main() {
    var board;

    // How many times to play random games
    n = 10000;

    while (true) {
        if (n === 0) {
            break;
        }

        result = playGame(JSON.parse(JSON.stringify(boardStart)));

        // We got 'em, print the steps to the screen
        if (JSON.stringify(result[0]) === JSON.stringify(boardEnd)) {
            replayGame(JSON.parse(JSON.stringify(boardStart)), result[1]);
        }

        n--;
    }
}

function replayGame(board, game) {
    for (var x = 0; x < game.length; x = x + 1) {
        playPin(board, game[x][0], game[x][1]);
        printBoard(board);
    }
}

function playGame(board) {
    var options,
        random,
        pinToPlay,
        pinTarget;

    var game = [];

    options = getOptions(board);

    while (options.length) {
        randomOption = options[getRandomInt(0, options.length)];
        randomDirection = randomOption[1][getRandomInt(0, randomOption[1].length)];

        game.push([randomOption[0], randomDirection]);

        board = playPin(board, randomOption[0], randomDirection);

        options = getOptions(board);
    }

    return [board, game];
}

function playPin(board, pin, direction) {
    var i, j;

    i = pin[0];
    j = pin[1];
    board[i][j] = EMPTY;

    i = direction[0][0];
    j = direction[0][1];
    board[i][j] = EMPTY;

    i = direction[1][0];
    j = direction[1][1];
    board[i][j] = PIN;

    return board;
}

function getOptions(board) {
    var options = [];

    for (var i = 0; i < board.length; i = i + 1) {
        for (var j = 0; j < board[i].length; j = j + 1) {
            if (board[i][j] === PIN) { 
                var directions = getPinDirections(board, [i, j]);

                if (directions.length) {
                    options.push([[i, j], directions]);
                }
            }
        }
    }

    return options
}

function getPinDirections(board, pin) {
    var i = pin[0],
        j = pin[1];

    var directions = [];

    if (board[i] && board[i][j+1] && board[i][j+1] === PIN) {
        if (board[i][j+2] && board[i][j+2] === EMPTY) {
            directions.push([[i, j+1], [i, j+2]]);
        }
    }

    if (board[i] && board[i][j-1] && board[i][j-1] === PIN) {
        if (board[i][j-2] && board[i][j-2] === EMPTY) {
            directions.push([[i, j-1], [i, j-2]]);
        }
    }

    if (board[i+1] && board[i+1][j] && board[i+1][j] === PIN) {
        if (board[i+2] && board[i+2][j] && board[i+2][j] === EMPTY) {
            directions.push([[i+1, j], [i+2, j]]);
        }
    }

    if (board[i-1] && board[i-1][j] && board[i-1][j] === PIN) {
        if (board[i-2] && board[i-2][j] && board[i-2][j] === EMPTY) {
            directions.push([[i-1, j], [i-2, j]]);
        }
    }

    return directions;
}

function printBoard(board) {
    for (var i = 0; i < board.length; i = i + 1) {
        var line = '';

        for (var j = 0; j < board[i].length; j = j + 1) {
            if (board[i][j] === NONE) {
                line = line + " &nbsp;"; 
            }

            if (board[i][j] === EMPTY) {
                line = line + " ."; 
            }

            if (board[i][j] === PIN) {
                line = line + " x"; 
            }
        }

        var p = document.createElement('div');
        p.innerHTML = line;
        document.body.appendChild(p);
    }

    var p = document.createElement('p');
    p.innerHTML = " ";
    document.body.appendChild(p);
}

function getRandomInt(min, max) {
      return Math.floor(Math.random() * (max - min)) + min;
}

main();
