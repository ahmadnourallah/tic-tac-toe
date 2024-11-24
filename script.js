function TwoDArray(rows, columns) {
    this.rows = rows;
    this.columns = columns;

    this.reset()
}

Object.setPrototypeOf(TwoDArray.prototype, Array.prototype);

TwoDArray.prototype.reset = function () {
    for (let i = 0; i < this.columns * this.rows; i++) {
        this[i] = null;
    }
}

TwoDArray.prototype.insert = function (row, column, value) {
    this[column + (row * this.rows)] = value;
}

TwoDArray.prototype.retrieve = function (row, column) {
    return this[column + (row * this.rows)];
}

TwoDArray.prototype.getRow = function(row) {
    row = row * this.rows;

    return this.slice(row, row + this.columns);
}

TwoDArray.prototype.getColumn = function(column) {
    retrievedColumn = [];

    for (let i = 0; i < this.rows; i++) {
        retrievedColumn.push(this.getRow(i)[column]);
    }

    return retrievedColumn;
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