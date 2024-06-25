var SqlString        = require('./protocol/SqlString');
var EventEmitter     = require('events').EventEmitter;
function Connection(options) {
  EventEmitter.call(this);
}
Connection.prototype.connect = function(cb) {
  if (!this._connectCalled) {
    this._connectCalled = true;
  }
};
Connection.prototype.changeUser = function(options, cb){
  this._implyConnect();
  if (typeof options === 'function') {
    cb      = options;
    options = {};
  }
};
Connection.prototype.query = function(sql, values, cb) {
  this._implyConnect();
  var options = {};
  if (typeof sql === 'object') {
    options = sql;
    cb      = values;
    values  = options.values;
  } else if (typeof values === 'function') {
    cb          = values;
    options.sql = sql;
    values      = undefined;
  } else {
    options.sql    = sql;
    options.values = values;
  }
  options.sql = this.format(options.sql, values || []);
  if (!('typeCast' in options)) {
    options.typeCast = this.config.typeCast;
  }
};
Connection.prototype.end = function(cb) {
  this._implyConnect();
};
Connection.prototype.destroy = function() {
  this._implyConnect();
};
Connection.prototype.pause = function() {
  this._socket.pause();
};
Connection.prototype.resume = function() {
  this._socket.resume();
};
Connection.prototype.escape = function(value) {
  return SqlString.escape(value, false, this.config.timezone);
};
