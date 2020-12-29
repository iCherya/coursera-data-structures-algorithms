// Max time used: 0.08/5.00, max memory used: 17563648/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const n = parseInt(line);
    const a = [];
    const b = [];

    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);

        if (a.length < n) {
            a.push(item.slice(0, n));
            b.push(item[n]);
        }

        if (a.length === n) {
            const equation = new Equation(a, b);
            const solution = solveEquation(equation);
            printColumn(solution);
            process.exit();
        }
    });
});

class Equation {
    constructor(a, b) {
        this.a = a;
        this.b = b;
    }
}

class Position {
    constructor(column, row) {
        this.column = column;
        this.row = row;
    }
}

function selectPivotElement(a, step) {
    let max = step;
    for (let i = step + 1; i < a.length; i++) {
        if (Math.abs(a[i][step]) > Math.abs(a[max][step])) {
            max = i;
        }
    }
    return new Position(max, step);
}

function swapLines(a, b, usedRows, pivotElement) {
    [a[pivotElement.column], a[pivotElement.row]] = [a[pivotElement.row], a[pivotElement.column]];
    [b[pivotElement.column], b[pivotElement.row]] = [b[pivotElement.row], b[pivotElement.column]];
    [usedRows[pivotElement.column], usedRows[pivotElement.row]] = [
        usedRows[pivotElement.row],
        usedRows[pivotElement.column]
    ];
    pivotElement.column = pivotElement.row;
}

function processPivotElement(a, b, pivotElement) {
    for (let i = pivotElement.column + 1; i < b.length; i++) {
        const alpha = a[i][pivotElement.column] / a[pivotElement.row][pivotElement.column];
        b[i] -= b[pivotElement.row] * alpha;
        for (let j = pivotElement.column; j < a.length; j++) {
            a[i][j] -= a[pivotElement.row][j] * alpha;
        }
    }
}

function markPivotElementUsed(pivotElement, usedRows, usedColumns) {
    usedRows[pivotElement.row] = true;
    usedColumns[pivotElement.column] = true;
}

function solveEquation(equation) {
    const a = equation.a;
    const b = equation.b;
    const size = a.length;

    const usedColumns = new Array(size).fill(false);
    const usedRows = new Array(size).fill(false);

    for (let step = 0; step < size; step++) {
        const pivotElement = selectPivotElement(a, step);
        swapLines(a, b, usedRows, pivotElement);
        processPivotElement(a, b, pivotElement);

        markPivotElementUsed(pivotElement, usedRows, usedColumns);
    }

    for (let i = size - 1; i >= 0; i--) {
        let divider = a[i][i];

        for (let j = i + 1; j < a[0].length; j++) {
            b[i] -= b[j] * a[i][j];
        }
        b[i] /= divider;
    }
    return b;
}

function printColumn(column) {
    const size = column.length;

    for (let row = 0; row < size; row++) {
        console.log(column[row].toFixed(6));
    }
}
