// Max time used: 0.46/30.00, max memory used: 124272640/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const text = line.trim();
    const answer = buildSuffixArray(text);
    process.stdout.write(answer.join(' ') + '\n', () => {
        process.exit();
    });
});

function sortCharacters(string) {
    const characters = ['$', 'A', 'C', 'G', 'T'];

    const order = new Array(string.length).fill(null);
    const count = new Array(string.length).fill(0);

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

    return order;
}

module.exports = buildSuffixArray;
