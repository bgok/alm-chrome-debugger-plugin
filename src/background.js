(function() {

    var buffer = [];
    var port;

    // Message pass through here so the they can be buffered for the times that the devtools tab isn't active
    chrome.extension.onMessage.addListener(function(message, sender, sendResponse) {
        if (message.type === "CLIENT_METRICS_EVENT") {
            console.log(message);
            if (port) {
                port.postMessage(message);
            } else {
                buffer.push(message);
            }
        }
    });
    chrome.extension.onConnect.addListener(function(p){
        console.log("connected to background.js");
        console.log(p);
        if (!port)
            port = p;
        // check for messages in the buffer
    });
})();