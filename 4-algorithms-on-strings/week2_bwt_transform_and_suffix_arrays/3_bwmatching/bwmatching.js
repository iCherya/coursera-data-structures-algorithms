// Max time used: 2.43/24.00, max memory used: 170225664/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const bwt = line.trim();

    rl.once('line', (line) => {
        const patternCount = parseInt(line.trim(), 10);
        const patterns = [];

        rl.once('line', (line) => {
            const patterns = line.trim().split(' ');

            const [starts, occurrenceCountsBefore] = preprocessBWT(bwt);
            const occurrenceCounts = [];
            for (let pattern of patterns) {
                occurrenceCounts.push(
                    countOccurrences(pattern, bwt, starts, occurrenceCountsBefore)
                );
            }

            process.stdout.write(occurrenceCounts.join(' '), () => {
                process.exit();
            });
        });
    });
});

function preprocessBWT(bwt) {
    const sortedBWT = bwt.split('').sort().join('');
    const lettersSet = new Set(sortedBWT);
    const starts = {};

    for (let letter of lettersSet) {
        starts[letter] = sortedBWT.indexOf(letter);
    }

    const occurrenceCountsBefore = {};

    for (let item of lettersSet) {
        const occList = [0];
        let counter = 0;
        for (let i = 0; i < bwt.length; i++) {
            if (bwt[i] === item) {
                counter++;
            }
            occList.push(counter);
        }
        occurrenceCountsBefore[item] = occList;
    }

    return [starts, occurrenceCountsBefore];
}

function countOccurrences(pattern, bwt, starts, occurrenceCountsBefore) {
    let top = 0;
    let bottom = bwt.length - 1;

    while (top <= bottom) {
        if (pattern.length > 0) {
            let symbol = pattern.slice(-1);
            pattern = pattern.slice(0, -1);

            if (bwt.slice(top, bottom + 1).indexOf(symbol) !== -1) {
                const firstOccurance = starts[symbol];
                top = firstOccurance + occurrenceCountsBefore[symbol][top];

                bottom = firstOccurance + occurrenceCountsBefore[symbol][bottom + 1] - 1;
            } else {
                return 0;
            }
        } else {
            return bottom - top + 1;
        }
    }
}

module.exports = countOccurrences;
