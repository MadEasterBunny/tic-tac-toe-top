const gameboard = (function() {
    let gameboard = [
        ["", "", ""],
        ["", "", ""],
        ["", "", ""],
    ];

    //cache DOM
    const gameboardEl = document.querySelector("#gameboard");
    
    function _render() {
        events.emit("boardChanged", gameboard);

        gameboardEl.replaceChildren();

        createGrid();

        console.table(gameboard);
    }

    function createGrid() {
        for (let row = 0; row < gameboard.length; row++) {
        for (let col = 0; col < gameboard[row].length; col++) {
            const gridItem = document.createElement('div');
            gridItem.classList.add('square');
            
            // Associate indices using data attributes
            gridItem.setAttribute('data-row', row);
            gridItem.setAttribute('data-col', col);

            // Set initial content/style based on array value
            gridItem.textContent = gameboard[row][col];
            if (gameboard[row][col] === 1) {
                gridItem.classList.add('active');
            }

            gameboardEl.appendChild(gridItem);
        }
    }
    }
    
    function placeMarker(index1, index2, marker) {
        gameboard.forEach(row => {
            row.forEach(item => {
                item.addEventListener("click", () => {
                    console.log(`Clicked ${item}`);
                });
            });
        });
        //gameboard gets updated with marker here
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