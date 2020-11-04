// Max time used: 0.04/5.00, max memory used: 23461888/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(find_mismatch(line));
    process.exit();
}

const are_matching = (left, right) => {
    const matches = { '(': ')', '[': ']', '{': '}' };
    return matches[left] === right;
};

const find_mismatch = (text) => {
    const stack = [];

    for (let i = 0; i < text.length; i++) {
        let x = text[i];

        if (['(', '[', '{'].includes(x)) {
            stack.push(i, x);
        } else if ([')', ']', '}'].includes(x)) {
            if (stack.lenght || are_matching(stack.pop(), x)) {
                stack.pop();
            } else {
                return i + 1;
            }
        }
    }

    if (stack.length) return stack[stack.length - 2] + 1;
    else return 'Success';
};

module.exports = find_mismatch;
