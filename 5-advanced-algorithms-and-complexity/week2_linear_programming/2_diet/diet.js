// Max time used: 0.74/60.00, max memory used: 20369408/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const [n, m] = line.trim().split(' ').map(Number);
    const A = [];
    const bigNumber = 1e9;
    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);

        if (A.length < n) {
            A.push(item);
        }

        if (A.length === n) {
            rl.once('line', (line) => {
                let b = line.toString().trim().split(' ').map(Number);
                rl.once('line', (line) => {
                    let c = line.toString().trim().split(' ').map(Number);
                    const result = solveDietProblem(n, m, A, b, c, bigNumber);
                    printResult(...result);
                    process.exit();
                });
            });
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

function selectPivotElement(a, usedRows, usedColumns) {
    const len = a.length;

    const pivotElement = new Position(0, 0);

    while (usedRows[pivotElement.row]) {
        pivotElement.row += 1;
    }

    while (usedColumns[pivotElement.column]) {
        pivotElement.column += 1;
    }

    while (0 === a[pivotElement.row][pivotElement.column] || usedRows[pivotElement.row]) {
        pivotElement.row += 1;
        if (pivotElement.row > len - 1) {
            return [false, null];
        }
    }

    return [true, pivotElement];
}

function swapLines(a, b, usedRows, pivotElement) {
    [a[pivotElement.column], a[pivotElement.row]] = [a[pivotElement.row], a[pivotElement.column]];
    [b[pivotElement.column], b[pivotElement.row]] = [b[pivotElement.row], b[pivotElement.column]];
    [usedRows[pivotElement.column], usedRows[pivotElement.row]] = [
        usedRows[pivotElement.row],
        usedRows[pivotElement.column]
    ];
    pivotElement.row = pivotElement.column;
}

function processPivotElement(a, b, pivotElement) {
    const n = a.length;
    const m = a[pivotElement.row].length;
    let scale = a[pivotElement.row][pivotElement.column];

    for (let j = 0; j < m; j++) {
        a[pivotElement.row][j] /= scale;
    }

    b[pivotElement.row] /= scale;

    for (let i = 0; i < n; i++) {
        if (i != pivotElement.row) {
            scale = a[i][pivotElement.column];

            for (let j = pivotElement.column; j < n; j++) {
                a[i][j] -= a[pivotElement.row][j] * scale;
            }

            b[i] -= b[pivotElement.row] * scale;
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
        const [solved, pivotElement] = selectPivotElement(a, usedRows, usedColumns);

        if (!solved) {
            return [false, null];
        }
        swapLines(a, b, usedRows, pivotElement);
        processPivotElement(a, b, pivotElement);
        markPivotElementUsed(pivotElement, usedRows, usedColumns);
    }

    return [true, b];
}

function addEquations(n, m, A, b, bigNumber) {
    for (let i = 0; i < m; i++) {
        const e = new Array(m).fill(0);
        e[i] = -1;
        A.push(e);
        b.push(0);
    }
    A.push(new Array(m).fill(1));
    b.push(bigNumber);
}

function checkResult(n, m, A, b, c, result, lastEquation, ans, bestScore) {
    for (let r of result) {
        if (r < -1e-3) {
            return [false, ans, bestScore];
        }
    }

    for (let i = 0; i < n; i++) {
        let r = 0;
        for (let j = 0; j < m; j++) {
            r += A[i][j] * result[j];
        }
        if (r > b[i] + 1e-3) {
            return [false, ans, bestScore];
        }
    }
    let score = 0;

    for (let j = 0; j < m; j++) {
        score += c[j] * result[j];
    }

    if (score <= bestScore) {
        return [false, ans, bestScore];
    } else {
        if (lastEquation) {
            return [true, 1, score];
        } else {
            return [true, 0, score];
        }
    }
}

function solveDietProblem(n, m, A, b, c, bigNumber) {
    addEquations(n, m, A, b, bigNumber);

    let l = n + m + 1;
    let ans = -1;
    let bestScore = -Infinity;
    let bestResult = null;
    let isAccepted = false;

    for (let x = 0; x < Math.pow(2, l); x++) {
        const usedIndex = [];

        for (let i = 0; i < l; i++) {
            if (Math.floor((x / Math.pow(2, i)) % 2) === 1) {
                usedIndex.push(i);
            }
        }

        if (usedIndex.length !== m) continue;

        let lastEquation = false;
        if (usedIndex[usedIndex.length - 1] == l - 1) {
            lastEquation = true;
        }

        const As = [];
        const bs = [];

        for (let i = 0; i < usedIndex.length; i++) {
            As.push(A[usedIndex[i]].concat());
            bs.push(b[usedIndex[i]]);
        }

        const [solved, result] = solveEquation(new Equation(As, bs));

        if (solved) {
            [isAccepted, ans, bestScore] = checkResult(
                n,
                m,
                A,
                b,
                c,
                result,
                lastEquation,
                ans,
                bestScore
            );

            if (isAccepted) {
                bestResult = result;
            }
        }
    }

    return [ans, bestResult];
}

function printResult(anst, ansx) {
    if (anst === -1) {
        console.log('No solution');
    }
    if (anst === 0) {
        console.log('Bounded solution');
        console.log(ansx.map((el) => el.toFixed(18)).join(' '));
    }
    if (anst === 1) {
        console.log('Infinity');
    }
}
