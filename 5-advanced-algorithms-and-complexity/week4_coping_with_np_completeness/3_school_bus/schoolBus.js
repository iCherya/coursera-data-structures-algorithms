// Max time used: 2.74/45.00, max memory used: 297095168/536870912.

const readline = require('readline');

const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (firstLine) => {
    const [n, m] = firstLine.toString().split(' ').map(Number);

    const graph = [];
    for (let i = 0; i < n; i += 1) {
        const arr = [];
        for (let j = 0; j < n; j += 1) {
            arr.push(Infinity);
        }
        graph.push(arr);
    }

    let counter = 0;

    rl.on('line', (nextLine) => {
        counter += 1;
        if (counter <= m) {
            const [u, v, weight] = nextLine.toString().trim().split(' ').map(Number);

            graph[u - 1][v - 1] = weight;
            graph[v - 1][u - 1] = weight;
        }

        if (counter === m) {
            const [bestResult, bestPath] = schoolBus(graph);
            if (bestPath.length === 0) console.log(bestResult.toString());
            else console.log(bestResult + '\n' + bestPath.join(' '));

            // console.log('Memory:', (process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2));
            process.exit();
        }
    });
});

function schoolBus(graph) {
    function getPermutations(array, size) {
        const result = [];

        function p(t, i) {
            if (t.length === size) {
                result.push(t);
                return;
            }
            if (i + 1 > array.length) {
                return;
            }
            p(t.concat(array[i]), i + 1);
            p(t, i + 1);
        }

        p([], 0);

        return result;
    }
    const n = graph.length;

    const C = [];
    for (let i = 0; i < 1 << n; i += 1) {
        const arr = [];

        for (let j = 0; j < n; j += 1) {
            arr.push(Infinity);
        }

        C.push(arr);
    }

    const backtrack = [];
    for (let i = 0; i < 1 << n; i += 1) {
        const arr = [];

        for (let j = 0; j < n; j += 1) {
            arr.push([-1, -1]);
        }

        backtrack.push(arr);
    }

    let temp;
    C[1][0] = 0;
    for (let size = 1; size < n; size += 1) {
        const arr = new Array(n).fill(false).map((_, idx) => idx);
        temp = getPermutations(arr, size);

        temp.forEach((S) => {
            S.unshift(0);
            const k = S.reduce((acc, curr) => acc + (1 << curr), 0);

            S.forEach((i) => {
                if (i !== 0) {
                    S.forEach((j) => {
                        if (j !== i) {
                            const curr = C[k ^ (1 << i)][j] + graph[i][j];

                            if (curr < C[k][i]) {
                                C[k][i] = curr;
                                backtrack[k][i] = [k ^ (1 << i), j];
                            }
                        }
                    });
                }
            });
        });
    }

    let bestResult = Infinity;
    let currIndex2;
    for (let i = 0; i < n; i += 1) {
        const candidate = C[(1 << n) - 1][i] + graph[0][i];
        if (bestResult > candidate) {
            bestResult = candidate;
            currIndex2 = i;
        }
    }

    if (bestResult >= Infinity) {
        return [-1, []];
    }

    const bestPath = [];
    let currIndex1 = (1 << n) - 1;

    while (currIndex1 !== -1) {
        bestPath.push(currIndex2 + 1);

        [currIndex1, currIndex2] = backtrack[currIndex1][currIndex2];
    }

    return [bestResult, bestPath.reverse()];
}

module.exports = schoolBus;
