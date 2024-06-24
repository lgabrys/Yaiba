define(function(require, exports, module) {
	exports.id = "editorODF"; // ID should be equal to the directory name where the ext. is located
	exports.title = "ODF Viewer/Editor";
	exports.type = "editor";
	exports.supportedFileTypes = [ "odt", "ods" ];
	var TSCORE = require("tscore");
	var extensionDirectory = TSCORE.Config.getExtensionPath()+"/"+exports.id;
	exports.init = function(filePath, elementID) {
        var extPath = extensionDirectory+"/index.html";
        $('#'+elementID).append($('<iframe>', {
            id: "iframeViewer",
            src: extPath+"?cp="+filePath
        }));
	};
});
