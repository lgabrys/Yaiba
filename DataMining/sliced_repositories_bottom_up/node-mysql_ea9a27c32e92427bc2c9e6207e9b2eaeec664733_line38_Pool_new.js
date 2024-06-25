var EventEmitter   = require('events').EventEmitter;
var PoolConnection = require('./PoolConnection');
function Pool(options) {
  EventEmitter.call(this);
}
Pool.prototype.getConnection = function (cb) {

  if (this._closed) {
    return process.nextTick(function(){
      return cb(new Error('Pool is closed.'));
    });
  }
  var connection;
  if (this._freeConnections.length > 0) {
    connection = this._freeConnections.shift();
  }
  if (this.config.connectionLimit === 0 || this._allConnections.length < this.config.connectionLimit) {
    connection = new PoolConnection(this, { config: this.config.newConnectionConfig() });
  }
};
