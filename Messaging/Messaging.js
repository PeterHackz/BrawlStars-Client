var LogicLaserMessageFactory = require("./LogicLaserMessageFactory");

var ClientHelloMessage = require("./Messages/Client/ClientHelloMessage");
var LoginMessage = require("./Messages/Client/LoginMessage");

var PepperCrypto = require("../Crypto/PepperCrypto");

if (dump) {
    var fs = require("fs");
    if (!fs.existsSync("./PacketsDumps")) {
        fs.mkdirSync("./PacketsDumps");
    }
    var messages = {};
}

class Queue {
    constructor() {
        this._data = null;
    }
    add(buffer) {
        if (this._data == null) {
            this._data = buffer;
        } else {
            this._data = Buffer.concat([this._data, buffer]);
        }
    }
    get() {
        return this._data;
    }
    size() {
        return this._data.length;
    }
    release(size) {
        this._data = this._data.slice(size);
    }
    reset() {
        this._data = null;
    }
}

class Messaging {
    constructor(socket, queue) {
        this._queue = queue;
        this._socket = socket;
        this.crypto = new PepperCrypto();
    }
    pendingJob() {
        if (this._queue.size() < 7) return false;
        return this._queue.get().readUIntBE(2, 3) <= this._queue.size() - 7;
    }
    update() {
        var buffer = this._queue.get();
        var length = buffer.readUIntBE(2, 3);
        var type = buffer.readUInt16BE(0);
        var version = buffer.readUInt16BE(5);
        this._queue.release(length+7);
        var payload = this.crypto.decrypt(type, buffer.slice(7, length+7));
        if (payload == null) {
            Debugger.fatal("failed to decrypt {}".format(type))
        }
        Debugger.info("received message of type: {}, length: {}, version: {}".format(type, length, version));
        var message = LogicLaserMessageFactory.createMessageByType(type);
        if (message) {
            message.ByteStream.set(payload);
            message.decode();
            message.process(this);
        } else {
            Debugger.info("ignoring unsupported message ({})".format(type));
        }
        if (dump) {
            if (!messages[type]) messages[type] = 0;
            fs.writeFileSync("./PacketsDumps/{}-{}.bin".format(type, messages[type]), payload);
            messages[type] += 1;
        }
    }
    sendPepperAuthentication() {
        var message = new ClientHelloMessage();
        message.ByteStream.set(100);
        message.encode();
        this.encryptAndWriteToSocket(10100, 0, message.ByteStream.getBytes());
    }
    sendPepperLogin() {
        var message = new LoginMessage();
        message.ByteStream.set(250);
        message.encode();
        this.encryptAndWriteToSocket(10101, 0, message.ByteStream.getBytes());
    }
    encryptAndWriteToSocket(type, version, buffer) {
        var header = Buffer.alloc(7);
        header.writeUInt16BE(type, 0);
        buffer = this.crypto.encrypt(type, buffer);
        header.writeUIntBE(buffer.length, 2, 3);
        header.writeUInt16BE(version, 5);
        this._socket.write(header);
        this._socket.write(buffer);
        Debugger.info("sent message of type: {}, length: {}".format(type, buffer.length));
    }
}

module.exports = {
    Messaging,
    Queue
}
