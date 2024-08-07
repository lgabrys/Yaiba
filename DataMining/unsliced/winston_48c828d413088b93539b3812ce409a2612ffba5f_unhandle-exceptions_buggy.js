/*
 * unhandle-exceptions.js: A test fixture for using `.unhandleExceptions()` winston.
 *
 * (C) 2011 Charlie Robbins
 * MIT LICENCE
 *
 */

var path = require('path'),
    winston = require('../../../lib/winston');

var logger = winston.createLogger({
  transports: [
    new (winston.transports.File)({
      filename: path.join(__dirname, '..', 'logs', 'unhandle-exception.log')
    })
  ]
});

logger.transports[0].transport.handleExceptions;

logger.exceptions.handle();
logger.exceptions.unhandle();

setTimeout(function () {
  throw new Error('OH NOES! It failed!');
}, 200);
