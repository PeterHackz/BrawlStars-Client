module.exports = class {
    constructor(obj) {
        this.payload = new Uint8Array(obj);
        this.offset = 0;
    }
    set(obj) {
        this.payload = new Uint8Array(obj);
    }
    write(a1) {
        this.payload[this.offset++] = a1;
    }
    read() {
        return this.payload[this.offset++];
    }
    writeUInt(a1) {
        this.write(a1 & 0xFF);
    }
    writeByte(a1) {
        this.write(a1);
    }
    writeBoolean(a1) {
        this.write(a1 ? 1: 0);
    }
    writeInt(a1) {
        this.write((a1 >> 24) & 0xFF);
        this.write((a1 >> 16) & 0xFF);
        this.write((a1 >> 8) & 0xFF);
        this.write(a1 & 0xFF);
    }
    writeString(a1) {
        if (!a1) return this.writeInt(-1);
        var b = new Uint8Array(Buffer.from(a1));
        this.writeInt(b.length);
        for (var strOffset = 0; strOffset < b.length; strOffset++) {
            this.write(b[strOffset]);
        }
    }
    writeVInt(a1) {
        var v1,
        v2,
        v3,
        v1 = (((a1 >> 25) & 0x40) | (a1 & 0x3F)),
        v2 = ((a1 ^ (a1 >> 31)) >> 6);
        a1 >>= 6;
        if (v2 == 0) {
            this.writeByte(v1);
        } else {
            this.writeByte(v1 | 0x80);
            v2 >>= 7;
            v3 = 0;
            if (v2 > 0) {
                v3 = 0x80;
            }
            this.writeByte((a1 & 0x7F) | v3);
            a1 >>= 7;
            while (v2 != 0) {
                v2 >>= 7;
                v3 = 0;
                if (v2 > 0) {
                    v3 = 0x80;
                }
                this.writeByte((a1 & 0x7F) | v3);
                a1 >>= 7;
            }
        }
    }
    writeDataReference(a1, a2) {
        this.writeVInt(a1);
        if (a1 == 0) return;
        this.writeVInt(a2);
    }
    readInt() {
        return (this.read() << 24 | this.read() << 16 | this.read() << 8 | this.read());
    }
    readByte() {
        return this.read();
    }
    readBytes(size) {
        var result = new Uint8Array(size);
        for (var index = 0; index < size; index++) {
            result[index] = this.readByte();
        }
        return result;
    }
    readBoolean() {
        return Boolean(this.read());
    }
    readString() {
        var len = this.readInt();
        if (len <= 0 || len == 4294967295) {
            return "";
        }
        return Buffer.from(this.readBytes(len)).toString();
    }
    readVInt() {
        // this method is discovered by nameless#1347
        var result = 0,
        shift = 0,
        b,
        seventh,
        msb,
        n;
        while (true) {
            b = this.read();
            if (shift == 0) {
                seventh = (b & 0x40) >> 6;
                msb = (b & 0x80) >> 7;
                n = b << 1;
                n = n & ~0x181;
                b = n | (msb << 7) | seventh;
            }
            result |= (b & 0x7f) << shift;
            shift += 7;
            if ((b & 0x80) <= 0) {
                break;
            }
        }
        return (result >> 1) ^ (-(result & 1));
    }
    getBytes() {
        return this.payload.slice(0, this.offset);
    }
}
