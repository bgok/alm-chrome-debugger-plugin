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
                //TODO Periodically clear the buffer so that it doesn't get ginormous when the panel isn't active.
                buffer.push(message);
            }
        }
    });
    chrome.extension.onConnect.addListener(function(p){
        console.log("connected to background.js");
        console.log(p);
        //FIXME This doesn't work very well. Needs a better approach to managing open ports.
        if (!port) {
            port = p;
        }
        _.each(buffer, function(msg) {
            port.postMessage(msg);
        });
        buffer = [];
    });
})();