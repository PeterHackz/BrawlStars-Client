const ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    encode() {
        this.ByteStream.writeInt(settings.hi || 0); // high
        this.ByteStream.writeInt(settings.lo || 0); // low
        this.ByteStream.writeString(settings.token); // token

        this.ByteStream.writeInt(settings.major);
        this.ByteStream.writeInt(settings.build);
        this.ByteStream.writeInt(settings.minor);
        this.ByteStream.writeString(settings.hash);

        this.ByteStream.writeString();
        this.ByteStream.writeDataReference(1, 0);
        this.ByteStream.writeString("en-US");
        this.ByteStream.writeString();
        this.ByteStream.writeBoolean(false);
        this.ByteStream.writeString();
        this.ByteStream.writeString();
        this.ByteStream.writeBoolean(true);
        this.ByteStream.writeString();
        this.ByteStream.writeInt(1448);
        this.ByteStream.writeVInt(0);
        this.ByteStream.writeString();

        this.ByteStream.writeString();
        this.ByteStream.writeString();
        this.ByteStream.writeVInt(0);

        this.ByteStream.writeString();
        this.ByteStream.writeString();
        this.ByteStream.writeString();

        this.ByteStream.writeString(); // Supercell ID Session Token, must be compressed with zlib

        this.ByteStream.writeBoolean(false);
        this.ByteStream.writeString();
        this.ByteStream.writeString();
    }
}
