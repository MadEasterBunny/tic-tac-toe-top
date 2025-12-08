function players (name, marker) {
    const playerName = name;
    const playerMarker = marker
    return { playerName, playerMarker }
}

const gameController = (function() {
    const winnerText = document.querySelector("#winner");
    const playerTurnText = document.querySelector("#playerTurn");
    const squares = document.querySelectorAll(".square");
    const restartBtn = document.querySelector("#restart");
    const player1 = players("player1", "X");
    const player2 = players("player2", "O");

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
                if(value1 === "X") {
                    return "player1"
                } else {
                    return "player2"
                }
            }

            return null;
        }

        for(let i = 0; i < arr.length; i ++) {
            const winner = playerWins(arr[i][0], arr[i][1], arr[i][2]);
            if(winner) {
                console.log(`Win in row ${i} for ${winner}`);
                return winner;
            }
        }

        for(let j = 0; j < arr.length; j++) {
            const winner = playerWins(arr[0][j], arr[1][j], arr[2][j])
            if(winner) {
                console.log(`Win in column ${j} for ${winner}`);
                return winner;
            }
        }

        let winner = playerWins(arr[0][0], arr[1][1], arr[2][2]);

        if(winner) {
            console.log(`Win in main diagnal for ${winner}`);
            return winner;
        }

        winner = playerWins(arr[0][2], arr[1][1], arr[2][0])
        if(winner) {
            console.log(`Win in anti-diagonal for ${winner}`);
            return winner;
        }

        console.log(`No winner`);
        return null;
    }

    const playRound = (e) => {
        const row = getTarget(e.target).row;
        const col = getTarget(e.target).col;
        const currentPlayer = currentTurn % 2 === 0 ? player1 : player2;

        if(e.target.innerText === "") {
            gameboard.placeMarker(row, col, currentPlayer.playerMarker);
            e.target.innerText = currentPlayer.playerMarker;
            currentTurn++;
        } else {
            return;
        }
    }

    const checkGameStatus = () => {
        const winner = determineWinner(gameboardCopy);
        const currentPlayer = currentTurn % 2 === 0 ? player1 : player2;

        playerTurnText.innerText = `${currentPlayer.playerName}'s turn`

        if(winner || currentTurn === 9) {
            gameover = true;
            winnerText.innerText = winner ? `${winner} wins!` : "No winner. Game Over";
            playerTurnText.innerText = "";
            restartBtn.classList.add("active");
        }
    }

    const clickHandler = (e) => {
        if(gameover) return;
        playRound(e);
        checkGameStatus();
    }

    const restartGame = () => {
        gameboard.resetBoard();
        currentTurn = 0;
        gameover = false;
        winnerText.innerText = "";
        playerTurnText.innerText = "player1's turn";
        squares.forEach(square => {
            square.innerText = "";
        });
        restartBtn.classList.remove("active");
    }

    //bind events
    squares.forEach(square => {
        square.addEventListener("click", clickHandler);
    });

    restartBtn.addEventListener("click", restartGame);

})();