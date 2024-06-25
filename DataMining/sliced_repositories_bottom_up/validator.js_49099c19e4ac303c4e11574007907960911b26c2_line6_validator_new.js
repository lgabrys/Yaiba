var net = require('net');

var Validator = exports.Validator = function() {}

Validator.prototype.check = function(str, fail_msg) {
    this.str = str == null ? '' : str+'';
}
