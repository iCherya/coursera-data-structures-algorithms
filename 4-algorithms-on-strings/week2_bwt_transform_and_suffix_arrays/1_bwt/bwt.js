// Max time used: 0.05/2.50, max memory used: 18083840/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const text = line.trim();
    console.log(bwt(text));
    process.exit();
});

function bwt(text) {
    const len = text.length;
    const bwMatrix = [];

    for (let i = 0; i < len; i++) {
        const item = text[len - 1] + text.slice(0, len - 1);
        bwMatrix.push(item);
        text = item;
    }

    bwMatrix.sort();

    let lastColumn = '';

    for (let i = 0; i < bwMatrix.length; i++) {
        const row = bwMatrix[i];
        lastColumn += row[len - 1];
    }

    return lastColumn;
}

module.exports = bwt;
