// Max time used: 0.09/5.00, max memory used: 19611648/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    const [n, m] = line.trim().split(' ').map(Number);
    const adjMatrix = [];

    rl.on('line', (line) => {
        const item = line.toString().trim().split(' ').map(Number);
        adjMatrix.push(item);

        if (adjMatrix.length === n) {
            const matching = findMatching(adjMatrix, n, m);
            printResult(n, matching);
            process.exit();
        }
    });
});

class Queue {
    constructor() {
        this.head = null;
        this.tail = null;
        this.size = 0;
    }
    enqueue(data) {
        const node = { data: data, next: null };

        if (this.head === null) {
            this.head = node;
            this.tail = node;
        } else {
            this.tail.next = node;
            this.tail = node;
        }

        this.size++;
    }
    dequeue() {
        let node;

        if (this.head !== null) {
            node = this.head.data;
            this.head = this.head.next;
        }

        this.size--;

        return node;
    }
    print() {
        const result = [];
        let current = this.head;

        while (current) {
            result.push(current.data);
            current = current.next;
        }

        console.log('QUEUE:', result.join(','));
    }
}

function bfs(graph, from, to, parent) {
    const len = graph.length;

    const queue = new Queue();
    queue.enqueue(from);

    const visited = new Array(len).fill(false);
    visited[from] = true;

    while (queue.size > 0) {
        let current = queue.dequeue();

        for (let i = 0; i < graph[current].length; i++) {
            if (!visited[i] && graph[current][i] > 0) {
                queue.enqueue(i);
                visited[i] = true;
                parent[i] = current;
            }
        }
    }

    return visited[to];
}

function printResult(n, matching) {
    const result = new Array(n).fill('-1');

    for (let item of matching) {
        const [from, to] = item;
        result[from - 1] = to - n;
    }

    console.log(result.join(' '));
}

function findMatching(adj, n, m) {
    const result = [];

    const size = n + m + 2;
    const graph = Array.from(Array(size), (el) => new Array(size).fill(0));

    for (let x = 0; x < n; x++) {
        for (let y = 0; y < m; y++) {
            graph[x + 1][n + y + 1] = adj[x][y];
        }
    }

    for (let i = 0; i < n; i++) {
        graph[0][i + 1] = 1;
    }
    for (let j = 0; j < m; j++) {
        graph[n + j + 1][graph.length - 1] = 1;
    }

    const source = 0;
    const sink = size - 1;
    const parent = new Array(graph.length).fill(-1);

    const temp = graph.map((el) => {
        return el.map((el) => el);
    });

    while (bfs(graph, source, sink, parent)) {
        let pathFlow = Infinity;
        let s = sink;

        while (s !== source) {
            pathFlow = Math.min(pathFlow, graph[parent[s]][s]);
            s = parent[s];
        }

        let v = sink;

        while (v !== source) {
            graph[parent[v]][v] -= pathFlow;
            graph[v][parent[v]] += pathFlow;

            v = parent[v];
        }
    }

    for (let i = 1; i < n + 1; i++) {
        for (let j = n + 1; j < n + m + 1; j++) {
            if (graph[i][j] === 0 && temp[i][j] > 0) {
                result.push([i, j]);
            }
        }
    }

    return result;
}
