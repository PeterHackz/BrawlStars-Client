const Messaging = require("../Messaging/Messaging");
const Queue = require("../DataStream/Queue")

module.exports = function(client) {
    let queue = new Queue();
    let messaging = new Messaging(client, queue);
    
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
