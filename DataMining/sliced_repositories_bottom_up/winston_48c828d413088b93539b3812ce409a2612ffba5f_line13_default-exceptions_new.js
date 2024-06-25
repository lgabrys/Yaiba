var path = require('path'),
    winston = require('../../../lib/winston');
winston.exceptions.handle([
  new winston.transports.File({
    filename: path.join(__dirname, '..', '..', 'fixtures', 'logs', 'default-exception.log'),
    handleExceptions: true
  })
]);
