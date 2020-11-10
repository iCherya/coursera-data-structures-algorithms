// Max time used: 2.69/10.00, max memory used: 263942144/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const text = line.trim();
    process.stdout.write(inverseBWT(text), () => {
        process.exit();
    });
});

function inverseBWT(text) {
    const len = text.length;

    const lastColumn = [];
    for (let i = 0; i < len; i++) {
        lastColumn.push({
            idx: i,
            letter: text[i]
        });
    }

    const firstColumn = lastColumn.concat().sort((a, b) => {
        if (a.letter > b.letter) {
            return 1;
        }
        if (a.letter < b.letter) {
            return -1;
        }
        if (a.letter === b.letter) {
            return a.idx - b.idx;
        }
    });

    const firstToLastPointers = new Map();
    for (let i = 0; i < len; i++) {
        firstToLastPointers.set(firstColumn[i], lastColumn[i]);
    }

    let result = '';
    let next = firstColumn[0];

    for (let i = 0; i < len; i++) {
        result = next.letter + result;
        next = firstToLastPointers.get(next);
    }

    return result;
}

module.exports = inverseBWT;
