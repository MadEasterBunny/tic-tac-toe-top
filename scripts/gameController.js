function players (name, marker) {
    const playerName = name;
    const playerMarker = marker
    return { playerName, playerMarker }
}

const gameController = (function() {
    const dialog = document.querySelector("dialog");
    const form = document.querySelector("form");
    const winnerText = document.querySelector("#winner");
    const playerTurnText = document.querySelector("#playerTurn");
    const squares = document.querySelectorAll(".square");
    const restartBtn = document.querySelector("#restart");

    let player1 = null;
    let player2 = null;
    let currentTurn = 0;
    let gameover = false;
    let gameboardCopy = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    const getTarget = (target) => {
        const row = target.dataset.row;
        const col = target.dataset.col;
        return { row, col };
    }
    
    const updateGameBoardCopy = (gameboard) => {
        gameboardCopy = gameboard;
    }
    
    events.on("boardChanged", updateGameBoardCopy);

    const determineWinner = (arr) => {
        const playerWins = (value1, value2, value3) => {
            if(!value1 || value1 === "" || value1 === 0) {
                return false;
            }
            if(value1 === value2 && value1 === value3) {
                return value1 === "X" ? player1.playerName : player2.playerName;
            }

            return null;
        }

        for(let i = 0; i < arr.length; i ++) {
            const winner = playerWins(arr[i][0], arr[i][1], arr[i][2]);
            if(winner) {
                return winner;
            }
        }

        for(let j = 0; j < arr.length; j++) {
            const winner = playerWins(arr[0][j], arr[1][j], arr[2][j])
            if(winner) {
                return winner;
            }
        }

        let winner = playerWins(arr[0][0], arr[1][1], arr[2][2]);

        if(winner) {
            return winner;
        }

        winner = playerWins(arr[0][2], arr[1][1], arr[2][0])
        if(winner) {
            return winner;
        }

        return null;
    }

    const startGame = (e) => {
        e.preventDefault();
        const player1Name = form.elements.player1.value;
        const player2Name = form.elements.player2.value;
        player1 = players(player1Name, "X");
        player2 = players(player2Name, "O");
        playerTurnText.innerText = `${player1.playerName}'s turn`;
        dialog.close();
    }

    const playRound = (e) => {
        const row = getTarget(e.target).row;
        const col = getTarget(e.target).col;
        const currentPlayer = currentTurn % 2 === 0 ? player1 : player2;
        const markerColor = currentPlayer === player1 ? "player1" : "player2";
        
        if(e.target.innerText === "") {
            gameboard.placeMarker(row, col, currentPlayer.playerMarker);
            e.target.innerText = currentPlayer.playerMarker;
            e.target.classList.add(markerColor);
            currentTurn++;
        } else {
            return;
        }
    }

    const checkGameStatus = () => {
        const winner = determineWinner(gameboardCopy);
        const currentPlayer = currentTurn % 2 === 0 ? player1 : player2;

        playerTurnText.innerText = `${currentPlayer.playerName}'s turn`;

        if(winner || currentTurn === 9) {
            gameover = true;
            winnerText.innerText = winner ? `${winner} wins!` : "No winner. Game Over";
            playerTurnText.innerText = "";
            restartBtn.classList.add("active");
        }
    }

    const restartGame = () => {
        gameboard.resetBoard();
        currentTurn = 0;
        gameover = false;
        winnerText.innerText = "";
        playerTurnText.innerText = `${player1.playerName}'s turn`;
        squares.forEach(square => {
            square.innerText = "";
            square.classList.remove("player1");
            square.classList.remove("player2");
        });
        restartBtn.classList.remove("active");
    }

    const clickHandler = (e) => {
        if(gameover) return;
        playRound(e);
        checkGameStatus();
    }

    dialog.showModal();

    //bind events
    form.addEventListener("submit", startGame);

    squares.forEach(square => {
        square.addEventListener("click", clickHandler);
    });

    restartBtn.addEventListener("click", restartGame);

})();