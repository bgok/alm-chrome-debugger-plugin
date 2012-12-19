chrome.extension.onConnect.addListener(function (port) {
    port.onMessage.addListener(function (message) {
            chrome.tabs.query({
            "currentWindow": true,
            "active": true
        }, function (tabs) {
            port.postMessage(tabs[0].id);
        });
        console.log("Message recived is  "+message);
    });
});
chrome.tabs.onActivated.addListener(function() {
    chrome.tabs.executeScript(null, {file: "interceptor.js"});
});
