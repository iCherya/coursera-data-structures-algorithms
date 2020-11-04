// Max time used: 1.25/10.00, max memory used: 71483392/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const [s, t] = line.toString().split(' ');
    console.log(commonSubstring(s, t));
});

const commonSubstring = (str1, str2) => {
    const getHashParams = (tLen, pLen) => {
        const p = findGreaterThan(tLen * pLen * 1000);
        const x = 123;
        return [p, x];
    };
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
        const lastHash = polyHash(lastPatternLengthSubstring, p, x);
        precomputedHashes[tLen - pLen] = lastHash;
        let y = 1;
        for (let i = 1; i <= pLen; i++) {
            y = (y * x) % p;
        }
        for (let i = tLen - pLen - 1; i >= 0; i--) {
            const startChar = text.charCodeAt(i);
            const endChar = text.charCodeAt(i + pLen);
            const hash = (((x * precomputedHashes[i + 1] + startChar - y * endChar) % p) + p) % p;
            precomputedHashes[i] = hash;
        }
        return precomputedHashes;
    };

    let [p, x] = getHashParams(str1.length, str2.length);

    const commonSubStrBinarySearch = (str1, str2, k) => {
        const H1 = precomputeHashes(str1, k, p, x);
        const H2 = precomputeHashes(str2, k, p, x);

        const setA = new Set(H1);
        const setB = new Set(H2);

        const intersection = new Set([...setA].filter((x) => setB.has(x)));
        return Array.from(intersection);
    };
    const findIndexes = (str1, str2, k, value) => {
        let H1 = precomputeHashes(str1, k, p, x);
        let H2 = precomputeHashes(str2, k, p, x);

        let i = H1.findIndex((el) => el === value);
        let j = H2.findIndex((el) => el === value);

        return { i, j };
    };

    let left = 0;
    let right = Math.min(str1.length, str2.length);
    let hashValue;

    while (left <= right) {
        k = Math.floor((left + right) / 2);
        let ansArr = commonSubStrBinarySearch(str1, str2, k);
        if (ansArr.length !== 0) {
            hashValue = ansArr[0];
            left = k + 1;
        } else {
            right = k - 1;
        }
    }

    const maxCommonSubStrLength = left - 1;
    if (maxCommonSubStrLength === 0) return '0 0 0';

    const indexes = findIndexes(str1, str2, maxCommonSubStrLength, hashValue);

    const result = `${indexes.i} ${indexes.j} ${maxCommonSubStrLength}`;
    return result;
};

module.exports = commonSubstring;
