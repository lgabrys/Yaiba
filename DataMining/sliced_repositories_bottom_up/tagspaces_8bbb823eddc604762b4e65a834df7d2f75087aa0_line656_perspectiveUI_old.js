define(function(require, exports, module) {
    var TSCORE = require("tscore");
    function ExtUI(extID) {
        this.currentGrouping = ""; // tagchain, day, month, year
    }
    ExtUI.prototype.createFileTile = function(title, filePath, fileExt, fileTags, isSelected) {
    };
    ExtUI.prototype.initFileGroupingMenu = function () {
    };
    ExtUI.prototype.buildUI = function(toolbarTemplate) {
        $("#"+this.extensionID+"ToogleSelectAll")
            .click(function() {
                var checkIcon = $(this).find("i");
                if(checkIcon.hasClass("fa-square-o")) {
                    TSCORE.selectedFiles = [];
                } else {
            });
    };
    ExtUI.prototype.switchThumbnailSize = function() {
    };
    ExtUI.prototype.enableThumbnails = function() {
    };
    ExtUI.prototype.disableThumbnails = function() {
    };
    ExtUI.prototype.refreshThumbnails = function() {
    };
    ExtUI.prototype.toggleThumbnails = function() {
    };
    ExtUI.prototype.switchGrouping = function(grouping) {
    };
    ExtUI.prototype.calculateGroupTitle = function(rawSource) {
    };
    ExtUI.prototype.calculateGrouping = function(data) {
        switch (this.currentGrouping){
            case "day": {
                data = _.groupBy( data, function(value){
                    });
            }
            case "month": {
                data = _.groupBy( data, function(value){
                    });
            }
            case "year": {
                data = _.groupBy( data, function(value){
                    });
            }
            default : {
                this.supportedGroupings.forEach(function(grouping) {
                    if(grouping.key === self.currentGrouping) {
                        data = _.groupBy( data, function(value) {
                            });
                    }
                });
                if(!grouped) {
                    data = _.groupBy( data, function(){
                    });
                }
            }
        }
        data = _.sortBy(data, function(value) {
            });
    };
    ExtUI.prototype.reInit = function() {
    };
    ExtUI.prototype.assingFileTileHandlers = function($fileTile) {
    };
    ExtUI.prototype.clearSelectedFiles = function() {
        TSCORE.selectedFiles = [];
    };
    ExtUI.prototype.selectFile = function(filePath) {
    };
    ExtUI.prototype.handleElementActivation = function() {
    };
    ExtUI.prototype.removeFileUI = function(filePath) {
        TSCORE.selectedFiles.splice(TSCORE.selectedFiles.indexOf(oldFilePath), 1);
    };
});
