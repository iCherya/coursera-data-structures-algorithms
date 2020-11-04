// Max time used: 0.03/5.00, max memory used: 16441344/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const n = parseInt(line);
    let count = 0;
    const segments = [];
    rl.on('line', (line) => {
        segments.push(readLine(line));

        if (++count >= n) {
            console.log(coveringSegments(n, segments));
            process.exit();
        }
    });
});

function readLine(line) {
    const v = parseInt(line.toString().split(' ')[0], 10);
    const w = parseInt(line.toString().split(' ')[1], 10);

    return [v, w];
}

function coveringSegments(n, segments) {
    segments.sort((a, b) => {
        return a[1] - b[1];
    });

    let points = [];

    max_right = segments[0][1];
    points.push(max_right);

    i = 1;
    while (i < segments.length) {
        if (max_right < segments[i][0]) {
            max_right = segments[i][1];
            points.push(max_right);
        }
        i++;
    }

    let result = points.length + '\n' + points.join(' ');
    return result;
}

module.exports = coveringSegments;
