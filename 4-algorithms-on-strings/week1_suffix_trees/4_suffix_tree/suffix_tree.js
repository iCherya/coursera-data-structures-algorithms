// Max time used: 0.42/10.00, max memory used: 55230464/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const text = line.trim();
    suffixTree(text);

    if (line === '\n') process.exit();
});

class Node {
    constructor(label = '') {
        this.children = {};
        this.label = label;
    }
}

class Trie {
    constructor(s) {
        this.root = new Node();
        this.root.children[s[0]] = new Node(s);
        this.add(s);
    }
    add(word) {
        for (let i = 0; i < word.length; i++) {
            let current = this.root;
            let j = i;
            while (j < word.length) {
                if (current.children[word[j]]) {
                    let child = current.children[word[j]];
                    let label = child.label;
                    let k = j + 1;
                    while (k - j < label.length && word[k] === label[k - j]) {
                        k++;
                    }
                    if (k - j === label.length) {
                        current = child;
                        j = k;
                    } else {
                        const [c_exist, c_new] = [label[k - j], word[k]];
                        let mid = new Node(label.slice(0, k - j));
                        mid.children[c_new] = new Node(word.slice(k));
                        child.label = label.slice(k - j);
                        mid.children[c_exist] = child;
                        current.children[word[j]] = mid;
                    }
                } else {
                    current.children[word[j]] = new Node(word.slice(j));
                }
            }
        }
    }
}

function suffixTree(text) {
    const tree = new Trie(text);
    treePrint(tree.root);
}

function treePrint(root) {
    const queue = [];
    queue.push(root);

    while (queue.length) {
        let u = queue.pop();
        if (u !== root) {
            console.log(u.label);
        }
        for (let item in u.children) {
            queue.push(u.children[item]);
        }
    }
}

module.exports = suffixTree;
