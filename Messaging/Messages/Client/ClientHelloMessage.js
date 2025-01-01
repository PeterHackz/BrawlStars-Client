const ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    encode() {
        this.ByteStream.writeInt(2); // protocol version
        this.ByteStream.writeInt(48); // crypto version
        this.ByteStream.writeInt(settings.major); // major version
        this.ByteStream.writeInt(settings.build); // build version
        this.ByteStream.writeInt(settings.minor); // minor version
        this.ByteStream.writeString(settings.hash); // master hash
        this.ByteStream.writeInt(2);
        this.ByteStream.writeInt(2);
    }
}
