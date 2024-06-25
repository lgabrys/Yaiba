/* Copyright (c) 2012-2015 The TagSpaces Authors. All rights reserved.
 * Use of this source code is governed by a AGPL3 license that
 * can be found in the LICENSE file. */


define(function(require, exports, module) {
  var TSCORE = require("tscore");
  var fsRoot;
  var widgetAction;
  document.addEventListener("initApp", onApplicationLoad, false);
  handleOpenURL = function(url) {
    var fileName = url.substring(url.lastIndexOf('/') + 1, url.length);
    TSCORE.showConfirmDialog("File copied", "File " + fileName + " is copied in inbox folder. Would you like to open it ?", function() {
    });
  };
  function onDeviceReady() {
    document.addEventListener("backbutton", function(e) {
    }, false);

    if (isCordovaiOS) {
      window.plugins = window.plugins || {};
      // https://build.phonegap.com/plugins/1117
      window.plugins.fileOpener = cordova.plugins.fileOpener2;
    }
    if (window.plugins.webintent) {
      window.plugins.webintent.getUri(
        function(url) {
          if ("createTXTFile" === url || url.indexOf("TagSpaces") > 0) {
            widgetAction = url;
          } else {
        }
      );
      window.plugins.webintent.onNewIntent(function(url) {
        widgetAction = url;
      });
    }
    if (isCordovaiOS) {
      setTimeout(function() {
      }, 1000);
    }
  }
  function widgetActionHandler() {
    if (widgetAction === "createTXTFile") {
      TSCORE.createTXTFile();
    } else {
      var fileName = widgetAction.substring(widgetAction.lastIndexOf('/'), widgetAction.length);
      var newFileName = TSCORE.currentPath + fileName;
      var newFileFullPath = fsRoot.nativeURL + "/" + newFileName;
    }
  }
});
