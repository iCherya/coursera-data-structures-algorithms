// Max time used: 0.37/10.00, max memory used: 69054464/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    let [n, m] = line.toString().trim().split(' ').map(Number);
    const data = [];

    const makeAdjacencies = () => {
        const adjacencies = [];
        while (n > 0) {
            adjacencies.push([]);
            n--;
        }

        for (let [a, b] of data) {
            adjacencies[a - 1].push(b - 1);
        }
        return adjacencies;
    };

    if (m === 0) {
        toposortWrapper(makeAdjacencies());
    }
    rl.on('line', (line) => {
        if (data.length < m) {
            const item = line.toString().trim().split(' ').map(Number);
            data.push(item);
        }

        if (data.length === m) {
            toposortWrapper(makeAdjacencies());
        }
    });
});

const dfs = (adjacencies, visited, order, v) => {
    visited[v] = true;

    for (let neibor of adjacencies[v]) {
        if (!visited[neibor]) {
            dfs(adjacencies, visited, order, neibor);
        }
    }

    order.push(v);
};

const toposort = (adjacencies) => {
    const visited = adjacencies.map(() => false);
    const order = [];

    for (let i = 0; i < adjacencies.length; i++) {
        if (!visited[i]) {
            dfs(adjacencies, visited, order, i);
        }
    }
    return order;
};

const toposortWrapper = (adjacencies) => {
    const order = toposort(adjacencies);
    const answer = order
        .reverse()
        .map((el) => +el + 1)
        .join(' ');
    return process.stdout.write(answer, () => {
        process.exit();
    });
};

module.exports = toposort;
