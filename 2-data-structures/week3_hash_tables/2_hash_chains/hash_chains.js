// Max time used: 0.38/7.00, max memory used: 58748928/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const m = parseInt(line, 10);

    rl.once('line', (line) => {
        const n = parseInt(line, 10);
        const commands = [];

        rl.on('line', (line) => {
            const command = line.toString().split(' ');

            if (commands.length < n) {
                commands.push(command);
            }

            if (commands.length === n) {
                hashChains(m, commands);
            }
        });
    });
});

const hashFunc = (string, m) => {
    let p = 1000000007;
    let x = 263;
    let hash = 0;
    for (let i = string.length - 1; i >= 0; i--) {
        hash = (hash * x + string.charCodeAt(i)) % p;
    }
    return hash % m;
};

const hashChains = (m, commands) => {
    const chain = [];
    for (let i = 0; i < m; i++) {
        const row = new Set();
        chain.push(row);
    }
    const results = [];
    for (let item of commands) {
        const [command, value] = item;

        let hashItem = hashFunc(value, m);

        if (command === 'add') {
            chain[hashItem].add(value);
        }
        if (command === 'find') {
            const result = chain[hashItem].has(value) ? 'yes' : 'no';
            results.push(result);
        }
        if (command === 'del') {
            chain[hashItem].delete(value);
        }
        if (command === 'check') {
            const result = [[...chain[value].values()].reverse().join(' ')];
            results.push(result);
        }
    }

    return process.stdout.write(results.join('\n'), () => {
        process.exit();
    });
};

module.exports = hashChains;
