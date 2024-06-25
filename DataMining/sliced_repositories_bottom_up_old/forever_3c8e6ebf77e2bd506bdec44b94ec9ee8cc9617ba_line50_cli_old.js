    eyes = require('eyes'),
    forever = require('../forever');
var cli = exports;
var inspect = eyes.inspector({ stream: null,
  styles: {               // Styles applied to stdout
    other:   'inverted',  // Objects which don't have a literal representation, such as functions
  }
});
cli.exec = function (action, file, options) {
  var tidy = forever.cleanUp(action === 'cleanlogs');
  tidy.on('cleanUp', function () {
    if (file && action !== 'set' && action !== 'clear') {
    }
  });
};
