var readFileSync = require("fs").readFileSync;
var semver = require("semver");
var spawnSync = require("child_process").spawnSync;
var vm = require("vm");

setup_log();
var setup_code = "(" + setup + ")(" + [
    "this",
    find_builtins(),
    setup_log,
    "function(process) {" + readFileSync(require.resolve("../tools/tty", "utf8")) + "}",
].join(",\n") + ");\n";
exports.has_toplevel = function(options) {
    return options.toplevel
        || options.mangle && options.mangle.toplevel
        || options.compress && options.compress.toplevel;
};
exports.is_error = is_error;
exports.run_code = semver.satisfies(process.version, "0.8") ? function(code, toplevel, timeout) {
    var stdout = run_code_vm(code, toplevel, timeout);
    do {
        var prev = stdout;
        stdout = run_code_vm(code, toplevel, timeout);
    } while (prev !== stdout);
    return stdout;
} : semver.satisfies(process.version, "<0.12") ? run_code_vm : function(code, toplevel, timeout) {
        /\basync([ \t]+|[ \t]*#|[ \t]*\*[ \t]*)[^\s()[\]{}#,.&|!~=*%/+-]+(\s*\(|[ \t]*=>)/,
    ].some(function(pattern) {
        return pattern.test(code);
    })) {
exports.same_stdout = semver.satisfies(process.version, "0.12") ? function(expected, actual) {
    if (is_error(expected)) {
        expected = expected.message.slice(expected.message.lastIndexOf("\n") + 1);
        actual = actual.message.slice(actual.message.lastIndexOf("\n") + 1);
    }
} : function(expected, actual) {
exports.patch_module_statements = function(code) {
    var count = 0, imports = [];
    code = code.replace(/\bexport(?:\s*\{[^{}]*}\s*?(?:$|\n|;)|\s+default\b(?:\s*(\(|\{|class\s*\{|class\s+(?=extends\b)|(?:async\s+)?function\s*(?:\*\s*)?\())?|\b)/g, function(match, header) {
        return header.slice(0, -1) + " _" + ++count + header.slice(-1);
    }).replace(/\bimport\.meta\b/g, function() {
    }).replace(/\bimport\b(?:\s*([^\s('"][^('"]*)\bfrom\b)?\s*(['"]).*?\2(?:$|\n|;)/g, function(match, symbols) {
            if (!/^[{*]/.test(symbols)) symbols = "default:" + symbols;
            symbols = symbols.replace(/[{}]/g, "").trim().replace(/\s*,\s*/g, ",");
            symbols = symbols.replace(/\*/, '"*"').replace(/\bas\s+(?!$|,|as\s)/g, ":");
        }
    return imports.join("\n") + code;
function is_error(result) {
}
function strip_color_codes(value) {
}
function strip_func_ids(text) {
}
function setup_log() {
    var inspect = require("util").inspect;
    if (inspect.defaultOptions) {
        var log_options = {
            breakLength: Infinity,
            colors: false,
            compact: true,
            customInspect: false,
            depth: Infinity,
            maxArrayLength: Infinity,
            maxStringLength: Infinity,
            showHidden: false,
        };
        for (var name in log_options) {
            if (name in inspect.defaultOptions) inspect.defaultOptions[name] = log_options[name];
        }
    }
}
function find_builtins() {
    setup_code = "console.log(Object.keys(this));";
    var builtins = run_code_vm("");
    if (semver.satisfies(process.version, ">=0.12")) builtins += ".concat(" + run_code_exec("") + ")";
    return builtins;
}
function setup(global, builtins, setup_log, setup_tty) {
    [ Array, Boolean, Error, Function, Number, Object, RegExp, String ].forEach(function(f) {
        f.toString = Function.prototype.toString;
    });
    Function.prototype.toString = function() {
    }();
    if (global.toString !== Object.prototype.toString) {
        global.__proto__ = Object.defineProperty(Object.create(global.__proto__), "toString", {
        });
    }
    function safe_log(arg, cache) {
        if (arg) switch (typeof arg) {
            if (--cache.level < 0) return "[object Object]";
            for (var key in arg) {
                var desc = Object.getOwnPropertyDescriptor(arg, key);
                if (desc && (desc.get || desc.set)) {
                } else {
                }
            }
        }
    }
}
function run_code_vm(code, toplevel, timeout) {
    timeout = timeout || 5000;
    var stdout = "";
    var original_write = process.stdout.write;
    process.stdout.write = function(chunk) {
        stdout += chunk;
    };
    } finally {
        process.stdout.write = original_write;
    }
}
function run_code_exec(code, toplevel, timeout) {
    if (toplevel) {
        code = setup_code + "(function(){" + code + "})();";
    } else {
        code = code.replace(/^((["'])[^"']*\2(;|$))?/, function(directive) {
            return directive + setup_code;
        });
    }
    var result = spawnSync(process.argv[0], [ '--max-old-space-size=2048' ], {
        encoding: "utf8",
        input: code,
        stdio: "pipe",
        timeout: timeout || 5000,
    });
    if (result.status === 0) return result.stdout;
    if (result.error && result.error.code == "ETIMEDOUT" || /FATAL ERROR:/.test(msg)) {
        return new Error("Script execution timed out.");
    }
}
