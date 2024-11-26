const Gameboard = (function(rows, columns) {

    this.twoDArray = [];
    
    function reset() {
        for (let i = 0; i < columns * rows; i++) {
            twoDArray[i] = null;
        }
    }

    function insert(index, value) {
        twoDArray[index] = value;
    }

    const retrieve = index => twoDArray[index];

    function getRow(row) {
        row = row * rows;

        return twoDArray.slice(row, row + columns);
    }

    function getColumn(column) {
        retrievedColumn = [];

        for (let i = 0; i < rows; i++) {
            retrievedColumn.push(getRow(i)[column]);
        }

        return retrievedColumn;
    }

    function getDiagonals() {
        let leftD = [];
        let rightD = [];
    
        for (let i = 0; i < twoDArray.length; i += rows + 1) {
            leftD.push(twoDArray[i]);
        }
    
        for (let i = rows - 1; i < twoDArray.length - 1; i += rows - 1) {
            rightD.push(twoDArray[i]);
        }
    
        return { leftD, rightD };
    }    

    const includes = value => twoDArray.includes(value);
    const getBoard = () => twoDArray;
    const getRows = () => rows;
    const getColumns = () => columns;

    reset();

    return { reset, insert, retrieve, 
        getRow, getColumn, getDiagonals, 
        includes, getBoard, getRows, getColumns };

})(3, 3);

const Player = function (name, sign) {

    function setName(n) {
        name = n;
    }

    function setSign(s) {
        sign = s;
    }

    function getName() {
        return name;
    }

    function getSign() {
        return sign;
 
    }

    return {setName, setSign, getName, getSign};
}

const Game = (function () {
    const players = {1: Player("X", "X"), 2: Player("O", "O")};
    let turn = 1;

    function changeTurn() {
        turn = turn === 1 ? 2 : 1;
        Display.updateMessage(`Player ${players[turn].getSign()}'s turn`);
    }

    function checkWin(index) {
        const rows = Gameboard.getRows();
        const row = Math.floor(index / rows);
        const column = Math.floor(index / rows) + 1;
        const currentRow = Gameboard.getRow(row);
        const currentColumn = Gameboard.getColumn(column);
        const { leftD, rightD } = Gameboard.getDiagonals();
        const playersSign = players[turn].getSign();

        function areSame(arr, value) {
            return arr.every(item => value === item);
        }

        if (areSame(currentRow, playersSign) || areSame(currentColumn, playersSign) ||
            areSame(leftD, playersSign) || areSame(rightD, playersSign)) {
            return true;
        } 

        return false;
    }

    function checkTie() {
        
        if (Gameboard.includes(null)) {
            return false;
        }
        
        return true;
    }

    function playTurn(event) {
        let index = event.target.dataset.index;
        let sign = players[turn].getSign();
        
        // Play turn only if cell is empty (and if the target is a cell, not the grid)
        if (Gameboard.retrieve(index) || !event.target.classList.contains("cell")) {
            return;
        };

        Gameboard.insert(index, sign);
        
        Display.updateCell(event.target, sign);

        if (checkWin(index)) {
            Display.updateMessage(`Player ${players[turn].getName()} has won!`);
            Display.freeze();
        
        } else if (checkTie()) {
            Display.updateMessage("It's a draw!");

        } else {
            changeTurn();
        }
    }

    function restart() {
        Gameboard.reset();
        Display.render();
        turn = 1;
    }

    return { playTurn, restart };

})();

const Display = (function () {

    const messageDisplay = document.querySelector(".message");
    const grid = document.querySelector(".grid");
    const resetBtn = document.querySelector(".reset");


    function render() {
        resetBtn.addEventListener("click", Game.restart);
        grid.addEventListener("click", Game.playTurn);
        updateMessage("Player X's turn");
        grid.replaceChildren();
        
        for (let i = 0; i < 9; i++) {
            let cell = document.createElement("div");
            cell.classList.add("cell");
            cell.dataset.index = i;
            let span = document.createElement("span");
            cell.append(span);
            grid.append(cell);
        }
    }

    function freeze() {
        grid.removeEventListener("click", Game.playTurn);
    }

    function updateMessage(message) {
        messageDisplay.innerText = message;
    }

    function updateCell(cell, sign) {
        let cellSpan = cell.firstChild;
        cellSpan.classList.add("animated");
        cellSpan.innerText = sign;
    }

    return { render, updateMessage, updateCell, freeze };

})();

Display.render();