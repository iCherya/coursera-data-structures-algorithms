// Max time used: 0.43/7.00, max memory used: 101769216/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const text = line.trim();

    rl.once('line', (line) => {
        const n = parseInt(line.trim(), 10);
        const data = [];

        rl.on('line', (line) => {
            if (data.length < n) {
                data.push(line.trim());
            }

            if (data.length === n) {
                const answer = trieMatchingExtended(text, data);

                process.stdout.write(answer.join(' ') + '\n', () => {
                    process.exit();
                });
            }
        });
    });
});

class Node {
    constructor() {
        this.children = {};
        this.isEnd = false;
    }
}

class Trie {
    constructor() {
        this.root = new Node();
    }
    add(word) {
        let current = this.root;

        for (let i = 0; i < word.length; i++) {
            let letter = word[i];
            if (current.children[letter]) {
                current = current.children[letter];
            } else {
                current.children[letter] = new Node();
                current = current.children[letter];
            }
            if (i === word.length - 1) {
                current.isEnd = true;
            }
        }
    }
}

function buildTrie(patterns) {
    let trie = new Trie();

    for (let pattern of patterns) {
        trie.add(pattern);
    }

    return trie;
}

function prefixTrieMatching(text, trie) {
    let current = trie.root;

    for (let i = 0; i < text.length; i++) {
        let letter = text[i];

        if (Object.keys(current.children).length === 0 || current.isEnd) {
            return true;
        }
        if (current.children[letter]) {
            current = current.children[letter];
            if (Object.keys(current.children).length === 0 || current.isEnd) {
                return true;
            }
        } else {
            return false;
        }
    }
}

function trieMatchingExtended(text, patterns) {
    let result = [];
    let trie = buildTrie(patterns);

    for (let i = 0; i < text.length; i++) {
        let checkingText = text.slice(i);
        if (prefixTrieMatching(checkingText, trie)) {
            result.push(i);
        }
    }

    return result;
}

module.exports = trieMatchingExtended;
