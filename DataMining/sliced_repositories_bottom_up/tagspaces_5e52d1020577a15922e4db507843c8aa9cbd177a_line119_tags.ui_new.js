define(function(require, exports, module) {
	var TSCORE = require("tscore");
	function initContextMenus() {
	    $( "#fileMenu" ).menu({
	        select: function( event, ui ) {
	            var commandName = ui.item.attr( "action" );
	            switch (commandName) {
	                TSCORE.IO.openDirectory(TSCORE.currentPath);
	            }
	        }
	    });
	}
});
