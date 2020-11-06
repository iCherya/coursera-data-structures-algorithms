// Max time used: 0.25/10.00, max memory used: 27312128/536870912.

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

        if (data.length <= m) {
            data.push(item);
        }

        if (data.length === m + 1) {
            let s = data.pop();
            s = s - 1;

            const adjacencies = [];
            const cost = [];

            let i = n;
            while (i > 0) {
                adjacencies.push([]);
                cost.push([]);
                i--;
            }

            for (let [a, b, w] of data) {
                adjacencies[a - 1].push(b - 1);
                cost[a - 1].push(w);
            }

            let distance = new Array(n).fill(10 ** 19);
            let reachable = new Array(n).fill(0);
            let shortest = new Array(n).fill(1);

            shortetPaths(n, adjacencies, cost, s, distance, reachable, shortest);

            for (let i = 0; i < n; i++) {
                if (reachable[i] == 0) {
                    console.log('*');
                } else if (shortest[i] == 0) {
                    console.log('-');
                } else {
                    console.log(distance[i]);
                }
            }

            process.exit();
        }
    });
});

function shortetPaths(n, adj, cost, s, distance, reachable, shortest) {
    distance[s] = 0;
    reachable[s] = 1;

    for (let count = 0; count < n - 1; count++) {
        let change = 0;
        for (let i = 0; i < n; i++) {
            if (reachable[i] == 1) {
                for (let k = 0; k < adj[i].length; k++) {
                    if (reachable[adj[i][k]] == 0) {
                        reachable[adj[i][k]] = 1;
                        distance[adj[i][k]] = distance[i] + cost[i][k];
                        change += 1;
                    } else {
                        distance[adj[i][k]] = Math.min(
                            distance[i] + cost[i][k],
                            distance[adj[i][k]]
                        );
                        change += 1;
                    }
                }
            }
        }
        if (change === 0) {
            break;
        }
    }

    for (let i = 0; i < n; i++) {
        if (reachable[i] == 1) {
            for (let k = 0; k < adj[i].length; k++) {
                if (distance[i] + cost[i][k] < distance[adj[i][k]]) {
                    distance[adj[i][k]] = distance[i] + cost[i][k];

                    if (shortest[adj[i][k]] == 1) {
                        shortest[adj[i][k]] = 0;
                    }
                }
            }
        }
    }

    for (let i = 0; i < n; i++) {
        if (shortest[i] == 0) {
            for (let x of adj[i]) {
                if (shortest[x] === 1) {
                    negCycle(x, shortest, adj);
                }
            }
        }
    }
}

function negCycle(x, shortest, adj) {
    shortest[x] = 0;
    for (let i of adj[x]) {
        if (shortest[i] === 1) {
            negCycle(i, shortest, adj);
        }
    }
}

module.exports = shortetPaths;
