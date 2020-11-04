// Max time used: 0.25/10.00, max memory used: 48877568/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const n = parseInt(line, 10);
    if (n === 0) {
        console.log('CORRECT');
        process.exit();
    }
    const data = [];
    rl.on('line', (line) => {
        const item = line.toString().split(' ').map(Number);

        if (data.length < n) {
            data.push(item);
        }

        if (data.length === n) {
            isBtsHard(data) ? console.log('CORRECT') : console.log('INCORRECT');
            process.exit();
        }
    });
});

const isBtsHard = (data) => {
    const inOrder = (tree) => {
        const result = [];
        const stack = [];
        let currentNode = tree[0];

        while (currentNode !== undefined || stack.length > 0) {
            while (currentNode !== undefined) {
                stack.push(currentNode);
                currentNode = tree[currentNode[1]];
            }
            if (stack.length > 0) {
                let topNode = stack.pop();
                result.push(topNode);
                currentNode = tree[topNode[2]];
            }
        }

        return result;
    };

    const v = inOrder(data);

    for (let i = 0; i < v.length - 1; ++i) {
        let currentVertice = v[i];
        let nextVertice = v[i + 1];
        let currentVerticeValue = currentVertice[0];
        let nextVerticeValue = nextVertice[0];

        if (currentVerticeValue > nextVerticeValue) {
            return false;
        }
        if (currentVerticeValue === nextVerticeValue && data[nextVertice[1]] == currentVertice) {
            return false;
        }
    }
    return true;
};

module.exports = isBtsHard;
