// Max time used: 0.80/10.00, max memory used: 158773248/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

function readLineWithTwoIntegers(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

rl.once('line', (line) => {
    const [n, m] = readLineWithTwoIntegers(line);

    rl.once('line', (line) => {
        const numberOfRows = line.toString().split(' ').map(Number);
        const operations = [];

        rl.on('line', (line) => {
            const operation = readLineWithTwoIntegers(line);

            if (operations.length < m) {
                operations.push(operation);
            }

            if (operations.length === m) {
                const answers = merge(n, m, numberOfRows, operations);
                for (let answer of answers) {
                    process.stdout.write(answer + '\n');
                }
                process.exit();
            }
        });
    });
});

const merge = (n, m, rowsN, operations) => {
    const result = [];
    const sizes = [];
    const parents = [];

    for (let i = 0; i < n; i++) {
        parents[i] = i;
        sizes[i] = 0;
    }

    let max = Math.max(...rowsN);

    const getParentRootId = (x) => {
        parent_update = [];

        let root = x;

        while (root != parents[root]) {
            parent_update.push(parents[root]);
            root = parents[root];
        }

        for (let i of parent_update) {
            parents[i] = root;
        }
        return root;
    };

    for (let item of operations) {
        const [to, from] = [item[0] - 1, item[1] - 1];

        let parIdxFrom = getParentRootId(from);
        let paridxTo = getParentRootId(to);

        if (getParentRootId(to) !== getParentRootId(from)) {
            parents[getParentRootId(from)] = to;
            rowsN[paridxTo] += rowsN[parIdxFrom];
            rowsN[parIdxFrom] = 0;
        }

        if (rowsN[paridxTo] > max) {
            max = rowsN[paridxTo];
        }

        result.push(max);
    }

    return result;
};

module.exports = merge;
