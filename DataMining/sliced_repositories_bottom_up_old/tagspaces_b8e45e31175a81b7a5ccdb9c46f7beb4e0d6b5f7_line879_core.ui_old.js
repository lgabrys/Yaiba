define(function(require, exports, module) {
  var TSCORE = require('tscore');
  var TSPOSTIO = require("tspostioapi");
  var showWaitingDialog = function(message, title) {
    if (!title) {
      title = $.i18n.t('ns.dialogs:titleWaiting');
    }
    if (!message) {
      message = 'No Message to Display.';
    }
  };
  var showDirectoryBrowserDialog = function(path) {
    require([
    ], function(uiTPL, controller) {
      TSCORE.directoryBrowser = controller;
    });
  };
  var initUI = function() {
      }).keyup(function(e) {
        } else {
          TSCORE.Search.nextQuery = this.value;
        }
        if (this.value.length === 0) {
          TSCORE.Search.nextQuery = this.value;
        }
      }).blur(function() {
  };
  function clearSearchFilter() {
    TSCORE.Search.nextQuery = '';
  }
  function createNewTextFile(filePath, content) {
   TSCORE.IO.saveFilePromise(filePath, content).then(function() {
      TSPOSTIO.saveTextFile(filePath, isNewFile);
    });
  }
});
