define(function(require, exports, module) {
  var TSCORE = require("tscore");
  function initMainMenu() {
    var template = [
      {
        submenu: [
          {
            click: function() {
              } else {
                TSCORE.showCreateDirectoryDialog(TSCORE.currentPath);
              }
            }
          },
        ]
      },
    ];
  }
});
