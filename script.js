const TwoDArray = function(rows, columns) {

    const twoDArray = [];

    function reset() {
        for (let i = 0; i < columns * rows; i++) {
            twoDArray[i] = i;
        }
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

    reset();

    return { reset, retrieve, getRow, getColumn, getDiagonals };
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