// Max time used: 4.61/12.00, max memory used: 345812992/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const text = line.trim();

    rl.once('line', (line) => {
        const patternCount = parseInt(line.trim(), 10);

        rl.once('line', (line) => {
            const patterns = line.trim().split(' ');

            findOccurrences(text, patterns);
        });
    });
});

function sortCharacters(string) {
    const characters = ['$', 'A', 'C', 'G', 'T'];

    const order = new Array(string.length).fill(null);
    const count = new Array(Math.max(string.length, characters.length)).fill(0);

    const charactersIds = {};
    for (let char in characters) {
        charactersIds[characters[char]] = char;
    }

    for (let i = 0; i < string.length; i++) {
        count[charactersIds[string[i]]]++;
    }
    for (let j = 1; j < characters.length; j++) {
        count[j] += count[j - 1];
    }

    for (let i = string.length - 1; i >= 0; i--) {
        let c = charactersIds[string[i]];
        count[c]--;

        order[count[c]] = i;
    }

    return order;
}

function computeCharClasses(string, order) {
    const _class = new Array(string.length).fill(null);
    _class[order[0]] = 0;

    for (let i = 1; i < string.length; i++) {
        if (string[order[i]] !== string[order[i - 1]]) {
            _class[order[i]] = _class[order[i - 1]] + 1;
        } else {
            _class[order[i]] = _class[order[i - 1]];
        }
    }

    return _class;
}

function sortDoubled(string, l, order, _class) {
    const count = new Array(string.length).fill(0);
    const newOrder = new Array(string.length).fill(null);

    for (let i = 0; i < string.length; i++) {
        count[_class[i]]++;
    }

    for (let j = 1; j < string.length; j++) {
        count[j] += count[j - 1];
    }

    for (let i = string.length - 1; i >= 0; i--) {
        const start = (order[i] - l + string.length) % string.length;
        let c = _class[start];
        count[c]--;
        newOrder[count[c]] = start;
    }

    return newOrder;
}

function updateClasses(newOrder, _class, l) {
    const n = newOrder.length;
    const newClass = new Array(n).fill(null);
    newClass[newOrder[0]] = 0;

    for (let i = 1; i < n; i++) {
        const curr = newOrder[i],
            prev = newOrder[i - 1],
            mid = curr + l,
            midPrev = (prev + l) % n;

        if (_class[curr] !== _class[prev] || _class[mid] !== _class[midPrev]) {
            newClass[curr] = newClass[prev] + 1;
        } else {
            newClass[curr] = newClass[prev];
        }
    }

    return newClass;
}

function buildSuffixArray(string) {
    let order = sortCharacters(string);
    let _class = computeCharClasses(string, order);

    let l = 1;
    while (l < string.length) {
        order = sortDoubled(string, l, order, _class);
        _class = updateClasses(order, _class, l);
        l *= 2;
    }

    return order.slice(1);
    // return order;
}

function matchWithSuffix(text, pattern, suffixArray) {
    let min = 0;
    let max = text.length;

    while (min < max) {
        let mid = Math.floor((min + max) / 2);
        let suffix = suffixArray[mid];
        let i = 0;
        while (i < pattern.length && suffix + i < text.length) {
            if (pattern[i] > text[suffix + i]) {
                min = mid + 1;
                break;
            } else if (pattern[i] < text[suffix + i]) {
                max = mid;
                break;
            }
            i++;

            if (i === pattern.length) {
                max = mid;
            } else if (suffix + i === text.length) {
                min = mid + 1;
            }
        }
    }
    start = min;
    max = text.length;
    while (min < max) {
        mid = Math.floor((min + max) / 2);
        suffix = suffixArray[mid];
        let i = 0;
        while (i < pattern.length && suffix + i < text.length) {
            if (pattern[i] < text[suffix + i]) {
                max = mid;
                break;
            }
            i++;
            if (i === pattern.length && i <= text.length - suffix) {
                min = mid + 1;
            }
        }
    }
    end = max - 1;
    return [start, end];
}
function findOccurrences(text, patterns) {
    let result = '';
    const suffixArray = buildSuffixArray(text + '$');
    const res = new Array(text.length).fill([0]);

    for (pattern of patterns) {
        const [s, e] = matchWithSuffix(text, pattern, suffixArray);

        if (s <= e) {
            for (let i = s; i < e + 1; i++) {
                let pos = suffixArray[i];

                if (res[pos] == 0) {
                    result += pos + ' ';
                }
                res[pos] += 1;
            }
        }
    }

    return process.stdout.write(result, () => {
        process.exit();
    });
}

module.exports = findOccurrences;
