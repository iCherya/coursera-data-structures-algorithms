// Max time used: 1.16/10.00, max memory used: 51970048/536870912.

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
            let [from, to] = data.pop();
            from = from - 1;
            to = to - 1;

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
            console.log(dijkstra(adjacencies, cost, from, to));
            process.exit();
        }
    });
});

function dijkstra(adjacencies, cost, from, to) {
    let n = adjacencies.length;
    const dist = new Array(n).fill(Infinity);
    dist[from] = 0;

    const dist2 = [...dist];

    while (n) {
        let u = dist2.indexOf(Math.min(...dist2));
        dist2[u] = Infinity;

        for (let i = 0; i < adjacencies[u].length; i++) {
            let v = adjacencies[u][i];
            if (dist[v] > dist[u] + cost[u][i]) {
                dist[v] = dist[u] + cost[u][i];
                dist2[v] = dist[v];
            }
        }

        n--;
    }

    return dist[to] === Infinity ? -1 : dist[to];
}

module.exports = dijkstra;
