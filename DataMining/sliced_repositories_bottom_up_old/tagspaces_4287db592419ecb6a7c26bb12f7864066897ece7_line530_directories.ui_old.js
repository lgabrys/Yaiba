define(function(require, exports, module) {
  var TSCORE = require('tscore');
  var tsExtManager = require('tsextmanager');

  function openLocation(path) {
    TSCORE.currentLocationObject = TSCORE.Config.getLocation(path);
  }
  function navigateToDirectory(directoryPath) {
    var indexOfDots = directoryPath.indexOf("/..");
    if (indexOfDots === (directoryPath.length - 3)) {
      directoryPath = TSCORE.TagUtils.extractParentDirectoryPath(directoryPath.substring(0, indexOfDots));
    }
    if (directoryPath.lastIndexOf('/') + 1 === directoryPath.length || directoryPath.lastIndexOf('\\') + 1 === directoryPath.length) {
      directoryPath = directoryPath.substring(0, directoryPath.length - 1);
    }
    if (directoryPath.lastIndexOf('\\\\') + 1 === directoryPath.length) {
      directoryPath = directoryPath.substring(0, directoryPath.length - 2);
    }
    TSCORE.currentPath = directoryPath;

    TSCORE.Meta.getDirectoryMetaInformation().then(function(dirList) {
      TSCORE.metaFileList = dirList;
    }).catch(function(error) {
      TSCORE.metaFileList = undefined;
    });
  }
  function listDirectory(dirPath) {
    TSCORE.showLoadingAnimation();
    if (TSCORE.PRO && TSCORE.Config.getEnableMetaData()) {
      TSCORE.Meta.createMetaFolder(dirPath);
    }
  }
});
