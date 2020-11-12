// Max time used: 2.17/10.00, max memory used: 267423744/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const text = line;

    rl.once('line', (line) => {
        const sa = line.toString().split(' ').map(Number);

        rl.once('line', (line) => {
            const lcp = line.toString().split(' ').map(Number);
            const tree = suffixArrayToSuffixTree(sa, lcp, text);

            const stack = [[tree, 0]];

            console.log(text);
            while (stack.length > 0) {
                const [node, edgeIndex] = stack.pop();

                if (Object.keys(node.children).length === 0) {
                    continue;
                }
                const edges = Object.keys(node.children).sort();

                if (edgeIndex + 1 < edges.length) {
                    stack.push([node, +edgeIndex + 1]);
                }
                console.log(
                    node.children[edges[edgeIndex]].edgeStart +
                        ' ' +
                        (node.children[edges[edgeIndex]].edgeEnd + 1)
                );

                stack.push([node.children[edges[edgeIndex]], 0]);
            }
        });
    });
});

class SuffixTreeNode {
    constructor(children, parent, stringDepth, edgeStart, edgeEnd) {
        this.children = children;
        this.parent = parent;
        this.stringDepth = stringDepth;
        this.edgeStart = edgeStart;
        this.edgeEnd = edgeEnd;
    }
}

function createNewLeaf(node, S, suffix) {
    const leaf = new SuffixTreeNode(
        {},
        node,
        S.length - suffix,
        suffix + node.stringDepth,
        S.length - 1
    );

    node.children[S[leaf.edgeStart]] = leaf;
    return leaf;
}

function breakEdge(node, S, start, offset) {
    const startChar = S[start];
    const midChar = S[start + offset];
    const midNode = new SuffixTreeNode(
        {},
        node,
        node.stringDepth + offset,
        start,
        start + offset - 1
    );
    midNode.children[midChar] = node.children[startChar];
    node.children[startChar].parent = midNode;
    node.children[startChar].edgeStart += offset;
    node.children[startChar] = midNode;

    return midNode;
}

function suffixArrayToSuffixTree(order, lcpArray, S) {
    const root = new SuffixTreeNode({}, null, 0, -1, 1);

    let lcpPrev = 0;
    let curNode = root;

    for (let i = 0; i < S.length; i++) {
        const suffix = order[i];
        while (curNode.stringDepth > lcpPrev) {
            curNode = curNode.parent;
        }
        if (curNode.stringDepth === lcpPrev) {
            curNode = createNewLeaf(curNode, S, suffix);
        } else {
            const edgeStart = order[i - 1] + curNode.stringDepth;
            const offset = lcpPrev - curNode.stringDepth;
            const midNode = breakEdge(curNode, S, edgeStart, offset);
            curNode = createNewLeaf(midNode, S, suffix);
        }
        if (i < S.length - 1) {
            lcpPrev = lcpArray[i];
        }
    }

    return root;
}

module.exports = suffixArrayToSuffixTree;
