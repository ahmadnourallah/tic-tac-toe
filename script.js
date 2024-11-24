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