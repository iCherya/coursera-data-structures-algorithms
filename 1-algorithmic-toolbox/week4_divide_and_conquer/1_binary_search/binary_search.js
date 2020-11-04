// Max time used: 0.10/5.00, max memory used: 40468480/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const arr = line.toString().split(' ').slice(1).map(Number);

    rl.once('line', (line) => {
        const keys = line.toString().split(' ').slice(1).map(Number);
        const result = [];

        for (let key of keys) {
            result.push(binarySearch(arr, key));
        }

        const res = result.join(' ');
        const maxLength = 50000;

        for (let i = 0; i < res.length; i += maxLength) {
            process.stdout.write(res.slice(i, i + maxLength));
        }

        process.stdout.write('\n');
        // process.exit();
    });
});

function binarySearch(array = [], target) {
    let startIndex = 0;
    let endIndex = array.length - 1;
    while (startIndex <= endIndex) {
        let middleIndex = Math.floor((startIndex + endIndex) / 2);
        if (target === array[middleIndex]) {
            return middleIndex;
        }
        if (target > array[middleIndex]) {
            startIndex = middleIndex + 1;
        }
        if (target < array[middleIndex]) {
            endIndex = middleIndex - 1;
        }
    }

    return -1;
}

module.exports = binarySearch;
