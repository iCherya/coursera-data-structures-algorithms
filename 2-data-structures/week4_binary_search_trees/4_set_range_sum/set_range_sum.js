// Max time used: 1.38/120.00, max memory used: 56336384/536870912.

class Vertex {
    constructor(key, sum, left, right, parent) {
        this.key = key;
        this.sum = sum;
        this.left = left;
        this.right = right;
        this.parent = parent;
    }
}
function update(v) {
    if (v === null) {
        return;
    }
    let sumLeft = v.left !== null ? v.left.sum : 0;
    let sumRight = v.right !== null ? v.right.sum : 0;

    v.sum = v.key + sumLeft + sumRight;
    if (v.left !== null) {
        v.left.parent = v;
    }
    if (v.right !== null) {
        v.right.parent = v;
    }
}
function smallRotation(v) {
    let parent = v.parent;
    if (parent === null) {
        return;
    }
    let grandparent = v.parent.parent;
    if (parent.left === v) {
        let m = v.right;
        v.right = parent;
        parent.left = m;
    } else {
        let m = v.left;
        v.left = parent;
        parent.right = m;
    }
    update(parent);
    update(v);
    v.parent = grandparent;
    if (grandparent !== null) {
        if (grandparent.left === parent) {
            grandparent.left = v;
        } else {
            grandparent.right = v;
        }
    }
}
function bigRotation(v) {
    if (v.parent.left === v && v.parent.parent.left === v.parent) {
        smallRotation(v.parent);
        smallRotation(v);
    } else if (v.parent.right === v && v.parent.parent.right === v.parent) {
        smallRotation(v.parent);
        smallRotation(v);
    } else {
        smallRotation(v);
        smallRotation(v);
    }
}
function splay(v) {
    if (v === null) {
        return null;
    }
    while (v.parent !== null) {
        if (v.parent.parent === null) {
            smallRotation(v);
            break;
        }
        bigRotation(v);
    }
    return v;
}
function find(root, key) {
    let v = root;
    let last = root;
    let next = null;
    while (v !== null) {
        if (v.key >= key && (next === null || v.key < next.key)) {
            next = v;
        }
        last = v;
        if (v.key === key) {
            break;
        }
        if (v.key < key) {
            v = v.right;
        } else {
            v = v.left;
        }
    }
    root = splay(last);
    return [next, root];
}
function split(root, key) {
    let result;
    [result, root] = find(root, key);

    if (result === null) {
        return [root, null];
    }
    let right = splay(result);
    let left = right.left;
    right.left = null;
    if (left !== null) {
        left.parent = null;
    }
    update(left);
    update(right);
    return [left, right];
}
function merge(left, right) {
    if (left === null) {
        return right;
    }
    if (right === null) {
        return left;
    }
    while (right.left !== null) {
        right = right.left;
    }
    right = splay(right);
    right.left = left;
    update(right);
    return right;
}

let root = null;

const insert = (x) => {
    const [left, right] = split(root, x);
    let new_vertex = null;
    if (right === null || right.key !== x) {
        new_vertex = new Vertex(x, x, null, null, null);
    }
    root = merge(merge(left, new_vertex), right);
};
const erase = (x) => {
    if (search(x) === null) {
        return;
    }
    root = splay(root);

    root = merge(root.left, root.right);
    if (root !== null) {
        root.parent = null;
    }
};
const search = (x) => {
    let result;
    [result, root] = find(root, x);

    if (result === null || result.key !== x) {
        return null;
    }
    return result.key;
};
const sum = (fr, to) => {
    let left, middle, right;
    [left, middle] = split(root, fr);
    [middle, right] = split(middle, to + 1);
    let ans;
    if (middle === null) {
        ans = 0;
        root = merge(left, right);
    } else {
        ans = middle.sum;
        root = merge(merge(left, middle), right);
    }
    return ans;
};

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const MODULO = 1000000001;
    const n = parseInt(line, 10);
    let last_sum_result = 0;
    const data = [];
    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ');

        if (data.length < n) {
            data.push(item);
        }

        if (data.length === n) {
            for (let item of data) {
                let x;
                if (item[0] === '+') {
                    x = +item[1];
                    insert((x + last_sum_result) % MODULO);
                } else if (item[0] === '-') {
                    x = +item[1];
                    erase((x + last_sum_result) % MODULO);
                } else if (item[0] === '?') {
                    x = +item[1];
                    let statement = search((x + last_sum_result) % MODULO) !== null;
                    console.log(statement ? 'Found' : 'Not found');
                } else if (item[0] === 's') {
                    let l = +item[1];
                    let r = +item[2];

                    let res = sum((l + last_sum_result) % MODULO, (r + last_sum_result) % MODULO);
                    console.log(res);
                    last_sum_result = res % MODULO;
                }
            }
            process.exit();
        }
    });
});
