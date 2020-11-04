// Max time used: 0.04/5.00, max memory used: 23482368/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

const parentheses = (string) => {
    const d = [];
    const op = [];

    for (let i = 0; i < string.length; i++) {
        if (i % 2 === 0) d.push(string[i]);
        else op.push(string[i]);
    }

    let n = d.length;
    const m = new Array(n),
        M = new Array(n);

    for (let i = 0; i < n; i++) {
        m[i] = new Array(n).fill(0);
        M[i] = new Array(n).fill(0);
    }

    for (let i = 0; i < n; i++) {
        m[i][i] = d[i];
        M[i][i] = d[i];
    }

    const minAndMax = (i, j) => {
        let min = Infinity;
        let max = -Infinity;

        for (let k = i; k < j; k++) {
            let a = eval(`(${M[i][k]})${op[k]}(${M[k + 1][j]})`);
            let b = eval(`(${M[i][k]})${op[k]}(${m[k + 1][j]})`);
            let c = eval(`(${m[i][k]})${op[k]}(${M[k + 1][j]})`);
            let d = eval(`(${m[i][k]})${op[k]}(${m[k + 1][j]})`);

            min = Math.min(min, a, b, c, d);
            max = Math.max(max, a, b, c, d);
        }

        return [min, max];
    };

    for (let s = 1; s < n; s++) {
        for (let i = 0; i < n - s; i++) {
            let j = i + s;
            [m[i][j], M[i][j]] = minAndMax(i, j);
        }
    }

    return M[0][n - 1];
};

rl.once('line', (line) => {
    console.log(parentheses(line));
    process.exit();
});

module.exports = parentheses;
