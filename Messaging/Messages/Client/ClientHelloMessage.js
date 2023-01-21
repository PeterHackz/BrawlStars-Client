const ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    encode() {
        this.ByteStream.writeInt(2); // protocol version
        this.ByteStream.writeInt(35); // crypto version
        this.ByteStream.writeInt(47); // major version
        this.ByteStream.writeInt(1); // build version
        this.ByteStream.writeInt(236); // minor version
        this.ByteStream.writeString("5613229054f0259cca492bc2e27164e4c5c2c914"); // master hash
        this.ByteStream.writeInt(0);
        this.ByteStream.writeInt(0);
    }
}
