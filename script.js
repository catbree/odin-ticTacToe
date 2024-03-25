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