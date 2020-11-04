// Max time used: 0.03/5.00, max memory used: 20082688/536870912.

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

        console.log(getFibMod(n, m));
        process.exit();
    }
}

function fib(n) {
    const arr = [0n, 1n];
    for (let i = 2; i <= n; i++) {
        arr.push(BigInt(arr[i - 1] + arr[i - 2]));
    }

    return arr[n];
}

function getPisanoPeriod(m) {
    let a = 0,
        b = 1,
        c = a + b;
    for (let i = 0; i < m * m; i++) {
        c = (a + b) % m;
        a = b;
        b = c;
        if (a == 0 && b == 1) return i + 1;
    }
}

function getFibMod(n, m) {
    let period = getPisanoPeriod(m);
    let rem = n % period;
    let result = fib(rem) % BigInt(m);
    return +('' + result);
}

module.exports = getFibMod;
