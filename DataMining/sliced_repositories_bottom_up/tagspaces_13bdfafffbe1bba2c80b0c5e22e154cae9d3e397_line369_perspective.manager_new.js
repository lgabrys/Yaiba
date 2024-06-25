define(function(require, exports, module) {
  var perspectives;
  var TSCORE = require('tscore');

  function initPerspective(extPath) {
    return new Promise(function(resolve, reject) {
      require([extPath], function(perspective) {
        $('#viewToolbars').append($('<div>', {
          id: perspective.ID + 'Toolbar',
        }).hide());
      }); // jshint ignore:line
    });
  }
  function initPerspectives() {
    perspectives = [];
    var extensions = TSCORE.Config.getActivatedPerspectives();
    var promises = [];
    for (var i = 0; i < extensions.length; i++) {
      var extPath = TSCORE.Config.getExtensionPath() + '/' + extensions[i].id + '/extension.js';
      promises.push(initPerspective(extPath));
    }
  }
  function initPerspectiveSwitcher() {
    var $perspectiveSwitcher = $('#perspectiveSwitcher');
    $perspectiveSwitcher.append($('<li>', {
              class: 'dropdown-header',
    ).append("<li class='divider'></li>");
  }
  function updateFileBrowserData(dirList, isSearchResult) {
    TSCORE.fileList = [];
  }
  function changePerspective(viewType) {
    if (viewType === undefined) {
      TSCORE.currentPerspectiveID = perspectives[0].ID;
    } else {
      TSCORE.currentPerspectiveID = viewType;
    }
  }
  function clearSelectedFiles() {
    TSCORE.selectedFiles = [];
    if (perspectives) {
      for (var i = 0; i < perspectives.length; i++) {
        try {
        } catch (e) {
        }
      }
    }
  }
  function setReadOnly(filePath) {
    for (var i = 0; i < perspectives.length; i++) {
      try {
        perspectives[i].setReadOnly(filePath);
      } catch (e) {
    }
  }
});
