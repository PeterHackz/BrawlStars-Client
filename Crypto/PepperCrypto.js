var Nacl = require("./Nacl"),
Nonce = require("./Nonce"),
crypto = require("crypto");

const fromHexString = (hexString) => {
    hexString = hexString.replaceAll(" ", "")
    return new Uint8Array(hexString.match(/.{1,2}/g).map((byte) => parseInt(byte, 16)))
}

module.exports = class {
    constructor() {
        this.server_public_key = fromHexString("84BCCFFAEAFAC86CEFD3F16E26586ADBF1ED402481FAF3E8B0AC1FE4739B2C28");
        this.client_secret_key = new Uint8Array(crypto.randomBytes(32));
        this.client_public_key = new Uint8Array(32);
        Nacl.lowlevel.crypto_scalarmult_base(this.client_public_key, this.client_secret_key);
        this.key = Nacl.box.before(this.server_public_key, this.client_secret_key);
        this.nonce = new Nonce({
            Keys: [
                this.client_public_key,
                this.server_public_key
            ]
        });
        this.client_nonce = new Nonce();
    }
    encrypt(type, payload) {
        if (type == 10100) {
            return payload;
        } else if (type == 10101) {
            return Buffer.concat([this.client_public_key, Nacl.box.after(Buffer.concat([this.session_key, this.client_nonce.bytes(), payload]), this.nonce.bytes(), this.key)]);
        } else {
            this.client_nonce.increment();
            return Buffer.from(Nacl.box.after(payload, this.client_nonce.bytes(), this.key));
        }
    }
    decrypt(type, payload) {
        if (type == 20100) {
            this.session_key = payload.slice(4, 28);
            return payload;
        } else if ([20104, 20103].includes(type)) {
            if (!this.session_key) return payload;
            var nonce = new Nonce({
                nonce: this.client_nonce.bytes(),
                Keys: [
                    this.client_public_key,
                    this.server_public_key
                ]
            });
            var decrypted = Nacl.box.open.after(payload, nonce.bytes(), this.key);
            this.server_nonce = new Nonce({
                nonce: decrypted.slice(0, 24)
            });
            this.key = decrypted.slice(24, 56);
            return decrypted.slice(56);
        } else {
            this.server_nonce.increment();
            return Nacl.box.open.after(payload, this.server_nonce.bytes(), this.key);
        }
    }
}