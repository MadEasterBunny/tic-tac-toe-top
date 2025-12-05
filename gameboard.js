const gameboard = (function() {
    let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    
    function _render() {
        events.emit("boardChanged", gameboard);
        console.table(gameboard);
    }
    
    function placeMarker(index1, index2, marker) {
        gameboard[index1][index2] = marker;
        _render();
    }
    
    function resetBoard() {
        gameboard = [
            ["", "", ""],
            ["", "", ""],
            ["", "", ""],
        ];
        _render();
    }

    _render();

    return {
        placeMarker: placeMarker,
        resetBoard: resetBoard,
    };

})();