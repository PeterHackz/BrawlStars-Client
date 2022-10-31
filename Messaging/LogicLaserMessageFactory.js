var Messages = {
    20100: require("./Messages/Server/ServerHelloMessage")
}

function createMessageByType(type) {
    if (Messages[type]) {
        return new Messages[type]();
    }
}

module.exports = {
    createMessageByType
}
