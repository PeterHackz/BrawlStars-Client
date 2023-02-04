const args = process.argv.slice(2);

require("./utils/Debugger"); // initialize it globally

global.dump = args[2] == "dump" || args[0] == "dump";

args[0] = args[0] != "dump" && args[0] ? args[0]: "game.brawlstarsgame.com";

args[1] ??= 9339;

if (isNaN(args[1])) Debugger.fatal("port should be an integer.");

global.String.prototype.format = function(...args) {
    return args.reduce((p, c) => p.replace(/{}/, c), this);
}

const net = require("net"),
Connection = require("./TcpSocket/Connection"),
{
    writeFileSync
} = require("fs");
global.settings = require("./settings.json");
global.flush = function() {
    writeFileSync("settings.json", JSON.stringify(settings, null, 4));
}

var client;

global.connect = function() {

    if (client) {
        client.destroy();
        Debugger.info("reconnecting...");
    }

    client = new net.Socket();

    client.connect(parseInt(args[1]), args[0], () => {
        Debugger.info("succesfully connected to {}:{}".format(args[0], args[1]));
        Connection(client);
    });

    client.on("error", error => {
        Debugger.fatal(error);
    });
}

connect();