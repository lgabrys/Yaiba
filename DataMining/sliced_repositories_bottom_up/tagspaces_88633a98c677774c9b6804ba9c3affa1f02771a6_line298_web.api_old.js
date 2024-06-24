define(function(require, exports, module) {
  "use strict";

  // Activating browser specific exports modul
  //require("web/offlinelib/offline.min");

  function showLostConnectionDialog() {
    $('#dialogLostConnection').modal({
      backdrop: 'static',
      show: true,
    });
    $('#dialogLostConnection').draggable({
      handle: ".modal-header"
    });
  }

  var davClient;
  nl.sara.webdav.Client.prototype.getAjax = function(method, url, callback, headers) {
    if (headers === undefined) {
      headers = {};
    }
  };
  function connectDav() {
    var useHTTPS = false;
    if (location.href.indexOf("https") === 0) {
      useHTTPS = true;
    }
    davClient = new nl.sara.webdav.Client(location.hostname, useHTTPS, location.port);
  }
  function loadTextFilePromise(filePath) {
  }
  function getFileContentPromise(filePath, type) {
    console.log("getFileContent file: " + filePath);
    return new Promise(function(resolve, reject) {
      var ajax = davClient.getAjax("GET", filePath);
    });
  }
});
