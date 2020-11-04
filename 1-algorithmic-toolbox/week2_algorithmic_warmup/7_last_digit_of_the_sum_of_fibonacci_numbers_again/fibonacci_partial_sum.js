// Max time used: 0.03/5.00, max memory used: 18001920/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    if (line !== '\n') {
        const n = parseInt(line.toString().split(' ')[0], 10);
        const m = parseInt(line.toString().split(' ')[1], 10);

        console.log(fibs(n, m));
        process.exit();
    }
}

function fib(n) {
    let f0 = 0;
    let f1 = 1;

    if (n == 0) return 0;
    if (n == 1) return 1;

    let rem = n % 60;
    if (rem == 0) return 0;

    for (let i = 2; i < rem + 3; i++) {
        let f = (f0 + f1) % 60;
        f0 = f1;
        f1 = f;
    }
    let s = f1 - 1;
    return s;
}

function fibs(n, m) {
    if (n + m === 0) return 0;
    let fM = fib(m);
    let fN = fib(n - 1);

    let final = (fM - fN) % 10;

    if (final < 0) {
        return 10 + final;
    }
    return final;
}

module.exports = fibs;
