// Max time used: 0.03/7.50, max memory used: 19738624/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(fastOptimalSequence(parseInt(line)));
    process.exit();
}

const greedyOptimalSequence = (n, minNumOps) => {
    const sequence = [];
    while (n > 1) {
        sequence.push(n);
        const numOpsDivide2 = n % 2 === 0 ? minNumOps[n / 2] : Number.MAX_VALUE;
        const numOpsDivide3 = n % 3 === 0 ? minNumOps[n / 3] : Number.MAX_VALUE;
        const numOpsAdd1 = minNumOps[n - 1];

        const min = Math.min(Math.min(numOpsDivide2, numOpsDivide3), numOpsAdd1);

        if (min === numOpsDivide2) {
            n = n / 2;
        } else if (min === numOpsDivide3) {
            n = n / 3;
        } else {
            n = n - 1;
        }
    }

    sequence.push(1);

    return sequence.reverse();
};

const fastOptimalSequence = (n) => {
    const minNumOps = new Array(n + 1);
    minNumOps[0] = 0;
    minNumOps[1] = 1;

    for (let number = 2; number <= n; number++) {
        const numOpsDivide2 = number % 2 === 0 ? minNumOps[number / 2] : Infinity;
        const numOpsDivide3 = number % 3 === 0 ? minNumOps[number / 3] : Infinity;
        const numOpsAdd1 = minNumOps[number - 1];
        minNumOps[number] = Math.min(Math.min(numOpsDivide2, numOpsDivide3), numOpsAdd1) + 1;
    }
    let answer = greedyOptimalSequence(n, minNumOps);
    return answer.length - 1 + '\n' + answer.join(' ');
};

module.exports = fastOptimalSequence;
