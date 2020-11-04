// Max time used: 0.46/10.00, max memory used: 50380800/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});
process.stdin.setEncoding('utf8');

class Point {
    get x() {
        return this._x;
    }

    get y() {
        return this._y;
    }

    constructor(x, y) {
        this._x = x;
        this._y = y;
    }

    toString() {
        return '(' + this._x + ',' + this._y + ')';
    }
}

const distance = (x, y) => {
    return Math.sqrt(Math.pow(x.x - y.x, 2) + Math.pow(x.y - y.y, 2));
};

const stripPoints = (points, d, left, middle, right) => {
    const strippedPoints = [];
    const splitter = points[middle].x;

    for (let i = left; i < right; i++) {
        if (points[i].x >= splitter - d && points[i].x <= splitter + d) {
            strippedPoints.push(points[i]);
        }
    }

    return strippedPoints;
};

const naiveMinimalDistance = (points, left, right) => {
    let ans = Number.POSITIVE_INFINITY;

    for (let i = left; i < right - 1; i++) {
        for (let j = i + 1; j < right; j++) {
            const d = distance(points[i], points[j]);
            if (d === 0) {
                return 0;
            } else {
                if (ans >= d) {
                    ans = d;
                }
            }
        }
    }

    return ans;
};

const minimalDistance = (points, left, right) => {
    if (left + 2 >= right) {
        return naiveMinimalDistance(points, left, right);
    }

    const middle = Math.floor((right + left) / 2);

    let d = Math.min(minimalDistance(points, left, middle), minimalDistance(points, middle, right));

    if (d === 0) {
        return 0;
    }

    const strippedPoints = stripPoints(points, d, left, middle, right);

    strippedPoints.sort((p1, p2) => p1.y - p2.y);

    const len = strippedPoints.length;

    for (let i = 0; i < len - 1; i++) {
        for (let j = i + 1; j < Math.min(i + 6, len); j++) {
            d = Math.min(distance(strippedPoints[i], strippedPoints[j]), d);
        }
    }

    return d;
};

const fastMinimalDistance = (points) => {
    points.sort((p1, p2) => p1.x - p2.x);
    return minimalDistance(points, 0, points.length);
};

rl.once('line', (line) => {
    const n = parseInt(line, 10);

    const points = [];

    rl.on('line', (line) => {
        const numbers = line.toString().split(' ').map(Number);
        if (points.length < n) {
            points.push(new Point(numbers[0], numbers[1]));
        }

        if (points.length === n) {
            process.stdout.write('' + fastMinimalDistance(points));
            process.exit();
        }
    });
});

module.exports = fastMinimalDistance;
