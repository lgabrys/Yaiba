define(function(require, exports, module) {
	var TSCORE = require("tscore");
	exports.init = function(filePath, containerElementID) {
        var fileExt = TSCORE.TagUtils.extractFileExtension(filePath);
        if(fileExt.indexOf("htm") == 0 || fileExt.indexOf("xhtm") == 0 || fileExt.indexOf("txt") == 0) {
        } else {
	};
});
