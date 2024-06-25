define(function(require, exports, module) {
	var TSCORE = require("tscore");

	document.documentElement.addEventListener("addon-message1", function(event) {
	    console.debug("Message received in page script from content script: "); //+JSON.stringify(event.detail));
	    TSCORE.hideLoadingAnimation();
	    var message = event.detail;
	    switch (message.command) {
	        if(message.success) {
	            try {
	                console.debug("Loading settings...: "+JSON.stringify(message.content));
	            } catch (ex) {
	        } else {
	        if(message.success){
	            if(TSCORE.FileOpener.isFileOpened()) {
	            }
	        } else {
	    }
	}, false);
});
