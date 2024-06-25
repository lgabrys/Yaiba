var semver = require("semver");
var vm = require("vm");

var setupContext = new vm.Script([
    "[ Array, Boolean, Error, Function, Number, Object, RegExp, String ].forEach(function(f) {",
    "    f.toString = Function.prototype.toString;",
    "});",
    "Function.prototype.toString = function() {",
    "    var id = 100000;",
    "    return function() {",
    "        var n = this.name;",
    "        if (!/^F[0-9]{6}N$/.test(n)) {",
    '            n = "F" + ++id + "N";',
].concat(Object.getOwnPropertyDescriptor(Function.prototype, "name").configurable ? [
    '            Object.defineProperty(this, "name", {',
    "                get: function() {",
]).join("\n"));
function createContext() {
    function safe_log(arg, level) {
        if (arg) switch (typeof arg) {
            if (level--) for (var key in arg) {
                var desc = Object.getOwnPropertyDescriptor(arg, key);
                if (!desc || !desc.get && !desc.set) arg[key] = safe_log(arg[key], level);
            }
        }
        return arg;
    }
}
