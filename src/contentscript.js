//var port = chrome.extension.connect({name: "CLIENT_METRICS_REPORTER"});

(function() {
	var hackityHack = function() {
		var Ext = window.Ext4 || window.Ext;

		// Class to capture clientMetrics Events
		Ext.define('Rally.debugger.CapturingBatchSender', {
			extend: 'Rally.clientmetrics.BatchSender',
			constructor: function(config) {
		        this.callParent(arguments);
		    },
		    send: function(events, options) {
		        var sentEvents = events || [];
		        Ext.Array.each(sentEvents, function(sentEvent) {
		           	var clone = {};

		           	Ext.Object.each(sentEvent, function(key, value) {	
		           		if ((typeof value !== "function") && (typeof value !== "object")) {
	           				clone[key] = value;
		           		}
		           	});	

		           	window.postMessage({
		            	type: "CLIENT_METRICS_EVENT", 
		            	evt: clone
		           	}, "*");
		        }, this);
		        this.callParent(arguments);
		    }
	    });
		
		if (!!Rally.clientmetrics.ClientMetricsAggregatorInstance) {
		    Rally.clientmetrics.ClientMetricsAggregatorInstance.sender = Ext.create('Rally.debugger.CapturingBatchSender', {
		    	keysToIgnore: ['cmp'],
		    	minLength: 1700,
		    	maxLength: 2000,
		    	scope: this
		   	});
		}
	};


	var script = document.createElement('script');
	script.appendChild(document.createTextNode('('+ hackityHack +')();'));
	(document.body || document.head || document.documentElement).appendChild(script);
})();

window.addEventListener("message", function(event) {
   // We only accept messages from ourselves
    if (event.source != window)
		return;

    if (event.data.type && (event.data.type == "CLIENT_METRICS_EVENT")) {
		chrome.extension.sendMessage(null, event.data);
    }
}, false);

