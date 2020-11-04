// Max time used: 1.30/5.00, max memory used: 51216384/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const text = line.toString();

    rl.once('line', (line) => {
        const n = parseInt(line, 10);
        const lines = [];

        rl.on('line', (line) => {
            const signleLineWithNumbers = line.toString().split(' ').map(Number);

            if (lines.length < n) {
                lines.push(signleLineWithNumbers);
            }

            if (lines.length === n) {
                const result = substringEquality({ text, n, lines }).join('\n');
                process.stdout.write(result, () => {
                    process.exit();
                });
            }
        });
    });
});

const substringEquality = (data) => {
    const { text, n, lines } = data;
    const result = [];

    let answer = '';
    for (let i = 0; i < n; i++) {
        let sub1 = text.substring(lines[i][0], lines[i][0] + lines[i][2]);
        let sub2 = text.substring(lines[i][1], lines[i][1] + lines[i][2]);
        if (sub1 === sub2) {
            answer = 'Yes';
        } else {
            answer = 'No';
        }
        result.push(answer);
    }

    return result;
};

module.exports = substringEquality;
