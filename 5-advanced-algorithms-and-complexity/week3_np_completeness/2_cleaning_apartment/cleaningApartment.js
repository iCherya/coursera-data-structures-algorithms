// Max time used: 0.45/10.00, max memory used: 46297088/536870912.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const [vertices, edges] = line.toString().trim().split(' ').map(Number);
    const data = [];
    if (edges === 0) {
        cleaningApartment(data, vertices);
        process.exit();
    }

    rl.on('line', (nextLine) => {
        const item = nextLine
            .toString()
            .split(' ')
            .map((a) => parseInt(a, 10))
            .filter((a) => !Number.isNaN(a));
        if (data.length < edges) {
            data.push(item);
        }

        if (data.length === edges) {
            cleaningApartment(data, vertices);
            process.exit();
        }
    });
});

function combinations(arr) {
    const result = [];

    for (let i = 0; i < arr.length - 1; i += 1) {
        for (let j = i + 1; j < arr.length; j += 1) {
            const pair = [arr[i], arr[j]];
            result.push(pair);
        }
    }

    return result;
}

function cleaningApartment(data, n) {
    const V = [];
    for (let i = 1; i < n + 1; i += 1) {
        const Xij = [];
        for (let j = (i - 1) * n + 1; j < i * n + 1; j += 1) {
            Xij.push(j);
        }
        V.push(Xij);
        const neg = Xij.map((el) => -el);
        const subsets = combinations(neg);
        V.push(...subsets);
    }

    const E = [];
    for (let i = 1; i < n + 1; i += 1) {
        const pos = [];
        for (let j = i; j < n * n + 1; j += n) {
            pos.push(j);
        }
        E.push(pos);
        const neg = pos.map((el) => -el);
        const subsets = combinations(neg);
        E.push(...subsets);
    }

    const lst = [];
    for (let i = 1; i < n + 1; i += 1) {
        lst.push(i);
    }
    const subsets = combinations(lst);

    const C = [];
    const dataStr = JSON.stringify(data);
    subsets.forEach(([a, b]) => {
        const abStr = JSON.stringify([a, b]);
        const baStr = JSON.stringify([b, a]);

        if (!dataStr.includes(abStr) && !dataStr.includes(baStr)) {
            for (let i = 1; i < n; i += 1) {
                C.push([-((a - 1) * n + i), -((b - 1) * n + i + 1)]);
                C.push([-((b - 1) * n + i), -((a - 1) * n + i + 1)]);
            }
        }
    });

    const clauses = V.length + E.length + C.length;
    const variables = n * n;

    console.log(clauses, variables);

    V.forEach((clause) => {
        console.log(clause.join(' '), '0');
    });

    E.forEach((clause) => {
        console.log(clause.join(' '), '0');
    });

    C.forEach((clause) => {
        console.log(clause.join(' '), '0');
    });
}

module.exports = cleaningApartment;
