var assert = require('assert'),
    vows = require('vows'),
vows.describe('forever/multiple-processes').addBatch({
  "When using forever": {
    "and spawning two processes using the same script": {
      topic: function () {
            output = ''

        that.child1.on('start', function () {
          function buildJson (data) {
            try {
              output += data;
            }
          }
        });
      },
      "should spawn both processes appropriately": function (err, data) {
        assert.lengthOf(data.monitors, 2);
      }
    }
  },
}).export(module);
