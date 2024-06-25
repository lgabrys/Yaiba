    vows = require('vows'),
var winston = require('winston');
vows.describe('winton/logger').addBatch({
  "The winston logger": {
    "the logger() method": {
      topic: function () {
       return new (winston.Logger)({transports: {"Console": {level: 2}}});
      },
    }
  }
}).addBatch({
