const ByteStream = require("../../../DataStream/ByteStream");

module.exports = class {
    constructor() {
        this.ByteStream = new ByteStream();
    }
    decode() {
        this.error_code = this.ByteStream.readInt();
        this.fingerprint = this.ByteStream.readString();
    }
    process(messaging) {
        if (this.error_code != 7) {
            Debugger.fatal("LoginFailedMessage: received error code {}".format(this.error_code));
        }
        const {
            sha,
            version
        } = JSON.parse(this.fingerprint);
        Debugger.info("LoginFailedMessage: updating fingerprint settings <hash: {}, version: {}>".format(sha, version));
        settings.hash = sha;
        const versions = version.split(".").map(v => parseInt(v));
        settings.major = versions[0];
        settings.minor = versions[1];
        settings.build = versions[2];
        flush();
        connect(); // reconnect
    }
}

module.exports.getMessageType = () => 20103;