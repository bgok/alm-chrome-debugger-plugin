chrome.devtools.panels.create(
    "Client Metrics",
    'icons/rally-24-24.png',
    'ClientMetricsTree/panel.html',
    function(panel){
        var _port, _log;

        panel.onShown.addListener(function(win) {
            _log = win.log;

            _port = chrome.extension.connect({
                name: "ClientMetricsTree"
            });

            _port.onMessage.addListener(function(message, sender, responder) {
                if (message.type === "CLIENT_METRICS_EVENT") {
                    console.log(message.evt);
                    _log(message.evt);
                }
            });

        });

        panel.onHidden.addListener(function() {
            _port.disconnect();
            _port = undefined;
            _log = undefined;
        });
    }
);
