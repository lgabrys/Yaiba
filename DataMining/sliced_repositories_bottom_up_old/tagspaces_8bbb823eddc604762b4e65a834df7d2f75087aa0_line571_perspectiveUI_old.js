define(function(require, exports, module) {
    var TSCORE = require("tscore");
    function ExtUI(extID) {
        this.showTags = true;
    }
    ExtUI.prototype.buildUI = function(toolbarTemplate) {
        $("#"+this.extensionID+"ToogleSelectAll")
            .click(function() {
                if($(this).find("i").hasClass("fa-square-o")) {
                    TSCORE.selectedFiles = [];
                } else {
            });

        this.viewContainer.on("contextmenu click", ".fileTitleButton", function (e) {
            TSCORE.hideAllDropDownMenus();
        });
        this.fileTable = $('#'+this.extensionID+"FileTable").dataTable( {
            "aoColumns": [
                { "sTitle": "Tags", "sClass": "fileTitle"  },
            ],
            "aaSorting": [[ 1, "asc" ]],    // softing by filename
        } );
    };
    ExtUI.prototype.reInit = function() {
            //.on('click', function(e) { e.preventDefault(); return false; })
            .draggable({
                "start":    function() {
                    TSCORE.selectedTag = $(this).attr("tag");
                    }
            });
    };
    ExtUI.prototype.buttonizeTitle = function(title, filePath, fileExt, isSelected) {
        if(title.length < 1) {
            title = filePath;
        }
    };
    ExtUI.prototype.clearSelectedFiles = function() {
        TSCORE.selectedFiles = [];
    };
    ExtUI.prototype.selectFile = function(uiElement, filePath) {
    };
    ExtUI.prototype.switchThumbnailSize = function() {
    };
    ExtUI.prototype.toggleFileDetails = function() {
    };
    ExtUI.prototype.enableThumbnails = function() {
    };
    ExtUI.prototype.disableThumbnails = function() {
    };
    ExtUI.prototype.refreshThumbnails = function() {
    };
    ExtUI.prototype.toggleThumbnails = function() {
    };
    ExtUI.prototype.toggleTags = function() {
    };
    ExtUI.prototype.handleElementActivation = function() {
    };
    ExtUI.prototype.removeFileUI = function(filePath) {
        TSCORE.selectedFiles.splice(TSCORE.selectedFiles.indexOf(oldFilePath), 1);
    };
});
