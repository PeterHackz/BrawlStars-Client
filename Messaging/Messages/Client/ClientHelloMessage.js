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
        this.ByteStream.writeInt(201); // minor version
        this.ByteStream.writeString("6ae6e058604fa57e250294c1660fa1e7cc728994"); // master hash
        this.ByteStream.writeInt(0);
        this.ByteStream.writeInt(0);
    }
}
