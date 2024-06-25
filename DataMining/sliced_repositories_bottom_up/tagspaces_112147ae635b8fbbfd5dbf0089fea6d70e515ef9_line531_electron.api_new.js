
const fs = require('fs-extra'); // jshint ignore:line
define(function(require, exports, module) {
  "use strict";
  var TSCORE = require("tscore");
  function initMainMenu() {

  }
  function renameFilePromise(filePath, newFilePath) {
    return new Promise(function(resolve, reject) {
      if (fs.lstatSync(filePath).isDirectory()) {
        reject($.i18n.t("ns.common:fileIsDirectory", {fileName:filePath}));
      }
      if (fs.existsSync(newFilePath)) {
        reject($.i18n.t("ns.common:fileExists", {fileName:newFilePath}), $.i18n.t("ns.common:fileRenameFailed"));
      }
      fs.move(filePath, newFilePath, {clobber:true}, function(error) {
      });
    });
  }
});
