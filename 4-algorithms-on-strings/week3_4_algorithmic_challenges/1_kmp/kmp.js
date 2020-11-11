// Max time used: 0.50/4.00, max memory used: 140410880/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const pattern = line.trim();

    rl.once('line', (line) => {
        const text = line.trim();

        const answer = findPattern(pattern, text);
        process.stdout.write(answer.join(' '), () => {
            process.exit();
        });
    });
});

function computePrefixFunction(string) {
    const prefixFunctioArray = [];
    prefixFunctioArray[0] = 0;
    let border = 0;

    for (let i = 1; i < string.length; i++) {
        while (border > 0 && string[i] !== string[border]) {
            border = prefixFunctioArray[border - 1];
        }
        if (string[i] === string[border]) {
            border++;
        } else {
            border = 0;
        }
        prefixFunctioArray[i] = border;
    }
    return prefixFunctioArray;
}

function findPattern(pattern, text) {
    const pLen = pattern.length;
    const tLen = text.length;

    if (pLen > tLen) {
        return [];
    }

    const string = pattern + '$' + text;
    const prefixFunctioArray = computePrefixFunction(string);

    const result = [];

    for (let i = pLen + 1; i < string.length; i++) {
        if (prefixFunctioArray[i] === pLen) {
            result.push(i - 2 * pLen);
        }
    }

    return result;
}

module.exports = findPattern;
