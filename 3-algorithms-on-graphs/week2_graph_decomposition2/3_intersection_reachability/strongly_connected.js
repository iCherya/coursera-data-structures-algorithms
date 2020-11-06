// Max time used: 0.16/5.00, max memory used: 32030720/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    let [n, m] = line.toString().trim().split(' ').map(Number);
    const data = [];
    if (m === 0) {
        console.log(n);
    }
    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);

        if (data.length < m) {
            data.push(item);
        }

        if (data.length === m) {
            const adjacencies = [];
            while (n > 0) {
                adjacencies.push([]);
                n--;
            }

            for (let [a, b] of data) {
                adjacencies[a - 1].push(b - 1);
                // adjacencies[b - 1].push(a - 1);
            }

            console.log(numberOfStronglyConnectedComponents(adjacencies));
            process.exit();
        }
    });
});

const reverseEdges = (adjacencies) => {
    const adjacenciesReversed = [];
    for (let i = 0; i < adjacencies.length; i++) {
        adjacenciesReversed.push([]);
    }
    for (let i = 0; i < adjacencies.length; i++) {
        for (let j = 0; j < adjacencies[i].length; j++) {
            adjacenciesReversed[adjacencies[i][j]].push(i);
        }
    }
    return adjacenciesReversed;
};

const dfs = (adjacencies, visited, stack, v) => {
    visited[v] = true;

    for (let neibor of adjacencies[v]) {
        if (!visited[neibor]) {
            visited[neibor] = true;
            dfs(adjacencies, visited, stack, neibor);
        }
    }

    stack.push(v);
};

const numberOfStronglyConnectedComponents = (adjacencies) => {
    let count = 0;
    let visited = adjacencies.map(() => false);
    const stack = [];

    for (let i = 0; i < adjacencies.length; i++) {
        if (!visited[i]) {
            dfs(adjacencies, visited, stack, i);
        }
    }

    const adjacenciesReversed = reverseEdges(adjacencies);

    visited = adjacencies.map(() => false);

    while (stack.length > 0) {
        let x = stack.pop();
        if (!visited[x]) {
            dfs(adjacenciesReversed, visited, [], x);
            count++;
        }
    }
    return count;
};

module.exports = numberOfStronglyConnectedComponents;
