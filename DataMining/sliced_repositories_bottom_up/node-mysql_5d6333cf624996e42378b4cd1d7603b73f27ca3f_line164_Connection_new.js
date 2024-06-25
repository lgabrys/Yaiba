var SqlString        = require('./protocol/SqlString');
var Query            = require('./protocol/sequences/Query');
function Connection(options) {
}
function bindToCurrentDomain(cb) {
  var domain = process.domain;
}
Connection.createQuery = function(sql, values, cb) {
  if (typeof sql === 'object') {
    if (typeof values === 'function') {
      cb = values;
    } else if (typeof values !== 'undefined') {
  } else if (typeof values === 'function') {
    cb             = values;
  } else {
};
Connection.prototype.connect = function(cb) {
};
Connection.prototype.changeUser = function(options, cb){
  cb = cb || function() {};
  if (typeof options === 'function') {
    cb      = options;
    options = {};
  }
};
Connection.prototype.beginTransaction = function(cb) {
  var query = Connection.createQuery('START TRANSACTION', cb);
  query._connection = this;
};
Connection.prototype.commit = function(cb) {
  var query = Connection.createQuery('COMMIT', cb);
  query._connection = this;
};
Connection.prototype.rollback = function(cb) {
  var query = Connection.createQuery('ROLLBACK', cb);
  query._connection = this;
};
Connection.prototype.query = function(sql, values, cb) {
  var query = Connection.createQuery(sql, values, cb);
  query._connection = this;
  if (!(typeof sql == 'object' && 'typeCast' in sql)) {
    query.typeCast = this.config.typeCast;
  }
  query.sql = this.format(query.sql, query.values);
};
