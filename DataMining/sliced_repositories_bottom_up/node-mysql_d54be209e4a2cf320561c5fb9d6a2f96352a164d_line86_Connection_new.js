var ConnectionConfig = require('./ConnectionConfig');
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
  cb = cb || function() {};
  if (typeof options === 'function') {
    cb      = options;
    options = {};
  }
    ? ConnectionConfig.getCharsetNumber(options.charset)
};
