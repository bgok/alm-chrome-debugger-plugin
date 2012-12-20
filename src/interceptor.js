
/*
	This code is injected into the Rally page, so it has access to all of the resources on that page
*/
console.log("injecting interceptor");

(function() {
	function intercept(parent, method, interceptor) {
		if (!!parent && !!parent[method]) {
			var original = parent[method];	
			parent[method] = function() {
				interceptor.call(parent, arguments);
				original.call(parent, arguments);
			}
		} else {
			console.error("Can't find the method to be intercepted");
		}
	}

	intercept(Rally.bookmarklet.BatchSender, "send", function(events, options) {
        var sentEvents = events || [];
        Ext.Array.each(sentEvents, function(sentEvent) {
            console.log(sentEvent);
        });
	})


	console.log("interceptor injected");

})();
