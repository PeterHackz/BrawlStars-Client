var args = process.argv.slice(2);

require("./utils/Debugger"); // initialize it globally

if (args.length < 2) {
    Debugger.fatal("expected 2 args: <domain> <port> <optional: dump>");
}

if (isNaN(args[1])) {
    Debugger.fatal("port should be an integer, received", args[1]);
}

global.dump = args[2] == "dump";

global.String.prototype.format = function(...args) {
    return args.reduce((p, c) => p.replace(/{}/, c), this);
}

var net = require("net"),
Connection = require("./TcpSocket/Connection");

var client = new net.Socket();

client.connect(parseInt(args[1]), args[0], () => {
    Debugger.info("succesfully connected to {}:{}".format(args[0], args[1]));
    Connection(client);
});

client.on("error", error => {
    Debugger.fatal(error);
});
