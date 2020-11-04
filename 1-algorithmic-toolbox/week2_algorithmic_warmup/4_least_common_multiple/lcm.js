// Max time used: 0.33/5.00, max memory used: 16134144/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    if (line !== '\n') {
        const a = parseInt(line.toString().split(' ')[0], 10);
        const b = parseInt(line.toString().split(' ')[1], 10);

        console.log(lcm(a, b));
        process.exit();
    }
}

function lcm(a, b) {
    function gcd(a, b) {
        if (b === 0) return a;
        return gcd(b, a % b);
    }
    let d = gcd(a, b);
    return (a * b) / d;
}

module.exports = lcm;
