// Max time used: 0.11/5.00, max memory used: 18636800/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

const lcs2 = (a, b) => {
    const n = a.length;
    const m = b.length;

    const d = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        d[i] = new Array(m + 1).fill(0);
    }
    for (let j = 1; j <= m; j++) {
        for (let i = 1; i <= n; i++) {
            if (a[i - 1] === b[j - 1]) {
                d[i][j] = d[i - 1][j - 1] + 1;
            } else {
                d[i][j] = Math.max(d[i][j - 1], d[i - 1][j]);
            }
        }
    }

    let y = d.length - 1;
    let z = d[0].length - 1;

    return d[y][z];
};

rl.once('line', (line) => {
    parseInt(line, 10);
    let a = [];
    let b = [];

    rl.once('line', (line) => {
        a = line.toString().split(' ').map(Number);

        rl.once('line', (line) => {
            parseInt(line, 10);

            rl.once('line', (line) => {
                b = line.toString().split(' ').map(Number);
                console.log(lcs2(a, b));
                process.exit();
            });
        });
    });
});

module.exports = lcs2;
