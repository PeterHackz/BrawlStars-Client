var ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    encode() {
        this.ByteStream.writeInt(2); // protocol version
        this.ByteStream.writeInt(35); // crypto version
        this.ByteStream.writeInt(47); // major version
        this.ByteStream.writeInt(1); // build version
        this.ByteStream.writeInt(211); // minor version
        this.ByteStream.writeString("db748fbfc2deb455586fc0ae3a7eea562eb4c0c9"); // master hash
        this.ByteStream.writeInt(0);
        this.ByteStream.writeInt(0);
    }
}
