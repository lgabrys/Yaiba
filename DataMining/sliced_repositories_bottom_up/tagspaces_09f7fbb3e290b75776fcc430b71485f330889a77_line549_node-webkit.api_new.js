define(function(require, exports, module) {
  var TSCORE = require("tscore");
  function listDirectory(dirPath, readyCallback) {
  }
  function getDirectoryMetaInformation(dirPath, readyCallback) {
    listDirectory(dirPath, function(anotatedDirList) {
      TSCORE.metaFileList = anotatedDirList;
    });
  }
  function renameDirectoryPromise(dirPath, newDirPath) {
    return new Promise(function(resolve, reject) {
    });
  }
  function renameDirectory(dirPath, newDirName) {
    var newDirPath = TSCORE.TagUtils.extractParentDirectoryPath(dirPath) + TSCORE.dirSeparator + newDirName;
    renameDirectoryPromise(dirPath, newDirPath).then(function() {
      TSCORE.hideWaitingDialog();
    });
  }
});
