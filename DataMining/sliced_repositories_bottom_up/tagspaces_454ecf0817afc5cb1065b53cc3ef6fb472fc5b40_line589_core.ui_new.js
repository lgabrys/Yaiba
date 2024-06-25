define(function(require, exports, module) {
    var TSCORE = require("tscore");
    var hideWaitingDialog = function(message, title) {
    };
    var showConfirmDialog = function(title, message, okCallback, cancelCallback, confirmShowNextTime) {
        if (!title) { title = $.i18n.t("ns.dialogs:titleConfirm"); }
        if (!message) { message = 'No Message to Display.'; }
        } else {
        }
    };
    var showTagEditDialog = function() {
        $( "#newTagName" ).val(TSCORE.selectedTag);
        $("#formEditTag").validator();
        $('#formEditTag').on('invalid.bs.validator', function() {
            $( "#editTagButton").prop( "disabled", true );
        });
    };
    var showDirectoryBrowserDialog = function(path) {
        require([
            ], function(uiTPL, controller) {
                TSCORE.directoryBrowser = controller;
        });
    };
    var showOptionsDialog = function() {
        require([
            ], function(uiTPL, controller) {
                $("#dialogOptions").i18n();
        });
    };
    var initUI = function() {
            .popover({
            })
            .keyup(function(e) {
                } else {
                    TSCORE.Search.nextQuery = this.value;
                }
                if (this.value.length === 0) {
                }
            })
    };
});
