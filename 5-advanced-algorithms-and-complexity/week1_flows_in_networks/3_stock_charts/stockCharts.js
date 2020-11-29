// Max time used: 0.06/10.00, max memory used: 17534976/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const [n, m] = line.trim().split(' ').map(Number);
    const stockData = [];

    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);
        stockData.push(item);

        if (stockData.length === n) {
            const result = minCharts(stockData);
            console.log(result);
            process.exit();
        }
    });
});

function minCharts(stockData) {
    const n = stockData.length;
    const k = stockData[0].length;

    const adj = convert(stockData, n, k);
    const matching = new Array(n).fill(-1);

    let result = 0;

    for (let u = 0; u < n; u++) {
        const seen = new Array(n).fill(false);
        if (dfs(adj, matching, seen, u, n)) {
            result++;
        }
    }

    return n - result;
}

function convert(stockData, n, k) {
    const adj = Array.from(Array(n), (el) => new Array(n).fill(0));

    for (let i = 0; i < n; i++) {
        for (let j = 0; j < n; j++) {
            let isEdge = true;

            for (let t = 0; t < k; t++) {
                if (stockData[i][t] >= stockData[j][t]) {
                    isEdge = false;
                    break;
                }
            }

            if (isEdge) {
                adj[i][j] = 1;
            }
        }
    }

    return adj;
}

function dfs(adj, matching, seen, u, n) {
    for (let v = 0; v < n; v++) {
        if (adj[u][v] === 1 && !seen[v]) {
            seen[v] = true;
            if (matching[v] < 0 || dfs(adj, matching, seen, matching[v], n)) {
                matching[v] = u;
                return true;
            }
        }
    }
    return false;
}
