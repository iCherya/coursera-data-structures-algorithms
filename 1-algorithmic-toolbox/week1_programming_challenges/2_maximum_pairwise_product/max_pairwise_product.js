// Max time used: 0.12/5.00, max memory used: 33845248/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', () => {
    rl.on('line', readLine);
});

function readLine(line) {
    const arr = line.toString().split(' ').map(Number);

    console.log(max(arr));
    process.exit();
}

function max(arr) {
    arr.sort((a, b) => b - a);
    return arr[0] * arr[1];
}

module.exports = max;
