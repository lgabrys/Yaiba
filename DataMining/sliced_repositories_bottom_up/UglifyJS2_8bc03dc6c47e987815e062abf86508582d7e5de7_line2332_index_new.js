var randomBytes = require("crypto").randomBytes;
var sandbox = require("../sandbox");
var STMT_COUNT_FROM_GLOBAL = true; // count statement depth from nearest function scope or just global scope?
var use_strict = false;
for (var i = 2; i < process.argv.length; ++i) {
    switch (process.argv[i]) {
        use_strict = true;
        STMT_COUNT_FROM_GLOBAL = false;
    }
}
var SUPPORT = function(matrix) {
    for (var name in matrix) {
        matrix[name] = !sandbox.is_error(sandbox.run_code(matrix[name]));
    }
}({
if (SUPPORT.exponentiation && sandbox.run_code("console.log(10 ** 100 === Math.pow(10, 100));") !== "true\n") {
    SUPPORT.exponentiation = false;
}
var VALUES = [
];
VALUES = VALUES.concat(VALUES);
VALUES = VALUES.concat(VALUES);
VALUES = VALUES.concat(VALUES);
if (SUPPORT.bigint) VALUES = VALUES.concat([
]);
VALUES = VALUES.concat(VALUES);
VALUES = VALUES.concat(VALUES);
VALUES = VALUES.concat(VALUES);
VALUES = VALUES.concat(VALUES);
var BINARY_OPS = [
];
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
var ASSIGNMENTS = [ "=" ];
ASSIGNMENTS = ASSIGNMENTS.concat(ASSIGNMENTS);
ASSIGNMENTS = ASSIGNMENTS.concat(ASSIGNMENTS);
ASSIGNMENTS = ASSIGNMENTS.concat(ASSIGNMENTS);
ASSIGNMENTS = ASSIGNMENTS.concat(ASSIGNMENTS);
ASSIGNMENTS = ASSIGNMENTS.concat([
]);
ASSIGNMENTS = ASSIGNMENTS.concat(ASSIGNMENTS);
if (SUPPORT.logical_assignment) ASSIGNMENTS = ASSIGNMENTS.concat([
]);
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
var NO_CONST = true;
var NO_DUPLICATE = true;
var NO_LAMBDA = true;
var NO_TEMPLATE = true;
var VAR_NAMES = [
];
var INITIAL_NAMES_LEN = VAR_NAMES.length;
var TYPEOF_OUTCOMES = [
];
var avoid_vars = [];
var block_vars = [ "let" ];
var lambda_vars = [];
var unique_vars = [];
var classes = [];
var allow_this = true;
var async = false;
var has_await = false;
var export_default = false;
var generator = false;
var loops = 0;
var funcs = 0;
var clazz = 0;
var imports = 0;
var in_class = 0;
var called = Object.create(null);
var labels = 10000;
function rng(max) {
    var r = randomBytes(2).readUInt16LE(0) / 65536;
}
function strictMode() {
}
function appendExport(stmtDepth, allowDefault) {
    if (SUPPORT.destructuring && stmtDepth == 1 && rng(20) == 0) {
        if (allowDefault && !export_default && rng(5) == 0) {
            export_default = true;
        }
    }
}
function mayDefer(code) {
    if (SUPPORT.arrow && rng(200) == 0) {
        has_await = true;
    }
}
function createTopLevelCode() {
    VAR_NAMES.length = INITIAL_NAMES_LEN; // prune any previous names still in the list
    block_vars.length = 1;
    lambda_vars.length = 0;
    unique_vars.length = 0;
    classes.length = 0;
    allow_this = true;
    async = false;
    has_await = false;
    export_default = false;
    generator = false;
    loops = 0;
    funcs = 0;
    clazz = 0;
    imports = 0;
    in_class = 0;
    called = Object.create(null);
}
function addTrailingComma(list) {
}
function createParams(was_async, was_generator, noDuplicate) {
    var save_async = async;
    if (!async) async = was_async;
    var save_generator = generator;
    if (!generator) generator = was_generator;
    var len = unique_vars.length;
    unique_vars.length = len;
    generator = save_generator;
    async = save_async;
}
function createAssignmentPairs(recurmax, stmtDepth, canThrow, nameLenBefore, was_async, was_generator) {
    var len = unique_vars.length;
    unique_vars.length = len;
    function fill(nameFn, valueFn) {
        var save_async = async;
        if (was_async != null) {
            async = false;
        }
        var save_generator = generator;
        if (was_generator != null) {
            generator = false;
        }
        if (was_generator != null) {
            generator = was_generator;
        }
        if (was_async != null) {
            async = was_async;
        }
        generator = save_generator;
        async = save_async;
    }
    function createName() {
        var save_async = async;
        if (!async) async = was_async;
        var save_generator = generator;
        if (!generator) generator = was_generator;
        generator = save_generator;
        async = save_async;
        unique_vars.length -= 6;
    }
    var block_len = block_vars.length;
    var class_len = classes.length;
    var nameLenBefore = VAR_NAMES.length;
    unique_vars.length -= 6;
    fn(function() {
        if (SUPPORT.class) while (rng(200) == 0) {
            var name = "C" + clazz++;
        }
    });
    VAR_NAMES.length = nameLenBefore;
    classes.length = class_len;
    block_vars.length = block_len;
function createFunction(recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    if (!STMT_COUNT_FROM_GLOBAL) stmtDepth = 0;
    ++stmtDepth;
    var name, args;
    var nameLenBefore = VAR_NAMES.length;
    var lambda_len = lambda_vars.length;
    var save_async = async;
    var save_generator = generator;
    async = SUPPORT.async && rng(200) == 0;
    generator = SUPPORT.generator && rng(50) == 0;
    if (async && generator && !SUPPORT.async_generator) {
        if (rng(2)) {
            async = false;
        } else {
            generator = false;
        }
    }
    createBlockVariables(recurmax, stmtDepth, canThrow, function(defns) {
        if (allowDefun || rng(5) > 0) {
            name = "f" + funcs++;
        } else {
            name = createVarName(MANDATORY, !allowDefun);
            unique_vars.length -= 3;
        }
        if (SUPPORT.destructuring && (!allowDefun || !(name in called)) && rng(2)) {
            called[name] = false;
            var pairs = createAssignmentPairs(recurmax, stmtDepth, canThrow, nameLenBefore, save_async, save_generator);
            args = "(" + addTrailingComma(pairs.values.join(", ")) + ")";
        } else {
    });
    generator = save_generator;
    async = save_async;
    lambda_vars.length = lambda_len;
    VAR_NAMES.length = nameLenBefore;
}
function createLabel(canBreak, canContinue) {
    var label;
    if (rng(10) < 3) {
        label = ++labels;
    }
}
function createImportAlias() {
    if (rng(10)) return "alias" + imports++;
    unique_vars.length -= 6;
}
function createStatement(recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth, target) {
    var loop = ++loops;
    switch (target) {
        var block_len = block_vars.length;
        var nameLenBefore = VAR_NAMES.length;
        if (of) {
            if (await) {
                has_await = true;
            }
        } else {
        if (rng(3)) {
            unique_vars.length -= 6;
        }
        VAR_NAMES.length = nameLenBefore;
        block_vars.length = block_len;
          if (SUPPORT.destructuring && stmtDepth == 1 && !export_default && rng(20) == 0) {
              export_default = true;
          }
        if (n !== 1) {
            mayCreateBlockVariables(recurmax, stmtDepth, canThrow, function(defns) {
                var block_len = block_vars.length;
                var unique_len = unique_vars.length;
                } else if (canThrow && SUPPORT.destructuring && !rng(20)) {
                    unique_vars.length -= 6;
                } else {
                block_vars.length = block_len;
                unique_vars.length = unique_len;
            });
        }
    }
}
function createExpression(recurmax, noComma, stmtDepth, canThrow) {
    switch (rng(6)) {
        if (async && rng(50) == 0) {
            has_await = true;
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
        if (SUPPORT.destructuring && rng(20) == 0) {
            var name = "alias" + rng(imports + 2);
        }
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
      case p++:
        var nameLenBefore = VAR_NAMES.length;
        var lambda_len = lambda_vars.length;
        var save_async = async;
        var save_generator = generator;
        async = SUPPORT.async && rng(200) == 0;
        generator = SUPPORT.generator && rng(50) == 0;
        if (async && generator && !SUPPORT.async_generator) {
            if (rng(2)) {
                async = false;
            } else {
                generator = false;
            }
        }
        var name = createVarName(MAYBE); // note: this name is only accessible from _within_ the function. and immutable at that.
        unique_vars.length -= 3;
        switch (rng(5)) {
            if (SUPPORT.arrow && !name && !generator && rng(2)) {
                generator = save_generator;
                async = save_async;
                lambda_vars.length = lambda_len;
                VAR_NAMES.length = nameLenBefore;
            } else {
            async = false;
            generator = false;
            generator = save_generator;
            async = save_async;
            lambda_vars.length = lambda_len;
            VAR_NAMES.length = nameLenBefore;
        }
        generator = save_generator;
        async = save_async;
        lambda_vars.length = lambda_len;
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
      case p++:
      case p++:
        var name = getVarName();
      case p++:
        var name = getVarName();
      case p++:
      case p++:
        var name = getVarName();
      case p++:
        if (SUPPORT.class) {
            if (rng(200) == 0) {
                var nameLenBefore = VAR_NAMES.length;
                var class_len = classes.length;
                var name;
                if (canThrow && rng(20) == 0) {
                    in_class++;
                    name = createVarName(MAYBE);
                    in_class--;
                } else if (rng(2)) {
                    name = "C" + clazz++;
                }
                classes.length = class_len;
                VAR_NAMES.length = nameLenBefore;
            }
        }
      case p++:
      case p++:
      case p++:
        var name;
        do {
            name = rng(3) == 0 ? getVarName() : "f" + rng(funcs + 2);
        } while (name in called && !called[name]);
        called[name] = true;
    }
    _createExpression.N = p;
}
function createArrayLiteral(recurmax, stmtDepth, canThrow) {
    recurmax--;
    var arr = [];
    for (var i = rng(6); --i >= 0;) switch (SUPPORT.spread ? rng(50) : 3 + rng(47)) {
    }
}
function createObjectFunction(recurmax, stmtDepth, canThrow, internal, isClazz) {
    var nameLenBefore = VAR_NAMES.length;
    var save_async = async;
    var save_generator = generator;
    switch (internal ? 2 : rng(SUPPORT.computed_key ? 3 : 2)) {
        async = false;
        generator = false;
        async = false;
        generator = false;
        if (/^(constructor|super)$/.test(internal)) {
            async = false;
            generator = false;
        } else {
            async = SUPPORT.async && rng(200) == 0;
            generator = SUPPORT.generator && rng(50) == 0;
            if (async && generator && !SUPPORT.async_generator) {
                if (rng(2)) {
                    async = false;
                } else {
                    generator = false;
                }
            }
        }
        fn = function(defns) {
            var save_allow = allow_this;
            if (internal == "super") allow_this = false;
            allow_this = save_allow;
        };
    }
    generator = save_generator;
    async = save_async;
    VAR_NAMES.length = nameLenBefore;
}
function createClassLiteral(recurmax, stmtDepth, canThrow, name) {
    var save_async = async;
    var save_generator = generator;
    in_class++;
    for (var i = rng(6); --i >= 0;) {
        if (SUPPORT.class_field && rng(2)) {
            if (rng(5)) {
                async = false;
                generator = false;
                generator = save_generator;
                async = save_async;
            }
        } else {
    }
    in_class--;
    generator = save_generator;
    async = save_async;
}
function createTypeofExpr(recurmax, stmtDepth, canThrow) {
    function createVar() {
        var save_async = async;
        var save_generator = generator;
        if (!async && avoid_vars.indexOf("await") >= 0) async = true;
        if (!generator && avoid_vars.indexOf("yield") >= 0) generator = true;
        generator = save_generator;
        async = save_async;
    }
}
function getVarName(noConst, noLambda) {
}
function createVarName(maybe, dontStore) {
}
function is_error_spread(ex) {
    return ex.name == "TypeError" && /Found non-callable @@iterator| is not iterable| not a function|Symbol\(Symbol\.iterator\)/.test(ex.message);
}
