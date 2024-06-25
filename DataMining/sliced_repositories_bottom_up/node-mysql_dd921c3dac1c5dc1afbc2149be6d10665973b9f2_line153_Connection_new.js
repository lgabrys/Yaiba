var SqlString        = require('./protocol/SqlString');
var Query            = require('./protocol/sequences/Query');
var EventEmitter     = require('events').EventEmitter;
function Connection(options) {
  EventEmitter.call(this);
}
Connection.createQuery = function(sql, values, cb) {
  if (sql instanceof Query) {
    return sql;
  }
  if (typeof sql === 'object') {
    if (typeof values === 'function') {
      cb = values;
    } else {
  } else if (typeof values === 'function') {
    cb             = values;
  } else {
};
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
  var query = Connection.createQuery(sql, values, cb);
  query._connection = this;
  if (!(typeof sql == 'object' && 'typeCast' in sql)) {
    query.typeCast = this.config.typeCast;
  }
  query.sql = this.format(query.sql, query.values || []);
};
Connection.prototype.ping = function(cb) {
  this._implyConnect();
};
Connection.prototype.statistics = function(cb) {
  this._implyConnect();
};
Connection.prototype.end = function(cb) {
  this._implyConnect();
};
Connection.prototype.destroy = function() {
  this.state = "disconnected";
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
Connection.prototype.format = function(sql, values) {
  if (typeof this.config.queryFormat == "function") {
    return this.config.queryFormat.call(this, sql, values, this.config.timezone);
  }
  return SqlString.format(sql, values, this.config.stringifyObjects, this.config.timezone);
};
