// Max time used: 0.03/5.00, max memory used: 19222528/536870912.

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
                adjacencies[b - 1].push(a - 1);
            }

            console.log(connectedComponents(adjacencies));
            process.exit();
        }
    });
});

const connectedComponents = (adjacencies) => {
    let components = 1;
    const visited = adjacencies.map(() => false);

    const explore = (v) => {
        visited[v] = true;

        for (let neibor of adjacencies[v]) {
            if (!visited[neibor]) {
                explore(neibor);
            }
        }
    };

    for (let i = 0; i < adjacencies.length; i++) {
        if (!visited[i]) {
            explore(i);
            components++;
        }
    }

    return components - 1;
};

module.exports = connectedComponents;
