// Max time used: 0.22/5.00, max memory used: 56152064/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const n = parseInt(line);
    rl.once('line', (line) => {
        const integers = line.toString().split(' ').map(Number);
        console.log(majorityElement(n, integers));
        process.exit();
    });
});

function majorityElement(n, integers) {
    let count = {};

    for (let i = 0; i < integers.length; i++) {
        let el = integers[i];
        count[el] = [+(count[el] || 0) + 1];
    }
    let max = 0;

    for (key in count) {
        let value = count[key];
        if (value > max) {
            max = value;
        }
    }

    let answer = +max > n / 2 ? 1 : 0;

    return answer;
}

module.exports = majorityElement;
