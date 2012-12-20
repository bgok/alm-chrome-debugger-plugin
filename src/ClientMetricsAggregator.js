(function() {
	var Ext = window.Ext4 || window.Ext;

	debugger;

	if (!!Rally.clientmetrics.ClientMetricsAggregatorInstance) {
		// Class to capture clientMetrics Events
		Ext.define("Rally.bookmarklet.CapturingBatchSender", {
			extend: "Rally.clientmetrics.BatchSender",
			constructor: function(config) {
		        this.callParent(arguments);
		        this._capturedEvents = [];
		        this.handler = config.handler || Ext.emptyFn;
		        this.handlerScope = config.scope;
		    },
		    send: function(events, options) {
		        var sentEvents = events || [];
		        Ext.Array.each(sentEvents, function(sentEvent) {
		            // this._capturedEvents.push(Ext.apply({}, sentEvent));
		            console.log(sentEvent);
		        }, this);
		        this._sendCaptured();
		        this.callParent(arguments);
		    },
		    clear: function() {
		        this._capturedEvents = [];
		        this._sendCaptured();
		    },
		    _sendCaptured: function() {
		        var events = [];
		        Ext.Array.each(this._capturedEvents, function(event) {
		            var clonedEvent = Ext.apply({}, event);
		            events.push(clonedEvent);
		        });
		        this._cleanEvents(events);
		        this.handler.call(this.handlerScope, events);
	        }
	    });

	    Rally.clientmetrics.ClientMetricsAggregatorInstance.sender = Ext.create("Rally.bookmarklet.CapturingBatchSender", {
	    	keysToIgnore: ["cmp"],
	    	minLength: 1700,
	    	maxLength: 2000,
	    	handler: this._onEventsCaptured,
	    	scope: this
	   	});
	}
})();