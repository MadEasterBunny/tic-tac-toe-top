const gameboard = (function() {
    let gameboard = [
        "", "", "",
        "", "", "",
        "", "", "",
    ];

    render();

    function render() {
        console.log(gameboard);
    }

    function placeMarker(index, marker) {
        gameboard[index] = marker;
        render();
    }

    function resetBoard() {
        gameboard = [
            "", "", "",
            "", "", "",
            "", "", "",
        ];
        render();
    }

    return {
        placeMarker: placeMarker,
        resetBoard: resetBoard,
    };

})();

function players (name, marker) {
    const playerName = name;
    const playerMarker = marker
    return { playerName, playerMarker }
}

function gameController () {
    const player1 = players("player1", "X");
    const player2 = players("player2", "O");

    let currentTurn = 0;
    let gameover;

    while(!gameover) {
        if(currentTurn === 9) {
            //need to add a check to see if a player has gotten 3 markers in a row as well
            //May be able to use pubsub to send the status of the gameboard array to compare against different patterns of winning the game
            gameover = true;
            console.log("Game Over");

            //display a button that calls the following function + a wipe of an other ui elements i add
            gameboard.resetBoard();
            gameover === false;
            return;
        }

        //will need to add a check to see if a value has already been entered for a certain index of the array

        if(currentTurn % 2 === 0) {
            //player1 turn
            const index = prompt("Enter a digit between 0 and 8", 0);
            gameboard.placeMarker(index, player1.playerMarker);
            currentTurn++;
        } else {
            //player2 turn
            const index = prompt("Enter a digit between 0 and 8", 0);
            gameboard.placeMarker(index, player2.playerMarker);
            currentTurn++;
        }
    }


}

gameController();