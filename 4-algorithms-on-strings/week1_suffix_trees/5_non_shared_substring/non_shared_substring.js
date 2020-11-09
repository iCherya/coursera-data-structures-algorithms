// Max time used: 0.93/5.00, max memory used: 120991744/1073741824.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const text1 = line.trim();
    rl.once('line', (line) => {
        const text2 = line.trim();

        console.log(nonSharedSubstring(text1, text2));
        process.exit();
    });
});

class Node {
    constructor(label = '') {
        this.children = {};
        this.label = label;
        this.type = 1;
        this.visited = false;
        this.parent = null;
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
    shortestCommonSubstring() {
        const leaves_1 = [];
        this.explore(this.root, leaves_1);
        const results = [];

        for (let leaf of leaves_1) {
            let char = '';
            let substring = '';
            let cur = leaf.parent;
            if (leaf.label[0] == '#' && cur.type == 2) {
                continue;
            } else if (cur.type == 2) {
                char += leaf.label[0];
            }
            while (cur != this.root) {
                substring = cur.label + substring;
                cur = cur.parent;
            }
            substring += char;
            results.push(substring);
        }

        return results.sort((a, b) => a.length - b.length)[0];
    }
    explore(cur, leaves_1) {
        cur.visited = true;

        if (Object.keys(cur.children).length == 0) {
            if (!cur.label.includes('#')) {
                cur.type = 2;
            } else {
                leaves_1.push(cur);
            }
        } else {
            for (let item in cur.children) {
                let node = cur.children[item];
                if (!node.visited) {
                    node.parent = cur;
                    this.explore(node, leaves_1);
                }
            }
            for (let item in cur.children) {
                let node = cur.children[item];
                if (node.type == 2) {
                    cur.type = 2;
                }
            }
        }
    }
}

function nonSharedSubstring(text1, text2) {
    const text = text1 + '#' + text2 + '$';
    const tree = new Trie(text);
    return tree.shortestCommonSubstring();
}

module.exports = nonSharedSubstring;
