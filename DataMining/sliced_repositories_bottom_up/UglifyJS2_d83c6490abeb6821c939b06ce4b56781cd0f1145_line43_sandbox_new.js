var semver = require("semver");
var vm = require("vm");

function createContext() {
    var context = Object.create(null);
    Object.defineProperty(context, "console", {
        value: function() {
            var con = Object.create(null);
            Object.defineProperty(con, "log", {
                value: function(msg) {
                    if (arguments.length == 1 && typeof msg == "string") {
                        return console.log("%s", msg);
                    }
                    return console.log.apply(console, [].map.call(arguments, function(arg) {
                    }));
                }
            });
        }()
    });
}
function safe_log(arg, level) {
    if (arg) switch (typeof arg) {
        if (level--) for (var key in arg) {
            var desc = Object.getOwnPropertyDescriptor(arg, key);
            if (!desc || !desc.get) {
                arg[key] = safe_log(arg[key], level);
            }
        }
    }
}
function strip_func_ids(text) {
    return ("" + text).replace(/F[0-9]{6}N/g, "<F<>N>");
}
