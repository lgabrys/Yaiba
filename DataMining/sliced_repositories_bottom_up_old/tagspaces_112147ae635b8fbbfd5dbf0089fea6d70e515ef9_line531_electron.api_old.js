const fs = require('fs-extra'); // jshint ignore:line
define(function(require, exports, module) {
  function renameFilePromise(filePath, newFilePath) {
    return new Promise(function(resolve, reject) {
      fs.move(filePath, newFilePath, function(error) {
      });
    });
  }
});
