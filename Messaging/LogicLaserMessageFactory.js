const Messages = {
    20100: require("./Messages/Server/ServerHelloMessage"),
    20103: require("./Messages/Server/LoginFailedMessage"),
    20104: require("./Messages/Server/LoginOkMessage")
}

function createMessageByType(type) {
    if (Messages[type]) {
        return new Messages[type]();
    }
}

module.exports = {
    createMessageByType
}