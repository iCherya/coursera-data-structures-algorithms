// Max time used: 0.43/5.00, max memory used: 51322880/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(fib(parseInt(line, 10)));
    process.exit();
}

function fib(n) {
    let b = n;
    const arr = [0, 1];
    for (let i = 2; i <= b; i++) {
        let number = arr[i - 1] + arr[i - 2];
        arr.push(number % 10);
    }
    return arr[n];
}

module.exports = fib;
