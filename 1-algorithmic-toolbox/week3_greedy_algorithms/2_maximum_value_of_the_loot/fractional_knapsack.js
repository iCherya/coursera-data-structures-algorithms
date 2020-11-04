// Max time used: 0.03/5.00, max memory used: 23212032/671088640.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const [itemsCount, knapsackCapacity] = line.toString().split(' ').map(Number);
    const values = [];
    const weights = [];
    let count = 0;

    rl.on('line', (line) => {
        const [v, w] = readLine(line);
        values.push(v);
        weights.push(w);

        if (++count >= itemsCount) {
            console.log(max(itemsCount, knapsackCapacity, values, weights));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

function max(itemsCount, knapsackCapacity, values, weights) {
    function roundTo4(numer) {
        return Math.round(10000 * numer) / 10000;
    }
    const items = [];
    let fractions = 0;

    for (i = 0; i < itemsCount; i++) {
        items.push([values[i] / weights[i], values[i], weights[i]]);
    }

    items.sort((a, b) => b[0] - a[0]);

    while (items.length > 0) {
        if (knapsackCapacity <= 0) return roundTo4(fractions);

        let value = items[0][1];
        let weight = items[0][2];

        if (itemsCount === 1) {
            if (knapsackCapacity < weight) {
                fractions += (knapsackCapacity / weight) * value;
            } else {
                fractions += values;
            }
            return roundTo4(fractions);
        }

        if (knapsackCapacity <= weight) {
            fractions = fractions + (knapsackCapacity * value) / weight;
            return roundTo4(fractions);
        }

        fractions = fractions + value;
        knapsackCapacity = knapsackCapacity - weight;
        items.shift();
    }

    return roundTo4(fractions);
}

module.exports = max;
