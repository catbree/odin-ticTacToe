const Gameboard = (function() {
    let cell = [];
    
    for (i=0;i<9;i++) {
        cell[i] = createCell(i);
    }

    function createCell(i) {
        let index = i;
        let marker = "";
        return { index, marker }
    }

    return { cell }
})();

const Player = (function() {
    const player1 = createPlayer("player1", "X");
    const player2 = createPlayer("player2", "O");

    function createPlayer(string,symbol) {
        const name = string;
        const marker = symbol;

        return { name, marker}
    }

    return { player1, player2 }
})();

const displayController = (function() {
   
    const cells = document.querySelectorAll(".gameboardCell");
    const announcement = document.querySelector(".announcement");

    cells.forEach( cell => {
        cell.addEventListener("click", (e) => {
            gameController.playRound(parseInt(e.target.dataset.index),gameController.getCurrentPlayer());
            updateGameboard();
        })
    })

    const updateGameboard = (e) => {
        for (let i=0;i<9;i++) {
            cells[i].textContent = Gameboard.cell[i].marker;
        }
    }

    return { announcement }

})();

const gameController = (function() {
    let turn = 0;
    let gameOver = false;

    const playRound = (index,currentPlayer) => {
        if (turn === 8) {
            displayController.announcement.textContent = `It's a draw`;
            gameOver = true;
            return;
        }

        if (Gameboard.cell[index].marker == "") {
            Gameboard.cell[index].marker = currentPlayer.marker;
            checkWinCondition(currentPlayer);
            turn++;
        } else {
            console.log(`This cell is already occupied.`)
        }

        console.table(Gameboard.cell);
    }

      const getCurrentPlayer = () => {
        return turn%2 === 0 ? Player.player1 : Player.player2
    }  
    
    function checkWinCondition(currentPlayer) {
        let x = currentPlayer.marker;
        
        if (Gameboard.cell[0].marker == x && 
            Gameboard.cell[1].marker == x && 
            Gameboard.cell[2].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[3].marker == x && 
            Gameboard.cell[4].marker == x && 
            Gameboard.cell[5].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[6].marker == x && 
            Gameboard.cell[7].marker == x && 
            Gameboard.cell[8].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[0].marker == x && 
            Gameboard.cell[3].marker == x && 
            Gameboard.cell[6].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[1].marker == x && 
            Gameboard.cell[4].marker == x && 
            Gameboard.cell[7].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[2].marker == x && 
            Gameboard.cell[5].marker == x && 
            Gameboard.cell[8].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[0].marker == x && 
            Gameboard.cell[4].marker == x && 
            Gameboard.cell[8].marker == x) {
                return announcePlayerWin(currentPlayer)
        }

        if (Gameboard.cell[6].marker == x && 
            Gameboard.cell[4].marker == x && 
            Gameboard.cell[2].marker == x) {
                return announcePlayerWin(currentPlayer)
        }
    }

    function announcePlayerWin(player) {
        displayController.announcement.textContent = `${player.name} has won!`;
        gameOver = true;
    }

    function announceTie() {
        alert(`It's a draw!`)
    }

    return { playRound, getCurrentPlayer }

})();