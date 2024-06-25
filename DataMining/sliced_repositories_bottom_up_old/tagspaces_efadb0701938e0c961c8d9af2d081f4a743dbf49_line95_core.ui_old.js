define(function(require, exports, module) {
	var TSCORE = require("tscore");
    var showFileDeleteDialog = function(filePath) {
        TSCORE.showConfirmDialog(
            function() {
                TSCORE.IO.deleteElement(TSCORE.selectedFiles[0]);
            }
        );
    };
});
