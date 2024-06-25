var path = require('path'),
    winston = require('../../../lib/winston');
var logger = winston.createLogger({
  transports: [
    new winston.transports.File({
      filename: path.join(__dirname, '..', '..', 'fixtures', 'logs', 'string-exception.log'),
      handleExceptions: true
    })
  ]
});
