// Max time used: 0.06/5.00, max memory used: 18083840/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const n = parseInt(line);
    rl.on('line', (line) => {
        const a = line.toString().split(' ');
        rl.on('line', (line) => {
            const b = line.toString().split(' ');
            console.log(dotProduct(n, a, b));
            process.exit();
        });
    });
});

function dotProduct(n, a, b) {
    let answer = 0;
    a.sort((a, b) => a - b);
    b.sort((a, b) => a - b);

    while (n > 0) {
        let first = a.pop();
        let second = b.pop();
        answer += first * second;
        n--;
    }

    return answer;
}

module.exports = dotProduct;
