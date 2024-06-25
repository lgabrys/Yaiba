
    path = require('path'),
    vows = require('vows'),
function assertTimestamp (basename, options) {
  var filename = path.join(__dirname, 'fixtures', 'logs', basename + '.log');
  return {
    topic: function () {
      options.filename = filename;
    },
  }
}
vows.describe('winston/transport/timestamp').addBatch({
  "When timestamp option is used": {
    "with file transport": {
      "with value set to true ": assertTimestamp('defaultTimestamp', {
        pattern: /^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}\.\d{3}Z/,
      }),
    }
  }
}).export(module);
