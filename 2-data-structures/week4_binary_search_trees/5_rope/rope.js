// Max time used: 33.88/120.00, max memory used: 86659072/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const string = line.toString().trim();
    rl.once('line', (line) => {
        const n = parseInt(line, 10);
        if (n === 0) {
            console.log(string);
            process.exit();
        }
        const data = [];
        rl.on('line', (line) => {
            const item = line.toString().trim().split(' ').map(Number);

            if (data.length < n) {
                data.push(item);
            }

            if (data.length === n) {
                const rope = new Rope(string);
                for (let item of data) {
                    rope.process(item);
                }
                rope.result();
            }
        });
    });
});

class Rope {
    constructor(string) {
        this.string = string;
    }
    result() {
        return process.stdout.write(this.string, () => {
            process.exit();
        });
    }
    process(item) {
        const [i, j, k] = item;
        let substring = this.string.substring(i, j + 1);
        this.string = this.string.substring(0, i) + this.string.substring(j + 1);
        if (k === 0) {
            this.string = substring + this.string;
        } else {
            this.string = this.string.substring(0, k) + substring + this.string.substring(k);
        }
    }
}

module.exports = Rope;
