// Max time used: 0.14/5.00, max memory used: 18919424/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    let [n, m] = line.toString().trim().split(' ').map(Number);
    const data = [];
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

            const answer = acyclic(adjacencies) ? 1 : 0;
            console.log(answer);
            process.exit();
        }
    });
});

const acyclic = (adjacencies) => {
    const visited = adjacencies.map(() => false);
    let loop = false;
    let startV;
    const explore = (v) => {
        visited[v] = true;

        for (let neibor of adjacencies[v]) {
            if (!visited[neibor]) {
                explore(neibor);
            }
            if (neibor === startV) {
                loop = true;
            }
        }
    };

    for (let i = 0; i < adjacencies.length; i++) {
        if (!visited[i]) {
            startV = i;
            explore(i);
        }
        if (loop) return true;
    }

    return false;
};

module.exports = acyclic;
