const readline = require('readline');

class Vertex {
    constructor(weight) {
        this.weight = weight;
        this.children = [];
    }
}

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (firstLine) => {
    const people = parseInt(firstLine.toString(), 10);

    if (people === 0) {
        console.log(0);
        process.exit();
    }

    rl.once('line', (secondLine) => {
        const tree = secondLine
            .toString()
            .split(' ')
            .map((a) => parseInt(a, 10))
            .filter((a) => !Number.isNaN(a))
            .map((weight) => new Vertex(weight));

        let len = tree.length;

        if (len === 1) {
            console.log(tree[0].weight);
            process.exit();
        }
        len -= 1;

        rl.on('line', (nextLine) => {
            const [a, b] = nextLine
                .toString()
                .trim()
                .split(' ')
                .map((el) => parseInt(el, 10))
                .filter((el) => !Number.isNaN(el));

            tree[a - 1].children.push(b - 1);
            tree[b - 1].children.push(a - 1);

            len -= 1;
            if (len <= 0) {
                console.log(planParty(tree));
                process.exit();
            }
        });
    });
});

const dfs = (tree, vertex, parent, weights) => {
    if (weights[vertex] === -1) {
        if (tree[vertex].children.length === 1 && vertex !== 0) {
            weights[vertex] = tree[vertex].weight;
        } else {
            let max0 = 0;
            tree[vertex].children.forEach((u) => {
                if (u !== parent) {
                    max0 += dfs(tree, u, vertex, weights);
                }
            });

            let max1 = tree[vertex].weight;
            tree[vertex].children.forEach((u) => {
                if (u !== parent) {
                    tree[u].children.forEach((w) => {
                        if (w !== vertex) {
                            max1 += dfs(tree, w, u, weights);
                        }
                    });
                }
            });

            weights[vertex] = Math.max(max0, max1);
        }
    }

    return weights[vertex];
};

const planParty = (tree) => {
    const size = tree.length;
    const weights = new Array(size).fill(-1);

    return dfs(tree, 0, -1, weights);
};

module.exports = planParty;
