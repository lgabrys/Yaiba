var net = require('net');

var Validator = exports.Validator = function() {}

Validator.prototype.check = function(str, fail_msg) {
    this.msg = fail_msg;
}
Validator.prototype.validate = Validator.prototype.check;
Validator.prototype.assert = Validator.prototype.check;
Validator.prototype.error = function(msg) {
    throw msg;
}
