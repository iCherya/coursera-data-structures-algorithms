// Max time used: 0.15/5.00, max memory used: 28688384/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');
rl.once('line', (line) => {
    const n = parseInt(line);
    rl.once('line', (line) => {
        const integers = line.toString().split(' ').map(Number);
        console.log(mm(integers));
        process.exit();
    });
});
function mm(arr) {
    let count = 0;
    mergeSort(arr);

    function mergeSort(arr) {
        if (arr.length <= 1) return arr;

        let halfPoint = Math.ceil(arr.length / 2);
        let firstHalf = mergeSort(arr.splice(0, halfPoint));
        let secondHalf = mergeSort(arr.splice(-halfPoint));
        return merge(firstHalf, secondHalf);
    }

    function merge(arr1, arr2) {
        let result = [];
        let i = 0;
        let j = 0;

        while (i < arr1.length && j < arr2.length) {
            if (arr1[i] > arr2[j]) {
                count = count + arr1.length - i;
                result.push(arr2[j]);
                j++;
            } else {
                result.push(arr1[i]);
                i++;
            }
        }

        while (i < arr1.length) {
            result.push(arr1[i]);
            i++;
        }

        while (j < arr2.length) {
            result.push(arr2[j]);
            j++;
        }

        return result;
    }

    return count;
}

module.exports = mm;
