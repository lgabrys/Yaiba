
var assert = require('assert'),
    vows = require('vows'),
    winston = require('../lib/winston');

/* Custom logging function */
function myPrettyPrint(obj) {
  return JSON.stringify(obj)
    .replace(/\{/g, '< wow ')
    .replace(/\:/g, ' such ')
    .replace(/\}/g, ' >');
}

vows.describe('winston/transport/prettyPrint').addBatch({
  "When pretty option is used": {
    "with memory transport": {
      topic: function () {
        var transport = new winston.transports.Memory({prettyPrint: myPrettyPrint});
      },
    }
  }
}).export(module);
