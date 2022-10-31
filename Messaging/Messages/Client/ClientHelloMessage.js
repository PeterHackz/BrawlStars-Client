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
        this.ByteStream.writeInt(190); // minor version
        this.ByteStream.writeString("26d9b4db26f9b827da2ddf162779d6d96c18ee36"); // master hash
        this.ByteStream.writeInt(0);
        this.ByteStream.writeInt(0);
    }
}
