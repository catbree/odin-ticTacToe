//Use player to track marker and scoring

const player1 = createPlayer("player1", "X");
const player2 = createPlayer("player2", "O");

function createPlayer(name, marker) {
    const playerName = name;
    const playerMarker = marker;

    let score = 0;
    const getScore = () => score;
    const increaseScore = () => score++;


    return { playerName, playerMarker }
}

  

//Use gameboard to keep track of markers

let gameboard = createGameboard();

function createGameboard() {
    let gameboard = [];
    fillGameboardWithCells();

    function createCell(id) {
        let cellId = id;
        let cellMarker = "";
        return { cellId, cellMarker }
    }

    function fillGameboardWithCells() {
        for (i=0;i<9;i++) {
            gameboard[i] = createCell(i);
        }
    }

    return gameboard;
}

// Display controller to initiate interface
const displayController = (function() {
    
    const startGameButton = document.querySelector(".startGameButton");
    const tableGameboard = document.querySelector(".tableGameboard");
    const announcement = document.querySelector(".announcement");
    const gameboardCell = document.querySelectorAll(".gameboardCell");

    gameboardCell.forEach( cell => {
        cell.addEventListener("click", (e) => {
            moderator.playRound(parseInt(e.target.dataset.index),moderator.getCurrentPlayer());
            
            for (i=0;i<gameboardCell.length;i++) {
                    console.log(`updated!`)
                    gameboardCell[i].textContent = gameboard[i].cellMarker; 
            }
            
        })
    })

    startGameButton.addEventListener("click", () => {
        startGameButton.style.display = "none";
    })

    const updateGameboard = () => {
        for (i=0;i<gameboardCell.length;i++) {
            console.log(`updated!`)
            gameboardCell.textContent = gameboard[i].cellMarker;
        }
    }

    return { announcement, gameboardCell }
})();

//Use moderator to facilitate gameplay

const moderator = (function () {
    let turn = 0;
    let gameOver = false;

    const playRound = (number,currentPlayer) => {

        if (turn === 9) {
            displayController.announcement.textContent(`It's a draw`);
            gameOver = true;
            return;
          }

        let selectedCell = gameboard[number];
        console.log(`The selected cell is currently marked as ${selectedCell.cellMarker}`)

        if (selectedCell.cellMarker == "") {
            console.log(`Marking cell with ${currentPlayer.playerMarker}`)
            gameboard[number].cellMarker = currentPlayer.playerMarker;
            console.table(gameboard);
            checkWinCondition(currentPlayer);
            turn++;
        } else {
            console.log(`This cell is already occupied.`)
        }
        
    }

    const getCurrentPlayer = () => {
        return turn%2 === 0 ? player1 : player2
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
        let tieCondition = false;

        for (i=0;i<9;i++) {
            if(gameboard[i].cellMarker!=='') {
                occupiedSpace++;
            }
        }
        if (occupiedSpace==9) {
            tieCondition = true;
            announceTie();
        } else {
            occupiedSpace = 0;
            increaseTurn();
            playerTurn();
        }

        return tieCondition
    }

    function announcePlayerWin(player) {
        alert(`${player.playerName} has won!`)

    }

    function announceTie() {
        alert(`It's a draw!`)
    }

    return { playRound, checkTieCondition, getCurrentPlayer }
})();