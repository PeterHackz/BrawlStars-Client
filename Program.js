const args = process.argv.slice(2);

require("./utils/Debugger"); // initialize it globally

if (!args[0]) {
    args[0] = "game.brawlstarsgame.com"
    Debugger.error("you forget paste ip arg! Setting an default game.brawlstarsgame.com")
}else if(args[0] == "dump"){
    global.dump = true
}

if (isNaN(args[1])) {
    args[1] = 9339
    Debugger.error("port should be an integer, received", args[1], ". Setting an default 9339");
}

global.dump = args[2] == "dump";

global.String.prototype.format = function(...args) {
    return args.reduce((p, c) => p.replace(/{}/, c), this);
}

const net = require("net"),
Connection = require("./TcpSocket/Connection");

const client = new net.Socket();

client.connect(parseInt(args[1]), args[0], () => {
    Debugger.info("succesfully connected to {}:{}".format(args[0], args[1]));
    Connection(client);
});

client.on("error", error => {
    return Debugger.fatal(error);
});
