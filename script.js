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

    function playTurn(index) {
        Gameboard.insert(index, players[turn].getSign());

        if (checkTie()) {
            console.log("Tie!");

        } else if (checkWin(index)) {
            console.log(`${players[turn].getName()} wins!`);

        } else {
            changeTurn();
        }
    }

    return { playTurn };

})();