define(function(require, exports, module) {
  exports.id = "editorText"; // ID should be equal to the directory name where the ext. is located
  exports.title = "Text Editor based on codemirror";
  exports.type = "editor";
  exports.supportedFileTypes = [
  ];
  exports.init = function(filePath, containerElementID, isViewerMode) {
    var fileExt = filePath.substring(filePath.lastIndexOf(".") + 1, filePath.length).toLowerCase();
    var mode = filetype[fileExt];
    if (!mode) {
    }
  };
});
