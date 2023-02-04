const ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    decode() {
        this.hi = this.ByteStream.readInt();
        this.lo = this.ByteStream.readInt();
        this.ByteStream.readInt();
        this.ByteStream.readInt();
        this.token = this.ByteStream.readString();
    }
    process(messaging) {
        settings.hi = this.hi;
        settings.lo = this.lo;
        settings.token = this.token;
        flush();
    }
}

module.exports.getMessageType = () => 20100;