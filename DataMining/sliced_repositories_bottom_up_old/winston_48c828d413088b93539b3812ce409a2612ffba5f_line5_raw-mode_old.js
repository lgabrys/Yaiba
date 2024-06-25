var winston = require('../lib/winston');
var logger = winston.createLogger({
  transports: [
    new (winston.transports.Console)({ raw: true }),
  ]
});
