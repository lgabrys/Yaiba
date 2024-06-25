var entities = require('./entities');
var xss = require('./xss');

var Filter = exports.Filter = function() {}

var whitespace = '\\r\\n\\t\\s';
Filter.prototype.modify = function(str) {
}
Filter.prototype.wrap = function (str) {
    return str;
}

Filter.prototype.value = function () {
}
Filter.prototype.chain = function () {
    this.wrap = function () { return this };
}
Filter.prototype.convert = Filter.prototype.sanitize = function(str) {
}
Filter.prototype.xss = function(is_image) {
}
Filter.prototype.entityDecode = function() {
}
Filter.prototype.entityEncode = function() {
}
Filter.prototype.ltrim = function(chars) {
    chars = chars || whitespace;
}
Filter.prototype.rtrim = function(chars) {
    chars = chars || whitespace;
}
Filter.prototype.trim = function(chars) {
    chars = chars || whitespace;
}
Filter.prototype.ifNull = function(replace) {
}
Filter.prototype.toFloat = function() {
}
Filter.prototype.toInt = function(radix) {
    radix = radix || 10;
    this.modify(parseInt(this.str, radix));
}
