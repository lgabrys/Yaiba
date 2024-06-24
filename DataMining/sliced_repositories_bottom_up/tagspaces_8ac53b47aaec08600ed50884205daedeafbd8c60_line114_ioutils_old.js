define(function(require, exports, module) {
  'use strict';
  console.log('Loading ioutils.js ...');

  var TSCORE = require('tscore');
  function walkDirectory(path, options, fileCallback, dirCallback) {
    return TSCORE.IO.listDirectoryPromise(path, true).then(function(entries) {
      return Promise.all(entries.map(function(entry) {
        if (!options) {
          options = {};
          options.recursive = false;
        }
        if (entry.isFile) {
          if (fileCallback) {
          } else {
            return entry;
          }
        } else {
          if (dirCallback) {
          }
        }
      }));
    }).catch(function(err) {
  }
  function deleteFiles(filePathList) {
    var fileDeletionPromises = [];
    Promise.all(fileDeletionPromises).then(function(fList) {
      fList.forEach(function(filePath) {
        TSCORE.Meta.updateMetaData(filePath);
        TSCORE.PerspectiveManager.removeFileUI(filePath);
        if (filePath === TSCORE.FileOpener.getOpenedFilePath()) {
          TSCORE.FileOpener.closeFile(true);
        }
      });
      TSCORE.hideLoadingAnimation();
      TSCORE.showSuccessDialog("Files deleted successfully.");
    }, function(error) {
      TSCORE.hideLoadingAnimation();
      TSCORE.showAlertDialog("Deleting file " + filePath + " failed.");
      console.error("Deleting file " + filePath + " failed " + error);
    });
  }
});
