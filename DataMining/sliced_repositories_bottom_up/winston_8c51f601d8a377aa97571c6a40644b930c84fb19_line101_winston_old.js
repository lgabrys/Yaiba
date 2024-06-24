const logform = require('logform');
const winston = exports;

winston.version = require('../package.json').version;
/**
 * Include transports defined by default by winston
 * @type {Array}
 */
winston.transports = require('./winston/transports');
/**
 * Expose utility methods
 * @type {Object}
 */

winston.config = require('./winston/config');

winston.addColors = logform.levels;
winston.format = logform.format;
winston.createLogger = require('./winston/create-logger');
winston.ExceptionHandler = require('./winston/exception-handler');
winston.Container = require('./winston/container');
winston.Transport = require('winston-transport');
winston.loggers = new winston.Container();
const defaultLogger = winston.createLogger();
Object.keys(winston.config.npm.levels).concat([
  'log',
  'query',
  'stream',
  'add',
  'remove',
  'clear',
  'profile',
  'startTimer',
  'handleExceptions',
  'unhandleExceptions',
  'configure'
]).forEach(method => (
  winston[method] = args => defaultLogger[method](...args)
));
