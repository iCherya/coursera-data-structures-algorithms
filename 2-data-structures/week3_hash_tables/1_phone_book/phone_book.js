// Max time used: 0.24/15.00, max memory used: 60260352/671088640.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const n = parseInt(line, 10);
    const commands = [];

    rl.on('line', (line) => {
        const command = line.toString().split(' ');
        if (commands.length < n) {
            commands.push(command);
        }

        if (commands.length === n) {
            phoneBook(commands);
        }
    });
});

const phoneBook = (commands) => {
    const results = [];
    const book = new Map();

    for (let item of commands) {
        const [method, number, value] = item;
        if (method === 'find') {
            let result = '';
            if (book.has(number)) {
                result = book.get(number);
            } else {
                result = 'not found';
            }
            results.push(result);
        }
        if (method === 'del') {
            book.delete(number);
        }
        if (method === 'add') {
            book.set(number, value);
        }
    }

    return process.stdout.write(results.join('\n'), () => {
        process.exit();
    });
};

module.exports = phoneBook;
