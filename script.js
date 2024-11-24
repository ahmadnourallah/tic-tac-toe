const TwoDArray = function(rows, columns) {

    const twoDArray = [];
    
    function reset() {
        for (let i = 0; i < columns * rows; i++) {
            twoDArray[i] = i;
        }
    }

    function insert(row, column, value) {
        this[column + (row * this.rows)] = value;
    }

    function retrieve(row, column) {
        return twoDArray[column + (row * rows)];
    }

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

    reset();

    return { reset, insert, retrieve, getRow, getColumn, getDiagonals };
}

const Gameboard = (function () {
    const board = new TwoDArray(3, 3);

    function reset() {
        board.reset();
    }

    function placeSign(row, column, sign = "X") {
        board.insert(row, column, sign);
    }

    function getBoard() {
        return board;
    }

    return {reset, placeSign, getBoard};

})();

const Player = function (name, sign) {
    name = name;
    sign = sign;

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