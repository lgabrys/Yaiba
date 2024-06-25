
define(function(require, exports, module) {
  var TSCORE = require('tscore');
  function extractFileName(filePath) {
    return filePath.substring(filePath.lastIndexOf(TSCORE.dirSeparator) + 1, filePath.length);
  }
  function cleanTrailingDirSeparator(dirPath) {
    if (dirPath !== undefined) {
      } else if (dirPath.lastIndexOf('/') === dirPath.length - 1) {
      } else {
        return dirPath;
      }
    } else {
  }

  function extractTags(filePath) {
  }
  function removeTagsFromFile(filePath, tags) {
    var extractedTags = extractTags(filePath);
    if (TSCORE.PRO && TSCORE.Config.getWriteMetaToSidecarFile()) {
      var tagsInFileName;
      tags.forEach(function(tag) {
        if (extractedTags.indexOf(tag) >= 0) {
          tagsInFileName = true;
        } else {
          TSCORE.Meta.removeMetaTag(filePath, tag);
        }
      });
      if(tagsInFileName) {
         TSCORE.UI.showAlertDialog("Some of the tags are part from the file name and cannot be removed, try to rename the file manually.", $.i18n.t("ns.common:warning"));
      }
      TSCORE.PerspectiveManager.updateFileUI(filePath, filePath);
    } else {
      for (var i = 0; i < tags.length; i++) {
        if (extractedTags.indexOf(tags[i].trim()) < 0) {
          TSCORE.UI.showAlertDialog("The tag cannot be removed because it is not part of the file name.", $.i18n.t("ns.common:warning"));
        }
      }
    }
  }
});
