var util = require("util");
var BaseType = require("./base");
var Email = require("./email");
var Utils = require("../utils");

function StringType() {

    StringType.super_.call(this);
    
    // this.init()
}

util.inherits(StringType, BaseType);

StringType.prototype.__name = "String";

// TODO: move to base
// StringType.prototype.init = function() {

//     for(var i in this){
//         var pattern = /^[_]{1}([a-z0-9]+)$/;
//         var matches = i.match(pattern);

//         if (matches) {
//             var fnName = "x_" + matches[1];
//             this[fnName] = function() {
//                 this.add(fnName, this[fnName](n), arguments);
//                 return this;
//             }
//             if (process.printed){ continue; }
//             console.log(fnName)
//         }
//     }
//     process.printed = true;
//     return this;
// }

// Error msg would be: "the key `____` is not allowed to be empty ('')"
StringType.prototype._base = function() {

    return function(value, qs, key, req) {

        var keyDoesNotExist = !qs.hasOwnProperty(key);
        var valueIsMinLength = (qs[key] !== undefined && qs[key].length >= 1);
        
        var result = (keyDoesNotExist || valueIsMinLength);
        if (result === false) {

            req.addValidationError("the value of `" + key + "` is not allowed to be the empty string ('')");
        }
        return result;
    };
}

StringType.prototype.base = function() {

    this.add("base", this._base(), arguments);
    return this;
}

StringType.prototype._min = function(n) {
    Utils.assert((!isNaN(n) && ((n|0) == parseFloat(n))), "In Types.String.min(n), the n must be an integer.");
    Utils.assert(n >= 0, "In Types.String.min(n), the n must be a non-negative integer.");

    return function(value, qs, key, req) {

        var result = (value.length >= n);
        if (result === false) {

            req.addValidationError("the value of `" + key + "` must be at least " + n + " characters long");
        }
        return result;
    };
}

StringType.prototype.min = function(n) {

    this.add("min", this._min(n), arguments);
    return this;
}

StringType.prototype._max = function(n) {
    Utils.assert((!isNaN(n) && ((n|0) == parseFloat(n))), "In Types.String.max(n), the n must be an integer");
    Utils.assert(n >= 0, "In Types.String.max(n), the n must be a non-negative integer");

    return function(value, qs, key, req) {

        var result = (value.length <= n);
        if (result === false) {

            req.addValidationError("the value of `" + key +"` must be less than (or equal to) " + n + " characters long");
        }
        return result;
    };
}

StringType.prototype.max = function(n) {

    this.add("max", this._max(n), arguments);
    return this;
}

StringType.prototype._regex = function(n) {
    Utils.assert(n instanceof RegExp, "In Types.String.regex(n), the n must be a RegExp");

    return function(value) {

        var result = (value.match(n) !== null);
        if (result === false) {

            req.addValidationError("the value of `" + key + "` must match the RegExp `" + n.toString() + "`");
        }
        return result;
    };
}

StringType.prototype.regex = function(pattern) {

    this.add('regex', this._regex(pattern), arguments);
    return this;
}

StringType.prototype._date = function(){

  return function(value, qs, key, req){

    value = (isNaN(Number(value)) === false) ? +value : value;
    var converted = new Date(value);
    var result = (!isNaN(converted.getTime()));
    if (result === false) {

        req.addValidationError("the value of `" + key + "` must be a valid JavaScript Date format");
    }
    return result;
  }
}

StringType.prototype.date = function(){

  this.add('date', this._date.apply(arguments), arguments);
  return this;
}

StringType.prototype.alphanum = function(spacesEnabled) {

    spacesEnabled = (spacesEnabled === null) ? true : spacesEnabled;
    if (spacesEnabled === true) {

        var pattern = /^[\w\s]+$/;
    }
    else {

        var pattern = /^[a-zA-Z0-9]+$/;
    }
    
    this.regex(pattern);
    return this;
}

StringType.prototype.email = function() {

    this.regex(Email._regex);
    return this;
}

function CreateStringType() {

    return new StringType();
}

module.exports = CreateStringType;
module.exports.StringType = StringType;