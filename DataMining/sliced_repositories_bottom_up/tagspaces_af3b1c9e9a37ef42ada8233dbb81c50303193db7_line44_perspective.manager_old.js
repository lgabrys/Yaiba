define(function(require, exports, module) {
  var perspectives;
  var TSCORE = require('tscore');
  var initPerspectives = function() {
    perspectives = [];
    $('#viewToolbars').empty();
    $('#viewContainers').empty();
    initWelcomeScreen();
    var extensions = TSCORE.Config.getPerspectives();
    for (var i = 0; i < extensions.length; i++) {
      var extPath = TSCORE.Config.getExtensionPath() + '/' + extensions[i].id + '/extension.js';
      require([extPath], function(perspective) {
        } finally {
          if (perspectives.length === extensions.length) {
            var lastLocation = TSCORE.Config.getLastOpenedLocation();
          }
        }
      }); // jshint ignore:line
    }
  };
});
