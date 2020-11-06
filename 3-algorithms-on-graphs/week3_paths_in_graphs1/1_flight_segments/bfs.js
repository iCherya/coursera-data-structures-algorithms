// Max time used: 0.47/10.00, max memory used: 71843840/536870912.

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
            let [x, y] = data.pop();
            x = x - 1;
            y = y - 1;

            const adjacencies = [];
            while (n > 0) {
                adjacencies.push([]);
                n--;
            }

            for (let [a, b] of data) {
                adjacencies[a - 1].push(b - 1);
                adjacencies[b - 1].push(a - 1);
            }
            console.log(distance(adjacencies, x, y));
            process.exit();
        }
    });
});

const distance = (adjacencies, from, to) => {
    const dist = [],
        queue = [];

    for (let i = 0; i < adjacencies.length; i++) {
        dist[i] = Infinity;
    }

    dist[from] = 0;
    queue.push(from);

    while (queue.length > 0) {
        let u = queue.shift();
        for (let i = 0; i < adjacencies[u].length; i++) {
            let v = adjacencies[u][i];
            if (dist[v] === Infinity) {
                queue.push(v);
                dist[v] = dist[u] + 1;
            }
        }
    }

    return dist[to] === Infinity ? -1 : dist[to];
};

module.exports = distance;
