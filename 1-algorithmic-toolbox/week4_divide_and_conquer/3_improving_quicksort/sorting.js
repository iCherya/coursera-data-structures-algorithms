// Max time used: 0.21/5.00, max memory used: 33411072/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
const getRandomIntInclusive = (min, max) => {
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const swap = (numbers, i, j) => {
    const tmp = numbers[i];
    numbers[i] = numbers[j];
    numbers[j] = tmp;
};

const partition3 = (numbers, left, right) => {
    const pivot = numbers[left];

    let m1 = left,
        m2 = m1;
    for (let i = left + 1; i <= right; i++) {
        if (numbers[i] < pivot) {
            m1++;
            m2 = m1;
            swap(numbers, i, m1);
        }

        if (numbers[i] === pivot) {
            m2++;
            swap(numbers, i, m2);
        }
    }

    if (numbers[m2] === pivot) {
        swap(numbers, left, m1);
    } else {
        swap(numbers, left, m2);
    }

    return [m1, m2];
};

const randomizedQuickSort3 = (numbers, left, right) => {
    if (left >= right) {
        return;
    }

    const randomPivot = getRandomIntInclusive(left, right);
    swap(numbers, left, randomPivot);
    const pivotIndexes = partition3(numbers, left, right);
    randomizedQuickSort3(numbers, left, pivotIndexes[0] - 1);
    randomizedQuickSort3(numbers, pivotIndexes[1] + 1, right);
};

rl.once('line', (line) => {
    const n = parseInt(line, 10);

    rl.once('line', (line) => {
        const numbers = line.toString().split(' ').map(Number);

        randomizedQuickSort3(numbers, 0, numbers.length - 1);

        for (const num of numbers) {
            process.stdout.write(num + ' ');
        }

        process.exit();
    });
});

module.exports = randomizedQuickSort3;
