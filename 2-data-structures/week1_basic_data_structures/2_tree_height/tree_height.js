// Max time used: 1.89/5.00, max memory used: 77139968/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    let n = line;
    rl.once('line', (line) => {
        let parents = line.split(' ');
        console.log(computeHeight(n, parents));
        process.exit();
    });
});

function Node(value) {
    this.value = value;
    this.children = [];

    this.addChild = (node) => {
        this.children.push(node);
    };
}

const computeHeight = (n, parents) => {
    let root;
    nodesArr = [];

    for (let i = 0; i < n; i++) {
        nodesArr[i] = new Node(i);
    }

    for (let i = 0; i < n; i++) {
        let childEl = i;
        let parentEl = parents[i];

        if (parentEl == -1) root = nodesArr[childEl];
        else {
            nodesArr[parentEl].addChild(nodesArr[i]);
        }
    }

    const maxHeight = (root) => {
        if (!root) return 0;
        const queue = [[root, 0]];
        let result;

        while (queue.length) {
            let [node, depth] = queue.pop();

            if (node.children) {
                node.children.forEach((el) => {
                    queue.unshift([el, depth + 1]);
                });
            }
            result = depth + 1;
        }
        return result;
    };
    const result = maxHeight(root);

    return result;
};

module.exports = computeHeight;
