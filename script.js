//Use player to facilitate match and scoring

const player1 = createPlayer("player1", "X");
const player2 = createPlayer("player2", "O");

function createPlayer(name, marker) {
    const playerName = name;
    const playerMarker = marker;

    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;

    return { playerName, playerMarker, getScore, increaseScore }
}




//Use gameboard to keep track of markers

let gameboard = createGameboard();

function createGameboard() {
    let gameboard = [];
    fillGameboardWithCells();

    function createCell(id) {
        let cellId = id;
        let cellMarker = "empty";
        return { cellId, cellMarker }
    }

    function fillGameboardWithCells() {
        for (i=0;i<9;i++) {
            gameboard[i] = createCell(i);
        }
    }

    return gameboard;
}

//Use announcer to facilitate gameplay

const moderator = (function () {
    let turn = 0;

    const getTurn = () => {
        return (turn%2 == 0) ? console.log(`It is now ${player1.playerName} "${player1.playerMarker}" turn`) : console.log(`It is now ${player2.playerName} "${player2.playerMarker}" turn`);
    } 
    
    const increaseTurn = () => {
        turn++;
        console.log(`current turn is ${turn}`);

    }
    return { getTurn, increaseTurn }
})();

function markCell(number,player) {
    
    let selectedCell = gameboard[number];

    if (selectedCell.cellMarker == "empty") {
        gameboard[number].cellMarker = player.playerMarker;
        console.table(gameboard);
        checkWinCondition(player);
        checkTieCondition();
    } else {
        console.log(`This cell is already occupied.`)
    }
}

function checkWinCondition(player) {
    let x = player.playerMarker;
    
    if (gameboard[0].cellMarker == x && 
        gameboard[1].cellMarker == x && 
        gameboard[2].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[3].cellMarker == x && 
        gameboard[4].cellMarker == x && 
        gameboard[5].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[6].cellMarker == x && 
        gameboard[7].cellMarker == x && 
        gameboard[8].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[0].cellMarker == x && 
        gameboard[3].cellMarker == x && 
        gameboard[6].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[1].cellMarker == x && 
        gameboard[4].cellMarker == x && 
        gameboard[7].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[2].cellMarker == x && 
        gameboard[5].cellMarker == x && 
        gameboard[8].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[0].cellMarker == x && 
        gameboard[4].cellMarker == x && 
        gameboard[8].cellMarker == x) {
            return announcePlayerWin(player)
    }

    if (gameboard[6].cellMarker == x && 
        gameboard[4].cellMarker == x && 
        gameboard[2].cellMarker == x) {
            return announcePlayerWin(player)
    }
}

function checkTieCondition() {
    
    let occupiedSpace = 0;

    for (i=0;i<9;i++) {
        if(gameboard[i].cellMarker!=='empty') {
            occupiedSpace++;
        }
    }
    if (occupiedSpace==9) {
        announceTie();
    } else {
        occupiedSpace = 0;
    }
}

function announcePlayerWin(player) {
    console.log(`${player.playerName} has won!`)
}

function announceTie() {
    console.log(`It's a draw!`);
}

console.table(gameboard);
markCell(0,player1);
markCell(1,player2);
markCell(2,player1);
markCell(3,player2);
markCell(4,player1);
markCell(5,player2);
markCell(6,player2);
markCell(7,player1);
markCell(8,player2);

