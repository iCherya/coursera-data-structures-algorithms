// Max time used: 0.45/5.00, max memory used: 147058688/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const text = line.trim();
    const answer = suffixArray(text);

    process.stdout.write(answer.join(' ') + '\n', () => {
        process.exit();
    });
});

function suffixArray(text) {
    const len = text.length;
    const bwMatrix = [];

    for (let i = 0; i < len; i++) {
        const item = text[len - 1] + text.slice(0, len - 1);
        bwMatrix.push({
            letter: item,
            idx: i
        });
        text = item;
    }

    return bwMatrix
        .sort((a, b) => {
            if (a.letter > b.letter) {
                return 1;
            }
            if (a.letter < b.letter) {
                return -1;
            }
            if (a.letter === b.letter) {
                return a.idx - b.idx;
            }
        })
        .map((el) => len - 1 - el.idx);
}

module.exports = suffixArray;
