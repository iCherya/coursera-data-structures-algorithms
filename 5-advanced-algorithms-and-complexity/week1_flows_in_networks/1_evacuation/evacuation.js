// Max time used: 0.30/45.00, max memory used: 27070464/536870912.

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

rl.once('line', (line) => {
    let [vertexCount, edgeCount] = line.toString().trim().split(' ').map(Number);
    if (edgeCount === 0) {
        console.log(0);
    }

    const graph = new FlowGraph(vertexCount);
    let counter = 0;

    rl.on('line', (line) => {
        const [u, v, capacity] = line.toString().trim().split(' ').map(Number);
        graph.addEdge(u - 1, v - 1, capacity);
        counter++;

        if (counter === edgeCount) {
            const result = maxFlow(graph, 0, graph.size() - 1);
            console.log(result);
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

class Edge {
    constructor(u, v, capacity) {
        this.u = u;
        this.v = v;
        this.capacity = capacity;
        this.flow = 0;
    }
}

class FlowGraph {
    constructor(n) {
        this.edges = [];
        this.graph = Array.from(Array(n), (el) => []);
    }
    addEdge(from, to, capacity) {
        const forwardEdge = new Edge(from, to, capacity);
        const backwardEdge = new Edge(to, from, 0);
        this.graph[from].push(this.edges.length);
        this.edges.push(forwardEdge);
        this.graph[to].push(this.edges.length);
        this.edges.push(backwardEdge);
    }
    size() {
        return this.graph.length;
    }
    getIds(from) {
        return this.graph[from];
    }
    getEdge(id) {
        return this.edges[id];
    }
    addFlow(id, flow) {
        this.edges[id].flow += flow;
        this.edges[id ^ 1].flow -= flow;
        this.edges[id].capacity -= flow;
        this.edges[id ^ 1].capacity += flow;
    }
}

function bfs(graph, from, to) {
    let X = Infinity;
    let hasPath = false;
    const n = graph.size();
    const dist = Array.from(Array(n), (el) => Infinity);
    const path = [];
    const parent = Array.from(Array(n), (el) => [null, null]);

    const q = new Queue();
    dist[from] = 0;
    q.enqueue(from);

    while (q.size > 0) {
        let currFromNode = q.dequeue();

        for (let id of graph.getIds(currFromNode)) {
            const currEdge = graph.getEdge(id);

            if (dist[currEdge.v] === Infinity && currEdge.capacity > 0) {
                dist[currEdge.v] = dist[currFromNode] + 1;
                parent[currEdge.v] = [currFromNode, id];
                q.enqueue(currEdge.v);

                if (currEdge.v === to) {
                    while (true) {
                        path.unshift(id);
                        const currX = graph.getEdge(id).capacity;
                        X = Math.min(currX, X);
                        if (currFromNode === from) {
                            break;
                        }
                        [currFromNode, id] = parent[currFromNode];
                    }
                    hasPath = true;

                    return [hasPath, path, X];
                }
            }
        }
    }

    return [hasPath, path, X];
}

function maxFlow(graph, from, to) {
    let flow = 0;

    while (true) {
        const [hasPath, path, X] = bfs(graph, from, to);

        if (!hasPath) {
            return flow;
        }

        for (id of path) {
            graph.addFlow(id, X);
        }

        flow += X;
    }
}
