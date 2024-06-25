define(function(require, exports, module) {
  var TSCORE = require('tscore');
  exports.createDirectoryTree = function(directoryTree) {
  };
  exports.renameFile = function(oldFilePath, newFilePath) {
  };
  exports.loadTextFile = function(content) {
  };
  exports.saveTextFile = function(filePath, isNewFile) {
  };
  exports.listDirectory = function(anotatedDirList) {
  };
  exports.listSubDirectories = function(dirList, dirPath) {
    TSCORE.subfoldersDirBrowser = dirList;
  };
  exports.errorOpeningPath = function(dirPath) {
  };
  exports.deleteElement = function(filePath) {
    TSCORE.Meta.updateMetaData(filePath);
  };
});
