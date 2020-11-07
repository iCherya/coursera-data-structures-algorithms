// Max time used: 0.12/2.00, max memory used: 66359296/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const n = parseInt(line, 10);
    const data = [];

    rl.on('line', (line) => {
        if (data.length < n) {
            data.push(line);
        }

        if (data.length === n) {
            const trie = buildTrie(data);

            for (let node in trie) {
                for (let c in trie[node]) {
                    console.log(`${node}->${trie[node][c]}:${c}`);
                }
            }
            process.exit();
        }
    });
});

function buildTrie(patterns) {
    const trie = {};
    trie[0] = {};
    let nodeCounter = 1;
    let currentNode;

    for (let pattern of patterns) {
        currentNode = trie[0];

        for (let currentSymbol of pattern) {
            if (currentNode[currentSymbol]) {
                currentNode = trie[currentNode[currentSymbol]];
            } else {
                currentNode[currentSymbol] = nodeCounter;
                trie[nodeCounter] = {};
                currentNode = trie[nodeCounter];
                nodeCounter++;
            }
        }
    }

    return trie;
}

module.exports = buildTrie;
