// Max time used: 0.10/5.00, max memory used: 16285696/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.on('line', readLine);

function readLine(line) {
    console.log(change(parseInt(line), [4, 3, 1]));
    process.exit();
}

function change(money, coins) {
    let minNumCoins = [];
    minNumCoins[0] = 0;

    for (let m = 1; m <= money; m++) {
        minNumCoins[m] = Infinity;
        for (let i = 0; i < coins.length; i++) {
            if (m >= coins[i]) {
                let numCoins = minNumCoins[m - coins[i]] + 1;

                if (numCoins < minNumCoins[m]) {
                    minNumCoins[m] = numCoins;
                }
            }
        }
    }

    return minNumCoins[money];
}

module.exports = change;
