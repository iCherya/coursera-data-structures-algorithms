// Max time used: 0.47/10.00, max memory used: 74522624/536870912.

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
            const answer = bipartite(adjacencies) ? 1 : 0;
            console.log(answer);
            process.exit();
        }
    });
});

const bipartite = (adjacencies) => {
    let returnFlag = false;
    const dist = [];

    for (let i = 0; i < adjacencies.length; i++) {
        dist[i] = Infinity;
    }

    function bfs(adjacencies, from) {
        const queue = [];
        dist[from] = 0;
        queue.push(from);

        while (queue.length > 0) {
            let u = queue.shift();
            for (let i = 0; i < adjacencies[u].length; i++) {
                let v = adjacencies[u][i];
                if (dist[v] === Infinity) {
                    queue.push(v);
                    dist[v] = dist[u] + 1;
                } else {
                    if (dist[v] === dist[u]) {
                        returnFlag = true;
                    }
                }
            }
        }
    }

    for (let i = 0; i < adjacencies.length; i++) {
        if (dist[i] === Infinity) {
            bfs(adjacencies, i);
        }
        if (returnFlag) return false;
    }

    return true;
};

module.exports = bipartite;
