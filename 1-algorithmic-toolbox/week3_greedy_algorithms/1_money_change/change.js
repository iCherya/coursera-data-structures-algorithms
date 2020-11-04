// Max time used: 0.03/5.00, max memory used: 17989632/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(change(parseInt(line)));
    process.exit();
}

function change(n) {
    let result = 0;
    let coinsArr = [10, 5, 1];

    for (coins of coinsArr) {
        result += Math.floor(n / coins);
        let rest = n % coins;
        if (rest === 0) return result;
        n = rest;
    }
}

module.exports = change;
