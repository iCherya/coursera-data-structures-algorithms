// Max time used: 0.21/10.00, max memory used: 20140032/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

const partition3 = (A) => {
    const sum = A.reduce((a, b) => a + b, 0);

    if (sum % 3 !== 0) {
        return 0;
    }

    const table = new Array(A.length + 1);

    for (let i = 0; i <= A.length; i++) {
        table[i] = new Array(A.length + 1);

        for (let j = 0; j <= table.length; j++) {
            table[i][j] = new Array(sum / 3 + 1).fill(false);
        }
    }

    for (let i = 0; i <= A.length; i++) {
        table[i][0][0] = true;
    }

    for (let i = 0; i <= A.length; i++) {
        table[0][i][0] = true;
    }

    for (let i = 1; i <= A.length; i++) {
        for (let j = 1; j <= A.length; j++) {
            for (let s = 1; s <= sum / 3; s++) {
                let val = false;
                if (s >= A[i - 1]) {
                    val = table[i - 1][j][s - A[i - 1]];
                }

                if (s >= A[j - 1]) {
                    val = val || table[i][j - 1][s - A[j - 1]];
                }

                val = val || table[i - 1][j - 1][s];

                table[i][j][s] = val;
            }
        }
    }

    return table[A.length][A.length][sum / 3] ? 1 : 0;
};

rl.once('line', (line) => {
    let n = parseInt(line).toFixed(10);
    rl.once('line', (line) => {
        let A = line.toString().split(' ').map(Number);
        process.stdout.write(partition3(A) + ' ');
        process.exit();
    });
});

module.exports = partition3;
