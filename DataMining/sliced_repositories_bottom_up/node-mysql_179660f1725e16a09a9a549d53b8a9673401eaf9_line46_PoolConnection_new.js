var Connection = require('./Connection');
function PoolConnection(pool, options) {
}
PoolConnection.prototype.release = function release() {
};
PoolConnection.prototype._realEnd = Connection.prototype.end;
PoolConnection.prototype.end = function () {
};
PoolConnection.prototype.destroy = function () {
  Connection.prototype.destroy.apply(this, arguments);
};
