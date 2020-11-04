// Max time used: 0.28/5.00, max memory used: 17981440/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    if (line !== '\n') {
        const n = parseInt(line.toString().split(' ')[0], 10);

        console.log(sqSum(n));
        process.exit();
    }
}

function multiply_matrix(a, b) {
    var c = new Array();
    for (y = 0; y < a.length; y++) {
        c[y] = new Array();
        for (x = 0; x < b[0].length; x++) {
            sum = 0;
            for (i = 0; i < a[0].length; i++) {
                sum += (a[y][i] % 10) * (b[i][x] % 10);
            }
            c[y][x] = sum;
        }
    }
    return c;
}
function pow_matrix(a, n) {
    if (n == 1) {
        return a;
    }
    half = pow_matrix(a, (n - (n % 2)) / 2);
    ret = multiply_matrix(half, half);
    if (n % 2) {
        ret = multiply_matrix(ret, a);
    }
    return ret;
}
function fibonacci(n) {
    a = [
        [1, 1],
        [1, 0]
    ];
    a_n = pow_matrix(a, n);
    start = [[1], [0]];
    end = multiply_matrix(a_n, start);
    let result = end[1][0];
    return result;
}

function sqSum(n) {
    if (n === 0) return 0;

    let f1 = fibonacci(n);
    let f2 = fibonacci(n + 1);

    return (f1 * f2) % 10;
}

module.exports = sqSum;
