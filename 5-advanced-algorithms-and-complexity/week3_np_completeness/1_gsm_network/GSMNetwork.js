// Max time used: 0.22/5.00, max memory used: 22732800/1073741824.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const [vertices, edges] = line.toString().trim().split(' ').map(Number);
    const data = [];

    rl.on('line', (nextLine) => {
        const item = nextLine.toString().trim().split(' ').map(Number);
        if (data.length < edges) {
            data.push(item);
        }

        if (data.length === edges) {
            GSMNetwork(data, vertices);
            process.exit();
        }
    });
});

class Node {
    constructor(i) {
        this.r = 3 * i - 2;
        this.g = 3 * i - 1;
        this.b = 3 * i;
    }
}

function GSMNetwork(data, vertices) {
    const V = [];
    for (let i = 1; i < vertices + 1; i += 1) {
        const node = new Node(i);

        V.push([node.r, node.g, node.b]);
        V.push([-node.r, -node.g]);
        V.push([-node.r, -node.b]);
        V.push([-node.g, -node.b]);
    }

    const E = [];
    data.forEach(([a, b]) => {
        const u = new Node(a);
        const v = new Node(b);
        E.push([-u.r, -v.r]);
        E.push([-u.g, -v.g]);
        E.push([-u.b, -v.b]);
    });

    const clauses = V.length + E.length;
    const variables = vertices * 3;
    console.log(clauses, variables);

    V.forEach((clause) => {
        console.log(clause.join(' '), '0');
    });

    E.forEach((clause) => {
        console.log(clause.join(' '), '0');
    });
}

module.exports = GSMNetwork;
