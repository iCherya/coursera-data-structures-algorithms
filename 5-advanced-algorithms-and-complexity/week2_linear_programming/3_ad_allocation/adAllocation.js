// Max time used: 2.06/6.00, max memory used: 49741824/536870912.

Array.prototype.min = function () {
    return Math.min.apply(null, this);
};

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const [n, m] = line.trim().split(' ').map(Number);
    const A = [];

    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);

        if (A.length < n) {
            A.push(item);
        }

        if (A.length === n) {
            rl.once('line', (line) => {
                let b = line.toString().trim().split(' ').map(Number);
                rl.once('line', (line) => {
                    let c = line.toString().trim().split(' ').map(Number);
                    const result = allocateAds(n, m, A, b, c);
                    printResult(...result);
                    process.exit();
                });
            });
        }
    });
});

function allocateAds(n, m, A, b, c) {
    let a = [];
    const s = [];

    for (let i = 0; i < n; i++) {
        if (b[i] < 0) {
            b[i] *= -1;

            for (let j = 0; j < m; j++) {
                A[i][j] *= -1;
            }

            s.push(i);
            a.push(i);
        } else {
            s.push(i);
        }
    }

    const Cj = new Array(m + s.length).fill(0);

    for (let i = 0; i < a.length; i++) {
        Cj.push(-1);
    }

    let t = new Array(a.length + s.length).fill(0);

    for (let i = 0; i < n; i++) {
        A[i].push(...t);
    }

    for (let i = 0; i < a.length; i++) {
        A[a[i]][m + s.length + i] = 1;
        A[a[i]][m + a[i]] = -1;
    }

    for (let i of s) {
        if (A[i][m + i] === 0) {
            A[i][m + i] = 1;
        }
    }

    const Cb = new Array(n).fill(0);
    const posCb = new Array(n).fill(0);

    for (let i = 0; i < a.length; i++) {
        Cb[a[i]] = -1;
        posCb[a[i]] = m + s.length + i;
    }

    for (let i = 0; i < n; i++) {
        if (Cb[i] === 0) {
            posCb[i] = m + i;
        }
    }

    let stage = false;
    let unbounded = false;

    while (true) {
        while (true) {
            let keyCol;
            let Z = 0;

            for (let i = 0; i < n; i++) {
                Z += Cb[i] * b[i];
            }

            const totalCol = m + s.length + a.length;
            const Zj = [];
            const ZjCj = [];

            for (let i = 0; i < totalCol; i++) {
                t = 0;

                for (let j = 0; j < n; j++) {
                    t += Cb[j] * A[j][i];
                }

                Zj.push(t);
                ZjCj.push(Zj[i] - Cj[i]);
            }

            if (ZjCj.min() < 0) {
                keyCol = ZjCj.findIndex((el) => el === ZjCj.min());
            } else break;

            let minx = Infinity;
            let keyRow = -1;

            for (let i = 0; i < n; i++) {
                if (A[i][keyCol] > 0) {
                    if (
                        b[i] / A[i][keyCol] < minx ||
                        (b[i] / A[i][keyCol] == minx && !stage && Cb[i] < 0)
                    ) {
                        keyRow = i;
                        minx = b[i] / A[i][keyCol];
                    }
                }
            }

            if (keyRow === -1) {
                unbounded = true;
                break;
            }

            const keyElement = A[keyRow][keyCol];

            for (let i = 0; i < totalCol; i++) {
                A[keyRow][i] /= keyElement;
            }

            b[keyRow] /= keyElement;

            for (let i = 0; i < n; i++) {
                if (i != keyRow && A[i][keyCol] != 0) {
                    const mul = -A[i][keyCol] / A[keyRow][keyCol];

                    for (let j = 0; j < totalCol; j++) {
                        A[i][j] += A[keyRow][j] * mul;
                    }

                    b[i] += b[keyRow] * mul;
                }
            }

            if (posCb[keyRow] > m + s.length) {
                const columnRemoved = posCb[keyRow];

                for (let i = 0; i < n; i++) {
                    A[i][columnRemoved] = null;
                }
            }

            Cb[keyRow] = Cj[keyCol];
            posCb[keyRow] = keyCol;
        }

        if (unbounded) return [1, []];

        if (Cb.includes(-1)) {
            if (!stage) {
                for (let i = 0; i < Cb.length; i++) {
                    if (Cb[i] == -1 && b[i] > 1e-9) {
                        return [-1, []];
                    }
                }
            }

            const l = new Array(m).fill(0);

            for (let i = 0; i < n; i++) {
                if (posCb[i] < m) {
                    l[posCb[i]] = b[i];
                }
            }

            return [0, l];
        } else if (stage) {
            const l = new Array(m).fill(0);

            for (let i = 0; i < n; i++) {
                if (posCb[i] < m) {
                    l[posCb[i]] = b[i];
                }
            }

            return [0, l];
        } else {
            stage = true;

            for (let i = 0; i < m; i++) {
                Cj[i] = c[i];
            }

            for (let i = m + s.length; i < m + s.length + a.length; i++) {
                Cj.splice(m + s.length, 1);
            }

            for (let i = 0; i < n; i++) {
                if (posCb[i] < m) {
                    Cb[i] = c[posCb[i]];
                }
            }

            a = [];
        }
    }
}

function printResult(anst, ansx) {
    if (anst === -1) {
        console.log('No solution');
    }
    if (anst === 0) {
        console.log('Bounded solution');
        console.log(ansx.map((el) => el.toFixed(18)).join(' '));
    }
    if (anst === 1) {
        console.log('Infinity');
    }
}
