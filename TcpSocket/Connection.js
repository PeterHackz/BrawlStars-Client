var {
    Queue,
    Messaging
} = require("../Messaging/Messaging");

module.exports = function(client) {
    var queue = new Queue();
    var messaging = new Messaging(client, queue);
    
    messaging.sendPepperAuthentication();
    
    client.on("data", data => {
        queue.add(data);
        while (messaging.pendingJob()) {
            messaging.update();
        }
    });
    client.on("close",
        () => {
            Debugger.info("connection closed");
        });
}
