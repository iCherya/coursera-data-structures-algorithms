// Max time used: 0.03/5.00, max memory used: 18337792/536870912.

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

            const answer = reach(adjacencies, x, y) ? 1 : 0;
            console.log(answer);
            process.exit();
        }
    });
});

const reach = (adjacencies, from, to) => {
    const visited = adjacencies.map(() => false);

    const explore = (v) => {
        visited[v] = true;
        for (let neibor of adjacencies[v]) {
            if (!visited[neibor]) {
                explore(neibor);
            }
        }
    };

    explore(from);

    if (visited[to]) {
        return true;
    }

    return false;
};

module.exports = reach;
