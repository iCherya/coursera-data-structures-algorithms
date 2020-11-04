// Max time used: 0.03/5.00, max memory used: 16424960/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const d = parseInt(line);
    rl.on('line', (line) => {
        const max = parseInt(line);
        rl.on('line', (line) => {
            const n = parseInt(line);
            rl.on('line', (line) => {
                const s = line.toString().split(' ').map(Number);
                console.log(carFueling(d, max, n, s));
                process.exit();
            });
        });
    });
});

function carFueling(distance, l, n, x) {
    x = [0, ...x, distance];

    numRefills = 0;
    currentPosition = 0;
    currentFuel = l;

    while (currentPosition <= x.length) {
        if (currentFuel < x[currentPosition + 1] - x[currentPosition]) {
            currentFuel = l;
            numRefills++;
        }
        currentFuel -= x[currentPosition + 1] - x[currentPosition];
        if (currentFuel < 0) return -1;
        currentPosition++;
    }

    return numRefills;
}

module.exports = carFueling;
