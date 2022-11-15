var ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    encode() {
        this.ByteStream.writeInt(2); // protocol version
        this.ByteStream.writeInt(34); // crypto version
        this.ByteStream.writeInt(46); // major version
        this.ByteStream.writeInt(1); // build version
        this.ByteStream.writeInt(209); // minor version
        this.ByteStream.writeString("e13eb3b80ac96ef51c3baa7eb25064aadfe00fed"); // master hash
        this.ByteStream.writeInt(0);
        this.ByteStream.writeInt(0);
    }
}
