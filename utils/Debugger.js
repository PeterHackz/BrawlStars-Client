var colors = require('colors/safe');

global.Debugger = {
    warn: function(...args) {
        console.log(colors.brightYellow("[WARNING]", args.join(" ")));
    },
    info: function(...args) {
        console.log(colors.brightCyan("[INFO]", args.join(" ")));
    },
    error: function(...args) {
        console.log(colors.brightRed("[ERROR]", args.join(" ")));
    },
    fatal: function(...args) {
        Debugger.error(...args);
        process.exit();
    }
}
