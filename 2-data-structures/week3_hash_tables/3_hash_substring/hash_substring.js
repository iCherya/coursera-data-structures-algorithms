// Max time used: 0.34/7.50, max memory used: 82550784/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const pattern = line.toString();

    rl.once('line', (line) => {
        const text = line.toString();
        const result = rabinKarp(text, pattern).join(' ');
        process.stdout.write(result, () => {
            process.exit();
        });
    });
});

const rabinKarp = (text, pattern) => {
    const [tLen, pLen] = [text.length, pattern.length];

    const findGreaterThan = (number) => {
        number = parseInt(number);
        if (number > Number.MAX_SAFE_INTEGER) {
            throw new Error('Exceeded MAX_SAFE_INTEGER.');
        }
        while (isPrime(number) === false) {
            number++;
        }
        return number;
    };

    const isPrime = (number) => {
        const sqrtX = Math.ceil(Math.sqrt(number));
        if (number === 2) {
            return true;
        }
        let c = 2;
        while (c <= sqrtX) {
            if (number % c === 0) {
                return false;
            }
            c++;
        }
        return true;
    };

    const p = findGreaterThan(tLen * pLen * 1000);
    const x = 7;
    const result = [];

    const polyHash = (string, p, x) => {
        let hash = 0;
        for (let i = string.length - 1; i >= 0; i--) {
            hash = (((hash * x + string.charCodeAt(i)) % p) + p) % p;
        }
        return hash;
    };

    const precomputeHashes = (text, pLen, p, x) => {
        const tLen = text.length;
        const precomputedHashes = [];
        const lastPatternLengthSubstring = text.substring(tLen - pLen, tLen);
        precomputedHashes[tLen - pLen] = polyHash(lastPatternLengthSubstring, p, x);
        let y = 1;
        for (let i = 1; i <= pLen; i++) {
            y = (y * x) % p;
        }
        for (let i = tLen - pLen - 1; i >= 0; i--) {
            const startChar = text.charCodeAt(i);
            const endChar = text.charCodeAt(i + pLen);
            precomputedHashes[i] =
                (((x * precomputedHashes[i + 1] + startChar - y * endChar) % p) + p) % p;
        }
        return precomputedHashes;
    };

    const pHash = polyHash(pattern, p, x);
    const H = precomputeHashes(text, pLen, p, x);

    for (let i = 0; i <= tLen - pLen; i++) {
        if (pHash != H[i]) {
            continue;
        }
        let currentTextSubstring = text.substring(i, i + pLen);
        if (currentTextSubstring === pattern) {
            result.push(i);
        }
    }
    return result;
};

module.exports = rabinKarp;
