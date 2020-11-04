// Max time used: 0.67/6.00, max memory used: 66670592/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const n = parseInt(line, 10);
    const data = [];

    rl.on('line', (line) => {
        const node = line.toString().split(' ').map(Number);
        if (data.length < n) {
            data.push(node);
        }

        if (data.length === n) {
            const tree = new TreeOrders(data);
            console.log(tree.inOrder().join(' '));
            console.log(tree.preOrder().join(' '));
            console.log(tree.postOrder().join(' '));
        }
    });
});

class TreeOrders {
    constructor(data) {
        this.data = data;
    }
    inOrder() {
        const result = [];
        const tree = this.data;
        const stack = [];
        let currentNode = tree[0];

        while (currentNode !== undefined || stack.length > 0) {
            while (currentNode !== undefined) {
                stack.push(currentNode);
                currentNode = tree[currentNode[1]];
            }
            if (stack.length > 0) {
                let topNode = stack.pop();
                result.push(topNode[0]);
                currentNode = tree[topNode[2]];
            }
        }

        return result;
    }
    preOrder() {
        const result = [];
        const tree = this.data;
        const stack = [];
        let currentNode = tree[0];
        stack.push(currentNode);

        while (stack.length > 0) {
            currentNode = stack.pop();
            result.push(currentNode[0]);
            if (tree[currentNode[2]] !== undefined) {
                stack.push(tree[currentNode[2]]);
            }
            if (tree[currentNode[1]] !== undefined) {
                stack.push(tree[currentNode[1]]);
            }
        }

        return result;
    }
    postOrder() {
        const result = [];
        const tree = this.data;
        const stack = [];
        let currentNode = tree[0];
        stack.push(currentNode);

        while (stack.length > 0) {
            currentNode = stack.pop();
            result.push(currentNode[0]);
            if (tree[currentNode[1]] !== undefined) {
                stack.push(tree[currentNode[1]]);
            }
            if (tree[currentNode[2]] !== undefined) {
                stack.push(tree[currentNode[2]]);
            }
        }

        return result.reverse();
    }

    inOrder2() {
        const result = [];
        const tree = this.data;

        const inOrderTraversal = (node) => {
            if (node === undefined) {
                return;
            }
            const [key, left, right] = node;
            inOrderTraversal(tree[left]);
            result.push(key);
            inOrderTraversal(tree[right]);
        };

        inOrderTraversal(tree[0]);
        return result;
    }
    preOrder2() {
        const tree = this.data;
        const result = [];

        const preOrderTraversal = (node) => {
            if (node === undefined) {
                return;
            }
            const [key, left, right] = node;
            result.push(key);
            preOrderTraversal(tree[left]);
            preOrderTraversal(tree[right]);
        };

        preOrderTraversal(tree[0]);
        return result;
    }
    postOrder2() {
        const tree = this.data;
        const result = [];

        const postOrderTraversal = (node) => {
            if (node === undefined) {
                return;
            }
            const [key, left, right] = node;
            postOrderTraversal(tree[left]);
            postOrderTraversal(tree[right]);
            result.push(key);
        };

        postOrderTraversal(tree[0]);
        return result;
    }
}

module.exports = TreeOrders;
