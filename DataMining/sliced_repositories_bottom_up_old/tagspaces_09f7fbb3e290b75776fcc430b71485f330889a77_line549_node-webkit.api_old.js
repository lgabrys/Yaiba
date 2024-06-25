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
    renameDirectoryPromise(dirPath, newDirName).then(function() {
      TSCORE.hideWaitingDialog();
    });
  }
});
