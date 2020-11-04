// Max time used: 0.04/5.00, max memory used: 20668416/536870912.

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
        console.log(largestNumber(n, integers));
        process.exit();
    });
});

function largestNumber(n, integers) {
    let compare = (digit, maxDigit) => {
        return +('' + digit + maxDigit) >= +('' + maxDigit + digit);
    };

    let answer = [];
    while (integers.length > 0) {
        let maxDigit = 0;
        let tempI = 0;
        for (let i = 0; i < integers.length; i++) {
            let digit = integers[i];
            if (compare(digit, maxDigit)) {
                maxDigit = digit;
                tempI = i;
            }
        }
        answer.push(maxDigit);
        integers = [...integers.slice(0, tempI), ...integers.slice(tempI + 1)];
    }
    return answer.join('');
}

module.exports = largestNumber;
