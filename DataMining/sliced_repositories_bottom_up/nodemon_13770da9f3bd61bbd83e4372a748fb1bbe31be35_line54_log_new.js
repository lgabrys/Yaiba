'use strict';
var util = require('util'),
    colour = require('./colour'),
    bus = require('./bus'),
    required = false;

var coding = {
  log: 'black',
  info: 'yellow',
  status: 'green',
  detail: 'yellow',
  fail: 'red',
  error: 'red'
};
function log(type, text) {
  var msg = colour(coding[type], '[nodemon] ' + (text||''));
  } else if (type === 'error') {
    util.error(msg);
  } else {
}
var Logger = function (r) {
  if (!(this instanceof Logger)) {
    return new Logger(r);
  }
};
Object.keys(coding).forEach(function (type) {
  Logger.prototype[type] = log.bind(null, type);
});

Logger.prototype.detail = function (msg) {
  if (this.debug) {
    log('detail', msg);
  }
};
Logger.prototype.required = function (val) {
  required = val;
};
Logger.prototype.debug = false;
Logger.prototype._log = function (type, msg) {
  if (required) {
    bus.emit('log', { type: type, message: msg || '', colour: msg || '' });
  } else if (type === 'error') {
};
