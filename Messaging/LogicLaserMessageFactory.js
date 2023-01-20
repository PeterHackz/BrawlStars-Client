const Messages = {
    20100: require("./Messages/Server/ServerHelloMessage")
} // tailsjs: i lazy to do automatic packets reader like in nodebrawl-core

function createMessageByType(type) {
    if (Messages[type]) {
        return new Messages[type]();
    }
}

module.exports = {
    createMessageByType
}
