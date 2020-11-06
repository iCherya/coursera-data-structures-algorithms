// Max time used: 0.13/10.00, max memory used: 24711168/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const n = parseInt(line);
    const x = [];
    const y = [];
    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);

        if (x.length < n) {
            x.push(item[0]);
            y.push(item[1]);
        }

        if (x.length === n) {
            console.log(minimumDistance(x, y).toFixed(9));
            process.exit();
        }
    });
});

class Node {
    constructor(x, y, parent) {
        this.x = x;
        this.y = y;
        this.parent = parent;
        this.rank = 0;
    }
}

class Edge {
    constructor(u, v, weigth) {
        this.u = u;
        this.v = v;
        this.weigth = weigth;
    }
}

function getDistance(x1, y1, x2, y2) {
    return Math.sqrt(Math.abs((x2 - x1) ** 2 + (y2 - y1) ** 2));
}

function find(i, set) {
    if (i != set[i].parent) {
        set[i].parent = find(set[i].parent, set);
    }
    return set[i].parent;
}

function union(u, v, set) {
    const root1 = find(u, set);
    const root2 = find(v, set);
    if (root1 !== root2) {
        if (set[root1].rank > set[root2].rank) {
            set[root2].parent = root1;
        } else {
            set[root1].parent = root2;
            if (set[root1].rank == set[root2].rank) {
                set[root2].rank++;
            }
        }
    }
}

function minimumDistance(x, y) {
    const edges = [];
    const set = [];
    const len = x.length;
    let result = 0;

    for (let i = 0; i < len; i++) {
        set.push(new Node(x[i], y[i], i));
    }

    for (let i = 0; i < len; i++) {
        for (let j = i + 1; j < len; j++) {
            edges.push(new Edge(i, j, getDistance(x[i], y[i], x[j], y[j])));
        }
    }

    edges.sort((a, b) => a.weigth - b.weigth);

    for (let edge of edges) {
        if (find(edge.u, set) != find(edge.v, set)) {
            result += edge.weigth;
            union(edge.u, edge.v, set);
        }
    }

    return result;
}

module.exports = minimumDistance;
