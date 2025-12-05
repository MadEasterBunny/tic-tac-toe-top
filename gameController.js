function players (name, marker) {
    const playerName = name;
    const playerMarker = marker
    return { playerName, playerMarker }
}

const gameController = (function() {
    const player1 = players("player1", "X");
    const player2 = players("player2", "O");

    let currentTurn = 0;
    let gameover = false;

    let gameboardCopy = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];
    
    
    const setMarker = (player, marker) => {
        let value1 = prompt(`${player}'s turn: Enter first digit between 0 and 2`, 0);
        let value2 = prompt(`${player}'s turn: Enter second digit between 0 and 2`, 0);

        while(value1 > 8) {
            value1 = prompt(`${player}'s turn: Please chose a number between 0 and 2 (value 1)`, 0);
        }

        while(value2 > 8) {
            value2 = prompt(`${player}'s turn: Please chose a number between 0 and 2 (value 2)`, 0);
        }

        while(gameboardCopy[value1][value2] !== "") {
            value1 = prompt(`${player}'s turn: Spot already choosen. Please choose another.`, 0);
            value2 = prompt(`${player}'s turn: Spot already choosen. Please choose another.`, 0);
        }

        gameboard.placeMarker(value1, value2, marker);
    }
    
    const playRound = () => {
        while(gameover === false) {
            const winner = determineWinner(gameboardCopy);
            
            if(winner) {
                console.log(winner);
                gameover = true;
                break;
            } else if(currentTurn === 9) {
                gameover = true;
                break;
            } else {
                if(currentTurn % 2 === 0) {
                    setMarker(player1.playerName ,player1.playerMarker);
                    currentTurn++;
                } else {
                    setMarker(player2.playerName ,player2.playerMarker);
                    currentTurn++;
                }
            } 
        }
        
        gameOver();
    }

    const updateGameBoardCopy = (gameboard) => {
        gameboardCopy = gameboard;
        console.log("Gameboard copy", gameboardCopy);
    }
    
    events.on("boardChanged", updateGameBoardCopy);

    const determineWinner = (arr) => {
        const playerWins = (value1, value2, value3) => {
            if(!value1 || value1 === "" || value1 === 0) {
                return false;
            }
            if(value1 === value2 && value1 === value3) {
                return value1;
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

        let winner = playerWins(arr[0][0], arr[1][1], arr[2][2])

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

    const gameOver = () => {
        console.log("Game Over");

        //display a button that calls the following function + a wipe of an other ui elements i add
        const restart = prompt("Would you like to play again?", "yes");

        if(restart.toLowerCase() === "restart" || restart.toLowerCase() === "yes") {
            restartGame(); //call this on Restart Game button press when ui is added
        } else {
            return;
        }
    }

    const restartGame = () => {
        gameboard.resetBoard();
        currentTurn = 0;
        gameover = false;
        playRound();
    }

    playRound();

    return {
        updateGameBoardCopy: updateGameBoardCopy,
    }
})();