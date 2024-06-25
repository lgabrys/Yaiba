define(function(require, exports, module) {
	var TSCORE = require("tscore");

	var plugin = document.createElement("embed");
	plugin.style.position = "absolute";
	plugin.style.left = "-9999px";
	exports.createDirectory = function(dirPath) {
	}
	exports.loadTextFile = function(filePath) {
	}
	exports.renameFile = function(filePath, newFilePath) {
		if(plugin.fileExists(newFilePath)) {
		} else {
			if(plugin.fileExists(filePath)) {
	            if(TSCORE.FileOpener.isFileOpened) {
	            }
			} else {
		}
	}
});
