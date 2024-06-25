define(function(require, exports, module) {
  var TSCORE = require("tscore");
  function getPropertiesPromise(path) {
  }
  function saveFilePromise(filePath, content, overwrite) {
    return new Promise(function(resolve, reject) {
      getPropertiesPromise(filePath).then(function(entry) {
        overwrite = overwrite || true;
      });
    });
  }
  function saveTextFilePromise(filePath, content, overwrite) {
    var UTF8_BOM = "\ufeff";
    if (content.indexOf(UTF8_BOM) === 0) {
    } else {
      content = UTF8_BOM + content;
    }
  }
  function saveBinaryFilePromise(filePath, content, overwrite) {
    var buff = TSCORE.Utils.arrayBufferToBuffer(content);
    return saveFilePromise(filePath, buff, overwrite);
  }
});
