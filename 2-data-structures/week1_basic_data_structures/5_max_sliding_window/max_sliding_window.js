// Max time used: 0.37/5.00, max memory used: 37601280/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    rl.once('line', (line) => {
        let sequence = line.toString().split(' ').map(Number);
        rl.once('line', (line) => {
            let m = +line;
            MaxSlidingWindow(sequence, m);
        });
    });
});

const MaxSlidingWindow = (sequence, m) => {
    let q = [];
    for (let i = 0; i < m; i++) {
        while (q && sequence[i] >= sequence[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
    }
    maximums = [sequence[q[0]]];

    for (let i = m; i < sequence.length; i++) {
        if (q[0] < i - m + 1) {
            q.shift();
        }
        while (q && sequence[i] >= sequence[q[q.length - 1]]) {
            q.pop();
        }
        q.push(i);
        maximums.push(sequence[q[0]]);
    }
    return process.stdout.write(maximums.join(' '), () => {
        process.exit();
    });
};

module.exports = MaxSlidingWindow;
