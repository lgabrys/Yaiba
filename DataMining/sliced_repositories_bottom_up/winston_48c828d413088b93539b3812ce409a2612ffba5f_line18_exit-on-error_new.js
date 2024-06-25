var path = require('path'),
    winston = require('../../../lib/winston');
winston.exitOnError = function (err) {
  process.stdout.write(err.message);
};
winston.handleExceptions([
  new winston.transports.File({
    filename: path.join(__dirname, '..', 'logs', 'exit-on-error.log'),
    handleExceptions: true
  })
]);
