
var UglifyJS = require("../..");
var randomBytes = require("crypto").randomBytes;
var sandbox = require("../sandbox");
var MAX_GENERATED_TOPLEVELS_PER_RUN = 1;
var MAX_GENERATION_RECURSION_DEPTH = 12;
var STMT_ARG_TO_ID = Object.create(null);
var STMTS_TO_USE = [];
function STMT_(name) {
    return STMT_ARG_TO_ID[name] = STMTS_TO_USE.push(STMTS_TO_USE.length) - 1;
}
var STMT_BLOCK = STMT_("block");
var STMT_IF_ELSE = STMT_("ifelse");
var STMT_DO_WHILE = STMT_("dowhile");
var STMT_WHILE = STMT_("while");
var STMT_FOR_LOOP = STMT_("forloop");
var STMT_FOR_IN = STMT_("forin");
var STMT_SEMI = STMT_("semi");
var STMT_EXPR = STMT_("expr");
var STMT_SWITCH = STMT_("switch");
var STMT_VAR = STMT_("var");
var STMT_RETURN_ETC = STMT_("stop");
var STMT_FUNC_EXPR = STMT_("funcexpr");
var STMT_TRY = STMT_("try");
var STMT_C = STMT_("c");
var STMT_FIRST_LEVEL_OVERRIDE = -1;
var STMT_SECOND_LEVEL_OVERRIDE = -1;
var STMT_COUNT_FROM_GLOBAL = true; // count statement depth from nearest function scope or just global scope?
var num_iterations = +process.argv[2] || 1/0;
var verbose = false; // log every generated test
var verbose_interval = false; // log every 100 generated tests
var use_strict = false;
var catch_redef = require.main === module;
var generate_directive = require.main === module;
for (var i = 2; i < process.argv.length; ++i) {
    switch (process.argv[i]) {
        verbose = true;
        verbose_interval = true;
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
        catch_redef = false;
        generate_directive = false;
        use_strict = true;
        STMT_COUNT_FROM_GLOBAL = false;
        STMTS_TO_USE = process.argv[++i].split(",").map(function(name) {
          return STMT_ARG_TO_ID[name];
        });
        process.argv[++i].split(",").forEach(function(name) {
            var omit = STMT_ARG_TO_ID[name];
            STMTS_TO_USE = STMTS_TO_USE.filter(function(id) {
              return id !== omit;
            });
        });
        if (i > 2 || !parseInt(process.argv[i], 10)) throw new Error("Unknown argument[" + process.argv[i] + "]; see -h for help");
    }
}
var VALUES = [
];
var BINARY_OPS_NO_COMMA = [
    "^" ];
var BINARY_OPS = [","].concat(BINARY_OPS_NO_COMMA);
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
var UNARY_SAFE = [
];
var UNARY_POSTFIX = [
];
var UNARY_PREFIX = UNARY_POSTFIX.concat(UNARY_SAFE);
var NO_COMMA = true;
var COMMA_OK = false;
var MAYBE = true;
var MANDATORY = false;
var CAN_THROW = true;
var CANNOT_THROW = false;
var CAN_BREAK = true;
var CANNOT_BREAK = false;
var CAN_CONTINUE = true;
var CANNOT_CONTINUE = false;
var CAN_RETURN = false;
var CANNOT_RETURN = true;
var NO_DEFUN = false;
var DEFUN_OK = true;
var DONT_STORE = true;
var VAR_NAMES = [
];
var INITIAL_NAMES_LEN = VAR_NAMES.length;
var TYPEOF_OUTCOMES = [
];
var unique_vars = [];
var loops = 0;
var funcs = 0;
var called = Object.create(null);
var labels = 10000;
function rng(max) {
    var r = randomBytes(2).readUInt16LE(0) / 65536;
}
function strictMode() {
}
function createTopLevelCode() {
    VAR_NAMES.length = INITIAL_NAMES_LEN; // prune any previous names still in the list
    unique_vars.length = 0;
    loops = 0;
    funcs = 0;
    called = Object.create(null);
}
function createFunctions(n, recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (n-- > 0) {
    }
}
function createFunction(recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    if (!STMT_COUNT_FROM_GLOBAL) stmtDepth = 0;
    var namesLenBefore = VAR_NAMES.length;
    var name;
    if (allowDefun || rng(5) > 0) {
        name = "f" + funcs++;
    } else {
        name = createVarName(MANDATORY, !allowDefun);
        unique_vars.length -= 3;
    }
    VAR_NAMES.length = namesLenBefore;
}
function createStatements(n, recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (--n > 0) {
    }
}
function enableLoopControl(flag, defaultValue) {
    return Array.isArray(flag) && flag.indexOf("") < 0 ? flag.concat("") : flag || defaultValue;
}
function createLabel(canBreak, canContinue) {
    var label;
    if (rng(10) < 3) {
        label = ++labels;
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
function getLabel(label) {
    label = label[rng(label.length)];
}
function createStatement(recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth, target) {
    ++stmtDepth;
    var loop = ++loops;
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
                createStatements(rng(3) + 1, recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth),
                rng(10) > 0 ? " break;" : "/* fall-through */",
                ""
            );
        } else {
            hadDefault = true;
        }
    }
}
function _createExpression(recurmax, noComma, stmtDepth, canThrow) {
    var p = 0;
    switch (rng(_createExpression.N)) {
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
        var nameLenBefore = VAR_NAMES.length;
        var name = createVarName(MAYBE); // note: this name is only accessible from _within_ the function. and immutable at that.
        VAR_NAMES.length = nameLenBefore;
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
        var name = getVarName();
      case p++:
        var name = getVarName();
      case p++:
      case p++:
      case p++:
      case p++:
        if (rng(16) == 0) {
            var name = getVarName();
            called[name] = true;
        }
        var name = rng(3) == 0 ? getVarName() : "f" + rng(funcs + 2);
        called[name] = true;
    }
    _createExpression.N = p;
}
function createAccessor(recurmax, stmtDepth, canThrow) {
    var namesLenBefore = VAR_NAMES.length;
    VAR_NAMES.length = namesLenBefore;
}
function getVarName() {
}
function createVarName(maybe, dontStore) {
}
function println(msg) {
}
var fallback_options = [ JSON.stringify({
    compress: false,
    mangle: false
}) ];
var minify_options = require("./options.json").map(JSON.stringify);
var original_code, original_result, errored;
var uglify_code, uglify_result, ok;
for (var round = 1; round <= num_iterations; round++) {
    original_code = createTopLevelCode();
    var orig_result = [ sandbox.run_code(original_code) ];
    errored = typeof orig_result[0] != "string";
    if (!errored) orig_result.push(sandbox.run_code(original_code, true));
    (errored ? fallback_options : minify_options).forEach(function(options) {
        var o = JSON.parse(options);
        var toplevel = sandbox.has_toplevel(o);
        uglify_code = UglifyJS.minify(original_code, o);
        original_result = orig_result[toplevel ? 1 : 0];
        if (!uglify_code.error) {
            uglify_code = uglify_code.code;
            uglify_result = sandbox.run_code(uglify_code, toplevel);
            ok = sandbox.same_stdout(original_result, uglify_result);
            if (!ok && typeof uglify_result == "string" && o.compress && o.compress.unsafe_math) {
            }
        } else {
    });
}
