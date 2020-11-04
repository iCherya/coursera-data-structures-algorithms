// Max time used: 0.05/5.00, max memory used: 21688320/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (str1) => {
    rl.once('line', (str2) => {
        console.log(editDistance(str1, str2));
        process.exit();
    });
});

const editDistance = (str1, str2) => {
    const distances = [];

    for (let i = 0; i <= str1.length; ++i) distances[i] = [i];
    for (let i = 0; i <= str2.length; ++i) distances[0][i] = i;

    for (let j = 1; j <= str2.length; ++j)
        for (let i = 1; i <= str1.length; ++i)
            distances[i][j] =
                str1[i - 1] === str2[j - 1]
                    ? distances[i - 1][j - 1]
                    : Math.min.apply(Math, [
                          distances[i - 1][j] + 1,
                          distances[i][j - 1] + 1,
                          distances[i - 1][j - 1] + 1
                      ]);

    return distances[str1.length][str2.length];
};

module.exports = editDistance;
