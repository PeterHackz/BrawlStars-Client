var Blake2b = require("./blake2b"),
crypto = require("crypto");

module.exports = class {
    constructor(input) {
        if (!input) {
            this.nonce = new Uint8Array(crypto.randomBytes(24));
            return;
        }
        if (input.Keys) {
            var b2b = Blake2b.blake2bInit(24);
            if (input.nonce) {
                Blake2b.blake2bUpdate(b2b, input.nonce);
            }
            input.Keys.forEach(key => {
                Blake2b.blake2bUpdate(b2b, key);
            })
            this.nonce = Blake2b.blake2bFinal(b2b);
        } else if (input.nonce) {
            this.nonce = input.nonce;
        }
    }
    bytes() {
        return this.nonce;
    }
    increment() {
        var temp = Buffer.from(this.nonce);
        temp.writeInt32LE(temp.readInt32LE(0) + 2, 0);
        this.nonce = new Uint8Array(temp);
    }
}
