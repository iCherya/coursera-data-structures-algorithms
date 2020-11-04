// Max time used: 1.66/12.00, max memory used: 54272000/536870912.

(function () {
    'use strict';

    let MinHeap = (function () {
        function MinHeap(array, isABeforeB) {
            this.array = [];
            this.size = 0;
            this.maxSize = Number.MAX_SAFE_INTEGER;
            this.isABeforeB =
                typeof isABeforeB === 'function'
                    ? isABeforeB
                    : function (a, b) {
                          return parseInt(a) < parseInt(b);
                      };
            this._build(array);
        }

        MinHeap.prototype = {
            constructor: MinHeap,

            _build: function (array) {
                this.array = array;
                this.size = array.length;
                for (let i = Math.floor((this.size - 1) / 2); i >= 0; i--) {
                    this._siftDown(i);
                }
            },

            _getParent: function (i) {
                return Math.floor((i - 1) / 2);
            },

            _getLeftChild: function (i) {
                return i * 2 + 1;
            },

            _getRightChild: function (i) {
                return i * 2 + 2;
            },

            _swap: function (fromKey, toKey) {
                let tmp = this.array[fromKey];
                this.array[fromKey] = this.array[toKey];
                this.array[toKey] = tmp;
            },

            _siftUp: function (i) {
                while (i > 0 && this.isABeforeB(this.array[i], this.array[this._getParent(i)])) {
                    this._swap(this._getParent(i), i);
                    i = this._getParent(i);
                }
            },

            _siftDown: function (i, size) {
                size = typeof size !== 'undefined' ? size : this.size;
                let maxIndex = i;
                let leftChild = this._getLeftChild(i);

                if (
                    leftChild < size &&
                    this.isABeforeB(this.array[leftChild], this.array[maxIndex])
                ) {
                    maxIndex = leftChild;
                }
                let rightChild = this._getRightChild(i);

                if (
                    rightChild < size &&
                    this.isABeforeB(this.array[rightChild], this.array[maxIndex])
                ) {
                    maxIndex = rightChild;
                }
                if (i !== maxIndex) {
                    this._swap(i, maxIndex);
                    this._siftDown(maxIndex, size);
                }
            },

            _checkHeapProperty: function () {
                for (let i = 0; i < this.size; i++) {
                    if (
                        i * 2 + 1 <= this.size - 1 &&
                        parseInt(this.array[i]) >= parseInt(this.array[i * 2 + 1])
                    ) {
                        throw new Error('MinHeap property violated.');
                    }
                    if (
                        i * 2 + 2 <= this.size - 1 &&
                        parseInt(this.array[i]) >= parseInt(this.array[i * 2 + 2])
                    ) {
                        throw new Error('MinHeap property violated.');
                    }
                }
            },

            insert: function (element) {
                if (this.size === this.maxSize) {
                    throw new RangeError('MinHeap overflow.');
                }
                this.array[this.size] = element;
                this.size++;
                this._siftUp(this.size - 1);
            },

            getMin: function () {
                return this.array[0];
            },

            extractMin: function () {
                let minElement = this.array[0];
                this.array[0] = this.array[this.size - 1];
                this.size--;
                this._siftDown(0);
                this.array.pop();
                return minElement;
            },

            removeElement: function (i) {
                this.array[i] = Number.MIN_SAFE_INTEGER;
                this._siftUp(i);
                this.extractMin();
            },

            changePriority: function (i, newPriority) {
                let currentPriority = this.array[i];
                this.array[i] = newPriority;
                newPriority < currentPriority ? this._siftUp(i) : this._siftDown(i);
            },

            sort: function () {
                let counter = this.size - 1;
                for (let i = 0; i < this.size - 1; i++) {
                    this._swap(0, counter);
                    counter--;
                    this._siftDown(0, counter);
                }
                return this.array;
            },

            partialSort: function (k) {
                if (k > this.size / Math.log2(this.size)) {
                    throw new Error('Not efficient partial sort for ' + k);
                }
                let partiallySortedArray = [];
                for (let i = 0; i <= k - 1; i++) {
                    partiallySortedArray[i] = this.extractMin();
                }
                return partiallySortedArray;
            }
        };

        return MinHeap;
    })();

    let Processor = (function () {
        function Processor(id, workAmount) {
            this.id = id;
            this.startTime = 0;
            this.workAmount = workAmount;
        }

        Processor.prototype = {
            constructor: Processor,

            adjustStartTime: function (workAmount) {
                this.startTime += this.workAmount;
                this.workAmount = workAmount;
            }
        };

        Processor.isABeforeB = function (a, b) {
            if (parseInt(a.workAmount + a.startTime) === parseInt(b.workAmount + b.startTime)) {
                return parseInt(a.id) < parseInt(b.id);
            }
            return parseInt(a.workAmount + a.startTime) < parseInt(b.workAmount + b.startTime);
        };

        return Processor;
    })();

    if (process.argv.length === 2) {
        let readline = require('readline');
        let rl = readline.createInterface({
            input: process.stdin,
            output: process.stdout,
            terminal: false
        });

        let lines = 0;
        let numberOfProcessors = 0;
        let jobs = [];
        rl.on('line', function (line) {
            if (lines === 0) {
                numberOfProcessors = parseInt(line.split(' ')[0]);
                lines++;
            } else if (lines === 1) {
                jobs = line.split(' ').map(function (number) {
                    return parseInt(number);
                });
                let numberOfJobs = jobs.length;

                let processors = [];
                for (let i = 0; i < numberOfProcessors; i++) {
                    processors.push(new Processor(i, jobs[i]));
                }

                if (numberOfProcessors < numberOfJobs) {
                    for (i = 0; i < numberOfProcessors; i++) {
                        console.log(processors[i].id, processors[i].startTime);
                    }
                    let minHeap = new MinHeap(processors, Processor.isABeforeB);
                    for (i = numberOfProcessors; i < numberOfJobs; i++) {
                        let currentProcessor = minHeap.extractMin();
                        currentProcessor.adjustStartTime(jobs[i]);
                        minHeap.insert(currentProcessor);
                        console.log(currentProcessor.id, currentProcessor.startTime);
                    }
                } else {
                    for (i = 0; i < numberOfJobs; i++) {
                        console.log(processors[i].id, processors[i].startTime);
                    }
                }
            }
        });
    }
})();
