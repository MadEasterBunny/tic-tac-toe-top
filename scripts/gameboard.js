const gameboard = (function() {
    let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    //cache DOM
    const gameboardEl = document.querySelector("#gameboard");
    
    function _render() {
        createGrid();
    }

    function createGrid() {
        for (let row = 0; row < gameboard.length; row++) {
            for (let col = 0; col < gameboard[row].length; col++) {
                const square = document.createElement('div');
                square.classList.add('square');
                square.setAttribute('data-row', row);
                square.setAttribute('data-col', col);
                gameboardEl.appendChild(square);
            }
        }
    }
    
    function placeMarker(index1, index2, marker) {
        gameboard[index1][index2] = marker;
        events.emit("boardChanged", gameboard);
    }
    
    function resetBoard() {
        gameboard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
    }

    _render();

    return {
        placeMarker: placeMarker,
        resetBoard: resetBoard,
    };

})();