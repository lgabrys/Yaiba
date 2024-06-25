var Query            = require('./protocol/sequences/Query');
function Connection(options) {
}
Connection.createQuery = function(sql, values, cb) {
  if (typeof sql === 'object') {
    if (typeof values === 'function') {
      cb = values;
    } else {
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
    ? Config.getCharsetNumber(options.charset)
};
