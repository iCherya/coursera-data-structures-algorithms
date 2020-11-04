// Max time used: 1.71/10.00, max memory used: 42307584/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.on('line', (line) => {
    const [k, t, p] = line.toString().split(' ');
    console.log(matchingWithMismatches(+k, t, p));
});

const matchingWithMismatches = (k, text, pattern) => {
    let answer = '';
    let counter = 0;
    const textIndexMax = text.length - pattern.length + 1;

    const areEqual = (subString, subPattern) => {
        return subString === subPattern;
    };

    for (let i = 0; i < textIndexMax; i++) {
        let missed = 0;

        let textLeftIdx = i;
        let textRightIdx = i + pattern.length - 1;
        let patternLeftIdx = 0;
        let patternRightIdx = pattern.length - 1;

        function binarySearch(textLeftIdx, textRightIdx, patternLeftIdx, patternRightIdx) {
            if (missed > k) {
                return;
            }
            if (textRightIdx >= textLeftIdx) {
                let textMiddleIdx = Math.floor((textLeftIdx + textRightIdx) / 2);
                let patternMiddleIdx = Math.floor((patternLeftIdx + patternRightIdx) / 2);

                if (text[textMiddleIdx] != pattern[patternMiddleIdx]) {
                    missed++;
                }

                let textSubLeft = text.substring(textLeftIdx, textMiddleIdx);
                let patternSubLeft = pattern.substring(patternLeftIdx, patternMiddleIdx);
                let textSubRight = text.substring(textMiddleIdx + 1, textRightIdx + 1);
                let patternSubRight = pattern.substring(patternMiddleIdx + 1, patternRightIdx + 1);

                if (textSubLeft.length !== 0 || patternSubLeft.length !== 0) {
                    if (!areEqual(textSubLeft, patternSubLeft)) {
                        binarySearch(
                            textLeftIdx,
                            textMiddleIdx - 1,
                            patternLeftIdx,
                            patternMiddleIdx - 1
                        );
                    }
                }
                if (textSubRight.length !== 0 || patternSubRight.length !== 0) {
                    if (!areEqual(textSubRight, patternSubRight)) {
                        binarySearch(
                            textMiddleIdx + 1,
                            textRightIdx,
                            patternMiddleIdx + 1,
                            patternRightIdx
                        );
                    }
                }
            } else {
                return;
            }
        }
        binarySearch(textLeftIdx, textRightIdx, patternLeftIdx, patternRightIdx);

        if (missed <= k) {
            counter++;
            answer += i + ' ';
        }
    }

    return `${counter} ${answer}`;
};

module.exports = matchingWithMismatches;
