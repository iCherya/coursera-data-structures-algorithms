// Max time used: 0.27/10.00, max memory used: 33816576/536870912.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const [vertices, edges] = line.toString().trim().split(' ').map(Number);
    const data = [];

    rl.on('line', (nextLine) => {
        const item = nextLine
            .toString()
            .split(' ')
            .map((a) => parseInt(a, 10))
            .filter((a) => !Number.isNaN(a));
        if (data.length <= vertices) {
            data.push(item);
        }

        if (data.length === vertices + 1) {
            budgetAllocation(data, vertices, edges);
            process.exit();
        }
    });
});

function budgetAllocation(A, n, m) {
    const b = A.pop();
    const arrays = {
        arr1: [0, 1],
        arr2: [
            [0, 0],
            [1, 0],
            [0, 1],
            [1, 1]
        ],
        arr3: [
            [0, 0, 0],
            [1, 0, 0],
            [0, 1, 0],
            [0, 0, 1],
            [1, 1, 0],
            [1, 0, 1],
            [0, 1, 1],
            [1, 1, 1]
        ]
    };

    let clauses = [];
    for (let i = 0; i < n; i += 1) {
        const C = [];
        for (let j = 0; j < m; j += 1) {
            if (A[i][j] !== 0) C.push(j);
        }
        if (C.length === 0) {
            if (b[i] < 0) {
                clauses = [[1], [-1]];
                break;
            } else {
                continue;
            }
        } else if (C.length === 1) {
            for (const u of arrays.arr1) {
                if (A[i][C[0]] * u > b[i]) {
                    if (u === 0) {
                        clauses.push([C[0] + 1]);
                    } else {
                        clauses.push([-C[0] - 1]);
                    }
                }
            }
        } else if (C.length === 2) {
            for (const [u, v] of arrays.arr2) {
                if (A[i][C[0]] * u + A[i][C[1]] * v > b[i]) {
                    let temp = [];
                    for (let k = 0; k < 2; k += 1) {
                        if ([u, v][k] === 0) {
                            temp = [...temp, [C[k] + 1]];
                        } else {
                            temp = [...temp, [-C[k] - 1]];
                        }
                    }
                    clauses.push(temp);
                }
            }
        } else if (C.length === 3) {
            for (const [u, v, w] of arrays.arr3) {
                if (A[i][C[0]] * u + A[i][C[1]] * v + A[i][C[2]] * w > b[i]) {
                    let temp = [];
                    for (let k = 0; k < 3; k += 1) {
                        if ([u, v, w][k] === 0) {
                            temp = [...temp, [C[k] + 1]];
                        } else {
                            temp = [...temp, [-C[k] - 1]];
                        }
                    }
                    clauses.push(temp);
                }
            }
        }
    }

    let variables;
    if (clauses.length === 0) {
        clauses = [[1, -1]];
        variables = 1;
    } else if (JSON.stringify(clauses) === JSON.stringify([[1], [-1]])) {
        variables = 1;
    } else {
        variables = m;
    }

    console.log(clauses.length, variables);

    clauses.forEach((clause) => {
        console.log(clause.join(' '), '0');
    });
}

module.exports = budgetAllocation;
