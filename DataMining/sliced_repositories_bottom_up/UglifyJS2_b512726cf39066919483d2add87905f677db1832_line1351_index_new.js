
var UglifyJS = require("../..");
var sandbox = require("../sandbox");
var MAX_GENERATED_TOPLEVELS_PER_RUN = 1;
var MAX_GENERATION_RECURSION_DEPTH = 12;
var STMT_ARG_TO_ID = Object.create(null);
var STMTS_TO_USE = [];
function STMT_(name) {
    return STMT_ARG_TO_ID[name] = STMTS_TO_USE.push(STMTS_TO_USE.length) - 1;
}
var STMT_FIRST_LEVEL_OVERRIDE = -1;
var STMT_SECOND_LEVEL_OVERRIDE = -1;
var num_iterations = +process.argv[2] || 1/0;
for (var i = 2; i < process.argv.length; ++i) {
    switch (process.argv[i]) {
        MAX_GENERATED_TOPLEVELS_PER_RUN = +process.argv[++i];
        if (!MAX_GENERATED_TOPLEVELS_PER_RUN) throw new Error("Must generate at least one toplevel per run");
        break;
        MAX_GENERATION_RECURSION_DEPTH = +process.argv[++i];
        var name = process.argv[++i];
        STMT_FIRST_LEVEL_OVERRIDE = STMT_ARG_TO_ID[name];
        if (!(STMT_FIRST_LEVEL_OVERRIDE >= 0)) throw new Error("Unknown statement name; use -? to get a list");
        break;
        var name = process.argv[++i];
        STMT_SECOND_LEVEL_OVERRIDE = STMT_ARG_TO_ID[name];
        STMTS_TO_USE = process.argv[++i].split(",").map(function(name) {
          return STMT_ARG_TO_ID[name];
        });
        process.argv[++i].split(",").forEach(function(name) {
            STMTS_TO_USE = STMTS_TO_USE.filter(function(id) {
              return id !== omit;
            });
        });
    }
}
var ASSIGNMENTS = [
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",

    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",
    "=",

    "+=",
    "+=",
    "+=",
    "+=",
    "+=",
    "+=",
    "+=",
    "+=",
    "+=",
    "+=",

    "-=",
    "*=",
    "/=",
    "&=",
    "|=",
    "^=",
    "<<=",
    ">>=",
    ">>>=",
    "%=",
];
var CAN_BREAK = true;
var CAN_CONTINUE = true;
var VAR_NAMES = [
];
var INITIAL_NAMES_LEN = VAR_NAMES.length;
var unique_vars = [];
function rng(max) {
}
function createTopLevelCode() {
    VAR_NAMES.length = INITIAL_NAMES_LEN; // prune any previous names still in the list
    unique_vars.length = 0;
}
function createFunctions(n, recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (n-- > 0) {
    }
}
function createBlockVariables(recurmax, stmtDepth, canThrow, fn) {
    unique_vars.length -= 6;
    fn(function() {
        if (consts.length) {
            var save = VAR_NAMES;
            VAR_NAMES = VAR_NAMES.filter(function(name) {
                return consts.indexOf(name) < 0;
            });
            var len = VAR_NAMES.length;
            s.push("const " + consts.map(function(name) {
                var value = createExpression(recurmax, NO_COMMA, stmtDepth, canThrow);
                VAR_NAMES.push(name);
                return name + " = " + value;
            }).join(", ") + ";");
            VAR_NAMES = save.concat(VAR_NAMES.slice(len));
        }
    });
}
function createFunction(recurmax, allowDefun, canThrow, stmtDepth) {
    createBlockVariables(recurmax, stmtDepth, canThrow, function(defns) {
        var namesLenBefore = VAR_NAMES.length;
        } else {
            unique_vars.length -= 3;
        }
        VAR_NAMES.length = namesLenBefore;
    });
}
function enableLoopControl(flag, defaultValue) {
}
function createLabel(canBreak, canContinue) {
    if (rng(10) < 3) {
        if (Array.isArray(canBreak)) {
            canBreak = canBreak.slice();
        } else {
            canBreak = canBreak ? [ "" ] : [];
        }
        if (Array.isArray(canContinue)) {
            canContinue = canContinue.slice();
        } else {
            canContinue = canContinue ? [ "" ] : [];
        }
    }
}
function createStatement(recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth, target) {
    ++stmtDepth;
    if (--recurmax < 0) {
    }
    if (target === undefined) {
        if (stmtDepth === 1 && STMT_FIRST_LEVEL_OVERRIDE >= 0) target = STMT_FIRST_LEVEL_OVERRIDE;
        else if (stmtDepth === 2 && STMT_SECOND_LEVEL_OVERRIDE >= 0) target = STMT_SECOND_LEVEL_OVERRIDE;
        else target = STMTS_TO_USE[rng(STMTS_TO_USE.length)];
    }
    switch (target) {
        var label = createLabel(canBreak);
        var label = createLabel(canBreak, canContinue);
        canBreak = label.break || enableLoopControl(canBreak, CAN_BREAK);
        canContinue = label.continue || enableLoopControl(canContinue, CAN_CONTINUE);
        var label = createLabel(canBreak, canContinue);
        canBreak = label.break || enableLoopControl(canBreak, CAN_BREAK);
        canContinue = label.continue || enableLoopControl(canContinue, CAN_CONTINUE);
        var label = createLabel(canBreak, canContinue);
        canBreak = label.break || enableLoopControl(canBreak, CAN_BREAK);
        canContinue = label.continue || enableLoopControl(canContinue, CAN_CONTINUE);
        var label = createLabel(canBreak, canContinue);
        canBreak = label.break || enableLoopControl(canBreak, CAN_BREAK);
        canContinue = label.continue || enableLoopControl(canContinue, CAN_CONTINUE);
        return [
        ].join("");
    }
}
function createSwitchParts(recurmax, n, canThrow, canBreak, canContinue, cannotReturn, stmtDepth) {
    var hadDefault = false;
    var s = [""];
    canBreak = enableLoopControl(canBreak, CAN_BREAK);
    while (n-- > 0) {
        if (hadDefault || rng(5) > 0) {
            s.push(
                "case " + createExpression(recurmax, NO_COMMA, stmtDepth, canThrow) + ":",
                _createStatements(rng(3) + 1, recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth),
                rng(10) > 0 ? " break;" : "/* fall-through */",
                ""
            );
        } else {
            hadDefault = true;
        }
    }
}
function _createExpression(recurmax, noComma, stmtDepth, canThrow) {
    switch (rng(_createExpression.N)) {
        var nameLenBefore = VAR_NAMES.length;
        VAR_NAMES.length = nameLenBefore;
    }
}
function createAccessor(recurmax, stmtDepth, canThrow) {
    var namesLenBefore = VAR_NAMES.length;
    VAR_NAMES.length = namesLenBefore;
}
function println(msg) {
}
function sort_globals(code) {
    var globals = sandbox.run_code("throw Object.keys(this).sort();" + code);
}
function fuzzy_match(original, uglified) {
    uglified = uglified.split(" ");
    var i = uglified.length;
    original = original.split(" ", i);
    while (--i >= 0) {
    }
}
var minify_options = require("./options.json").map(JSON.stringify);
var original_code, original_result, errored;
var uglify_code, uglify_result, ok;
for (var round = 1; round <= num_iterations; round++) {
    original_code = createTopLevelCode();
    var orig_result = [ sandbox.run_code(original_code), sandbox.run_code(original_code, true) ];
    errored = typeof orig_result[0] != "string";
    minify_options.forEach(function(options) {
        var o = JSON.parse(options);
        var toplevel = sandbox.has_toplevel(o);
        o.validate = true;
        uglify_code = UglifyJS.minify(original_code, o);
        original_result = orig_result[toplevel ? 1 : 0];
        if (!uglify_code.error) {
            uglify_code = uglify_code.code;
            uglify_result = sandbox.run_code(uglify_code, toplevel);
            ok = sandbox.same_stdout(original_result, uglify_result);
            if (!ok && !toplevel) {
                ok = sandbox.same_stdout(sandbox.run_code(sort_globals(original_code)), sandbox.run_code(sort_globals(uglify_code)));
            }
            if (!ok && o.compress && o.compress.unsafe_math && typeof original_result == "string" && typeof uglify_result == "string") {
            }
        } else {
    });
}
