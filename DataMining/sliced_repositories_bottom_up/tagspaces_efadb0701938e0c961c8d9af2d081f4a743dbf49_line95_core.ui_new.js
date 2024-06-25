define(function(require, exports, module) {
	var TSCORE = require("tscore");
    var showFileRenameDialog = function(filePath) {
        $( '#dialogFileRename' ).modal({show: true});
    };
    var showFileDeleteDialog = function(filePath) {
        TSCORE.showConfirmDialog(
            "Delete File(s)",
            "The file \""+filePath+"\" will be permanently deleted and cannot be recovered. Are you sure?",
            function() {
                TSCORE.IO.deleteElement(filePath);
            }
        );
    };
});
