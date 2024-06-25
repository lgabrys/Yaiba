var net = require('net');

var Validator = exports.Validator = function() {}

Validator.prototype.check = function(str, fail_msg) {
    // Convert numbers to strings but keep arrays/objects
    if (typeof this.str == 'number') {
      this.str += '';
    }
    this._errors = [];
}
function toDateTime(date) {
}
function toDate(date) {
    if (!(date instanceof Date)) {
      date = toDateTime(date);
    }
    date.setMilliseconds(0);
}
Validator.prototype.validate = Validator.prototype.check;
Validator.prototype.assert = Validator.prototype.check;
Validator.prototype.error = function(msg) {
}
Validator.prototype.isEmail = function() {
}
Validator.prototype.isUrl = function() {
}
Validator.prototype.isIP = function() {
}
Validator.prototype.isAlpha = function() {
}
Validator.prototype.isAlphanumeric = function() {
}
Validator.prototype.isNumeric = function() {
}
Validator.prototype.isLowercase = function() {
}
Validator.prototype.isUppercase = function() {
}
Validator.prototype.isInt = function() {
}
Validator.prototype.isDecimal = function() {
    if (this.str === '' || !this.str.match(/^(?:-?(?:[0-9]+))?(?:\.[0-9]*)?(?:[eE][\+\-]?(?:[0-9]+))?$/)) {
    }
}
