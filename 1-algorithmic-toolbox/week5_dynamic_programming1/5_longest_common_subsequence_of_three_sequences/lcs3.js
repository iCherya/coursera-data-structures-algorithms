// Max time used: 0.37/5.00, max memory used: 35454976/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

const lcs3 = (a, b, c) => {
    const n = a.length;
    const m = b.length;
    const h = c.length;

    const d = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        d[i] = new Array(m + 1);

        for (let j = 0; j <= m; j++) {
            d[i][j] = new Array(h + 1).fill(0);
        }
    }

    for (let k = 1; k <= h; k++) {
        for (let j = 1; j <= m; j++) {
            for (let i = 1; i <= n; i++) {
                if (a[i - 1] === b[j - 1] && b[j - 1] === c[k - 1]) {
                    d[i][j][k] = d[i - 1][j - 1][k - 1] + 1;
                } else {
                    d[i][j][k] = Math.max(d[i - 1][j][k], Math.max(d[i][j - 1][k], d[i][j][k - 1]));
                }
            }
        }
    }

    let x = d.length - 1;
    let y = d[0].length - 1;
    let z = d[0][0].length - 1;
    return d[x][y][z];
};

rl.once('line', (line) => {
    parseInt(line, 10);
    let a = [];
    let b = [];
    let c = [];

    rl.once('line', (line) => {
        a = line.toString().split(' ').map(Number);

        rl.once('line', (line) => {
            parseInt(line, 10);

            rl.once('line', (line) => {
                b = line.toString().split(' ').map(Number);

                rl.once('line', (line) => {
                    parseInt(line, 10);

                    rl.once('line', (line) => {
                        c = line.toString().split(' ').map(Number);

                        console.log(lcs3(a, b, c));
                        process.exit();
                    });
                });
            });
        });
    });
});

module.exports = lcs3;
