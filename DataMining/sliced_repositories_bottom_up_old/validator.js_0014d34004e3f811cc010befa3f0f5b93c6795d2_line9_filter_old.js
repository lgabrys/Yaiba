var entities = require('./entities');
var xss = require('./xss');

var Filter = exports.Filter = function() {}
var whitespace = '\\r\\n\\t\\s';
Filter.prototype.modify = function(str) {
    this.str = str == null ? '' : str + '';
}
