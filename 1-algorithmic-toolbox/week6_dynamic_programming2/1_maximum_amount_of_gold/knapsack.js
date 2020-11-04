// Max time used: 0.08/10.00, max memory used: 56438784/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const [w, n] = line.toString().split(' ').map(Number);
    rl.on('line', (line) => {
        const items = line.toString().split(' ').map(Number);
        console.log(optimalWeight(w, n, items));
        process.exit();
    });
});

function optimalWeight(w, n, items) {
    const table = new Array(n + 1);
    for (let i = 0; i <= n; i++) {
        table[i] = new Array(w + 1).fill(0);
    }

    for (let i = 1; i <= n; i++) {
        for (let v = 1; v <= w; v++) {
            table[i][v] = table[i - 1][v];

            if (items[i - 1] <= v) {
                let value = table[i - 1][v - items[i - 1]] + items[i - 1];
                if (table[i][v] < value) {
                    table[i][v] = value;
                }
            }
        }
    }

    return table[n][w];
}

module.exports = optimalWeight;
