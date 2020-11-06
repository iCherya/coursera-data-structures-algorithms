// Max time used: 4.33/10.00, max memory used: 25497600/536870912.

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
            const cost = [];

            while (n > 0) {
                adjacencies.push([]);
                cost.push([]);
                n--;
            }

            for (let [a, b, w] of data) {
                adjacencies[a - 1].push(b - 1);
                cost[a - 1].push(w);
            }
            console.log(negativeCycle(adjacencies, cost));
            process.exit();
        }
    });
});

function negativeCycle(adjacencies, cost) {
    let n = adjacencies.length;
    const distance = new Array(n).fill(Infinity);

    function relax(start) {
        distance[start] = 0;

        for (let k = 0; k < n - 1; k++) {
            for (let u = 0; u < adjacencies.length; u++) {
                for (let i = 0; i < adjacencies[u].length; i++) {
                    const v = adjacencies[u][i];
                    const w = cost[u][i];

                    if (distance[u] + w < distance[v]) {
                        distance[v] = distance[u] + w;
                    }
                }
            }
        }
    }

    while (true) {
        let startIndex = distance.findIndex((el) => el === Infinity);
        if (startIndex !== -1) {
            relax(startIndex);
        } else {
            break;
        }
    }

    for (let u = 0; u < adjacencies.length; u++) {
        for (let i = 0; i < adjacencies[u].length; i++) {
            const v = adjacencies[u][i];
            const w = cost[u][i];

            if (distance[u] + w < distance[v]) {
                return 1;
            }
        }
    }

    return 0;
}

module.exports = negativeCycle;
