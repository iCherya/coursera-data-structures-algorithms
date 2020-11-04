// Max time used: 0.22/5.00, max memory used: 22781952/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    differentSummands(parseInt(line));
}

function differentSummands(n) {
    let numbersArr = [];
    let number = 1;

    while (n >= 0) {
        numbersArr.push(number);

        n = n - number;
        if (n === 0) break;

        number++;
        if (n <= 0) {
            n = n + numbersArr.pop();
            number = numbersArr.pop();

            n = n + number;
            number++;
        }
    }
    let prizesCount = numbersArr.length;
    let allPrizesString = numbersArr.join(' ');

    // return prizesCount + "\n" + allPrizesString;
    return process.stdout.write(`${prizesCount}\n${allPrizesString}\n`, () => {
        process.exit();
    });
}

module.exports = differentSummands;
