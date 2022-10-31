var fs = require("fs");

var Messages = {}

var path = process.argv[1].split("/").slice(0, -1).join("/");

var files = fs.readdirSync(path+"/Messaging/Messages/Server");
files.forEach(file => {
    if (file.endsWith(".js")) {
        var message = require("./Messages/Server/{}".format(file));
        Messages[message.getMessageType()] = message;
    }
});

function createMessageByType(type) {
    if (Messages[type]) {
        return new Messages[type]();
    }
}

module.exports = {
    createMessageByType
}
