// Max time used: 1.30/10.00, max memory used: 60542976/536870912.

var Processor = (function () {
    function Processor(maxBufferSize) {
        this.startTimes = [];
        this._buffer = [];
        this._maxBufferSize = parseInt(maxBufferSize);
        this._now = 0;
        this._processorTime = 0;
        this._packetCounter = -1;
        this._droppedMarker = -1;
    }

    var Packet = (function () {
        function Packet(id, arrivalTime, processingTime) {
            this.id = id;
            this.arrivalTime = parseInt(arrivalTime);
            this.processingTime = parseInt(processingTime);
        }
        Packet.prototype = {
            constructor: Packet,
            getId: function () {
                return this.id;
            },
            getArrivalTime: function () {
                return this.arrivalTime;
            },
            getProcessingTime: function () {
                return this.processingTime;
            }
        };
        return Packet;
    })();

    Processor.prototype = {
        constructor: Processor,

        accept: function (arrivalTime, processingTime) {
            var incomingPacket = new Packet(++this._packetCounter, arrivalTime, processingTime);
            this._now = incomingPacket.getArrivalTime();

            if (this.bufferHasSpace()) {
                this._buffer.push(incomingPacket);
            }

            this.process(incomingPacket);

            if (
                !this.isPacketAlreadyProcessed(incomingPacket) &&
                !this.isLastAddedPacket(incomingPacket)
            ) {
                if (this.bufferHasSpace()) {
                    this._buffer.push(incomingPacket);
                } else {
                    this.dropPacket(incomingPacket);
                }
            }
        },

        processRemaining: function () {
            do {
                this._now += 100000;
                this.process();
            } while (this.bufferHasPackets());
        },

        process: function (incomingPacket) {
            while (this.bufferHasPackets() && this._processorTime <= this._now) {
                var packetToProcess = this.getCurrentPacket();

                if (!this.isPacketBeingProcessed(packetToProcess)) {
                    if (
                        incomingPacket instanceof Packet &&
                        this.isCurrentPacket(incomingPacket) &&
                        this._processorTime < this._now
                    ) {
                        this._processorTime = this._now;
                    }

                    this.startTimes[packetToProcess.getId()] = this._processorTime;

                    this._processorTime += packetToProcess.getProcessingTime();
                }

                if (this._processorTime <= this._now) {
                    this._buffer.shift();
                }
            }

            if (!this.bufferHasPackets()) {
                this._processorTime = this._now;
            }
        },

        bufferHasPackets: function () {
            return this._buffer.length > 0;
        },

        bufferHasSpace: function () {
            return this._buffer.length < this._maxBufferSize;
        },

        isCurrentPacket: function (packet) {
            return packet === this.getCurrentPacket();
        },

        isPacketBeingProcessed: function (packet) {
            return this.isCurrentPacket(packet) && this.startTimes[packet.getId()] !== undefined;
        },

        isPacketAlreadyProcessed: function (packet) {
            return !this.isCurrentPacket(packet) && this.startTimes[packet.getId()] !== undefined;
        },

        isLastAddedPacket: function (packet) {
            return packet === this.getLastAddedPacket();
        },

        getCurrentPacket: function () {
            return this.bufferHasPackets() ? this._buffer[0] : null;
        },

        getLastAddedPacket: function () {
            return this.bufferHasPackets() ? this._buffer[this._buffer.length - 1] : null;
        },

        dropPacket: function (packet) {
            this.startTimes[packet.getId()] = this._droppedMarker;
        }
    };

    return Processor;
})();

const readline = require('readline');
const rl = readline.createInterface({
    input: process.stdin,
    terminal: false
});

process.stdin.setEncoding('utf8');

rl.once('line', (line) => {
    const [maxBufferSize, numberOfPackets] = line.toString().split(' ').map(Number);
    const packets = [];
    rl.on('line', (line) => {
        const packet = line.toString().split(' ').map(Number);

        if (packets.length < numberOfPackets) {
            packets.push(packet);
        }

        if (packets.length === numberOfPackets) {
            var processor = new Processor(maxBufferSize);

            for (var i = 0; i < numberOfPackets; i++) {
                var arrivalTime = packets[i][0];
                var processingTime = packets[i][1];
                processor.accept(arrivalTime, processingTime);
            }

            processor.processRemaining();

            for (var j = 0; j < processor.startTimes.length; j++) {
                console.log(processor.startTimes[j]);
            }
            process.exit();
        }
    });
});

module.exports = Processor;
