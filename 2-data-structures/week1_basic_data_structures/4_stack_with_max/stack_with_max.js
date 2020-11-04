// Max time used: 0.34/5.00, max memory used: 66457600/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const n = parseInt(line, 10);
    const commands = [];

    rl.on('line', (line) => {
        const command = line.toString().split(' ');
        if (commands.length < n) {
            commands.push(command);
        }

        if (commands.length === n) {
            stack(commands);
        }
    });
});

class StackWithMax {
    constructor() {
        this.stack = [];
        this.maximum = [];
    }
    push(el) {
        if (this.stack.length === 0) {
            this.maximum.push(el);
        } else {
            this.maximum.push(Math.max(this.maximum[this.maximum.length - 1], el));
        }
        this.stack.push(el);
    }
    pop() {
        this.stack.pop();
        this.maximum.pop();
    }
    max() {
        return this.maximum[this.maximum.length - 1];
    }
}

function stack(commands) {
    const result = [];
    const obj = new StackWithMax();
    for (let command of commands) {
        if (command[0] === 'pop') {
            obj.pop();
        } else if (command[0] === 'max') {
            const print = obj.max();
            if (print === undefined) {
                continue;
            } else {
                result.push(print);
            }
        } else {
            obj.push(+command[1]);
        }
    }

    return process.stdout.write(result.join('\n'), () => {
        process.exit();
    });
}

module.exports = stack;
