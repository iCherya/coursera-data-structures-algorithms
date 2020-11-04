// Max time used: 0.58/20.00, max memory used: 55021568/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');

const getRandomIntInclusive = (min, max) => {
    min = Math.floor(min);
    max = Math.ceil(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

const swap = (segments, i, j) => {
    const tmp = segments[i];
    segments[i] = segments[j];
    segments[j] = tmp;
};

const partition3ByStartAsc = (segments, left, right) => {
    let pivot = segments[left];

    let m1 = left,
        m2 = m1;
    for (let i = left + 1; i <= right; i++) {
        if (
            segments[i].start < pivot.start ||
            (segments[i].start === pivot.start && pivot.type === 'p' && segments[i].type === 'l') ||
            (segments[i].start === pivot.start && pivot.type === 'r' && segments[i].type === 'p') ||
            (segments[i].start === pivot.start && pivot.type === 'r' && segments[i].type === 'l')
        ) {
            m1++;
            m2 = m1;
            swap(segments, i, m1);
        }

        if (segments[i].start === pivot.start && segments[i].type === pivot.type) {
            m2++;
            swap(segments, i, m2);
        }
    }

    if (segments[m2].start === pivot.start && segments[m2].type === pivot.type) {
        swap(segments, left, m1);
    } else {
        swap(segments, left, m2);
    }

    return [m1, m2];
};

const sortSegmentStartAsc = (segments, left, right) => {
    if (left >= right) {
        return;
    }

    const randomPivot = getRandomIntInclusive(left, right);
    swap(segments, left, randomPivot);
    const pivotIndexes = partition3ByStartAsc(segments, left, right);
    sortSegmentStartAsc(segments, left, pivotIndexes[0] - 1);
    sortSegmentStartAsc(segments, pivotIndexes[1] + 1, right);
};

const fastCountSegments = (segments, points) => {
    const cnt = [];
    const allSegments = [];

    let i = 0;
    for (const segment of segments) {
        allSegments[i++] = { start: segment.start, type: 'l' };
        allSegments[i++] = { start: segment.end, type: 'r' };
    }

    i = 0;
    for (let j = 0; j < points.length; j++) {
        allSegments[segments.length * 2 + i++] = { start: points[j], type: 'p', index: j };
    }

    sortSegmentStartAsc(allSegments, 0, allSegments.length - 1);

    let pivot = null;
    let count = 0;
    for (const segment of allSegments) {
        if (segment.type === 'l') {
            count++;
        } else if (segment.type === 'r') {
            if (pivot !== null && pivot.start !== segment.start) {
                pivot = null;
            }
            if (count > 0) {
                count--;
            }
        } else if (segment.type === 'p') {
            pivot = segment;
            cnt[pivot.index] = count;
        }
    }

    return cnt;
};

rl.once('line', (line) => {
    const nAndM = line.toString().split(' ').map(Number);
    const n = nAndM[0];
    const m = nAndM[1];

    const segments = [];

    rl.on('line', (line) => {
        const numbers = line.toString().split(' ').map(Number);
        if (segments.length < n) {
            segments.push({ start: numbers[0], end: numbers[1] });
        }

        if (segments.length === n) {
            rl.once('line', (line) => {
                const points = line.toString().split(' ').map(Number);

                const cnt = fastCountSegments(segments, points);
                for (const x of cnt) {
                    process.stdout.write(x + ' ');
                }
                process.exit();
            });
        }
    });
});

module.exports = fastCountSegments;
