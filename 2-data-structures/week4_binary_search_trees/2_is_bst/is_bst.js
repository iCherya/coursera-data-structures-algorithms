// Max time used: 0.21/10.00, max memory used: 49373184/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const n = parseInt(line, 10);

    const data = [];
    if (n === 0) {
        console.log('CORRECT');
    }
    rl.on('line', (line) => {
        const item = line.toString().split(' ').map(Number);
        if (data.length < n) {
            data.push(item);
        }

        if (data.length === n) {
            isBts(data) ? console.log('CORRECT') : console.log('INCORRECT');
        }
    });
});

const isBts = (data) => {
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
                result.push(topNode[0]);
                currentNode = tree[topNode[2]];
            }
        }

        return result;
    };
    const order = inOrder(data);
    for (let i = 0; i < order.length; i++) {
        if (order[i] > order[i + 1]) {
            return false;
        }
    }
    return true;
};

module.exports = isBts;
