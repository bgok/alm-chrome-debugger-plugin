// Setup the ability to write logs to the console
var log = function(message) {
	chrome.devtools.inspectedWindow.eval('console.log(\'Rally: ' + message + '\')');
};
	
$(function() {
	log('start of log');
	log('inspected window id: ' + chrome.devtools.inspectedWindow.tabId);
});

