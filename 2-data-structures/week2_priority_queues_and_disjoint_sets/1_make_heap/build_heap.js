// Max time used: 0.19/5.00, max memory used: 61300736/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

const heapSort = (input) => {
    const swaps = [];

    const siftDown = (input, i) => {
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        let min = i;

        if (left < input.length && input[left] < input[min]) {
            min = left;
        }

        if (right < input.length && input[right] < input[min]) {
            min = right;
        }

        if (min != i) {
            [input[i], input[min]] = [input[min], input[i]];
            swaps.push([i, min]);
            siftDown(input, min);
        }
    };

    for (let i = Math.floor(input.length / 2); i >= 0; i -= 1) {
        siftDown(input, i);
    }

    let total = swaps.length;
    let swapStr = swaps.reduce((acc, curr) => {
        return acc + '\n' + curr.join(' ');
    }, '');

    return process.stdout.write(`${total}${swapStr}\n`, () => {
        process.exit();
    });
};

rl.once('line', (line) => {
    let n = parseInt(line).toFixed(10);
    rl.once('line', (line) => {
        let A = line.toString().split(' ').map(Number);
        heapSort(A) + '\n';
    });
});

module.exports = heapSort;
