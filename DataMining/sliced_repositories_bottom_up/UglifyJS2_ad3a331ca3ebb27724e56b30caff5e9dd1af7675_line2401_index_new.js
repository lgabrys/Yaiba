
var randomBytes = require("crypto").randomBytes;
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
var STMT_COUNT_FROM_GLOBAL = true; // count statement depth from nearest function scope or just global scope?
var use_strict = false;
for (var i = 2; i < process.argv.length; ++i) {
    switch (process.argv[i]) {
        MAX_GENERATED_TOPLEVELS_PER_RUN = +process.argv[++i];
        MAX_GENERATION_RECURSION_DEPTH = +process.argv[++i];
        var name = process.argv[++i];
        STMT_FIRST_LEVEL_OVERRIDE = STMT_ARG_TO_ID[name];
        var name = process.argv[++i];
        STMT_SECOND_LEVEL_OVERRIDE = STMT_ARG_TO_ID[name];
        if (!(STMT_SECOND_LEVEL_OVERRIDE >= 0)) throw new Error("Unknown statement name; use -? to get a list");
        use_strict = true;
        STMT_COUNT_FROM_GLOBAL = false;
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
    ">>>",
    "&&",
];
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
BINARY_OPS = BINARY_OPS.concat(BINARY_OPS);
var ASSIGNMENTS = [ "=" ];
ASSIGNMENTS = ASSIGNMENTS.concat(ASSIGNMENTS);
ASSIGNMENTS.push("+=");
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
function createFunctions(n, recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (n-- > 0) {
    }
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
function createArgs(recurmax, stmtDepth, canThrow, noTemplate) {
    recurmax--;
    var args = [];
    for (var n = rng(4); --n >= 0;) switch (SUPPORT.spread ? rng(50) : 3) {
    }
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
    function createAssignmentValue(recurmax) {
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
    function createPairs(recurmax, noDefault) {
    }
    function createDestructured(recurmax, noDefault, names, values) {
            if (--recurmax < 0) {
            } else {
                var pairs = createPairs(recurmax);
                fill(function() {
                }, function() {
                    while (!rng(10)) {
                        var index = rng(pairs.names.length + 1);
                        } else switch (rng(5)) {
                            pairs.values[index] = createAssignmentValue(recurmax);
                            pairs.values.length = index + 1;
                        }
                    }
                    values.unshift("[ " + pairs.values.join(", ") + " ]");
                });
            }
            if (--recurmax < 0) {
            } else {
                var pairs = createPairs(recurmax);
function createBlockVariables(recurmax, stmtDepth, canThrow, fn) {
    ++stmtDepth;
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
function mayCreateBlockVariables(recurmax, stmtDepth, canThrow, fn) {
}
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
function _createStatements(n, recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (--n > 0) {
    }
}
function enableLoopControl(flag, defaultValue) {
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
function createImportAlias() {
    if (rng(10)) return "alias" + imports++;
    unique_vars.length -= 6;
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
        var block_len = block_vars.length;
        var nameLenBefore = VAR_NAMES.length;
        var label = createLabel(canBreak, canContinue);
        canBreak = label.break || enableLoopControl(canBreak, CAN_BREAK);
        canContinue = label.continue || enableLoopControl(canContinue, CAN_CONTINUE);
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
        var n = rng(3); // 0=only catch, 1=only finally, 2=catch+finally
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
function createSwitchParts(recurmax, n, canThrow, canBreak, canContinue, cannotReturn, stmtDepth) {
    var hadDefault = false;
    var s = [ "" ];
    canBreak = enableLoopControl(canBreak, CAN_BREAK);
    while (n-- > 0) {
        } else {
            hadDefault = true;
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
function createTemplateLiteral(recurmax, stmtDepth, canThrow) {
    recurmax--;
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
function run_code(code, toplevel, timeout) {
}
function is_error_in(ex) {
}
function is_error_tdz(ex) {
}
function is_error_spread(ex) {
}
function is_error_recursion(ex) {
}
function is_error_set_property(ex) {
}
function is_error_destructuring(ex) {
}
function is_error_class_constructor(ex) {
}
function is_error_getter_only_property(ex) {
}
function patch_try_catch(orig, toplevel) {
    var stack = [ {
        code: orig,
        index: 0,
        offset: 0,
        tries: [],
    } ];
    var tail_throw = '\nif (typeof UFUZZ_ERROR == "object") throw UFUZZ_ERROR;\n';
    var re = /(?:(?:^|[\s{}):;])try|}\s*catch\s*\(([^()[{]+)\)|}\s*finally)\s*(?={)/g;
    while (stack.length) {
        var code = stack[0].code;
        var offset = stack[0].offset;
        var tries = stack[0].tries;
        var match;
        re.lastIndex = stack.shift().index;
        while (match = re.exec(code)) {
            var index = match.index + match[0].length + 1;
            if (/(?:^|[\s{}):;])try\s*$/.test(match[0])) {
                tries.unshift({ try: index - offset });
                continue;
            }
            var insert;
            if (/}\s*finally\s*$/.test(match[0])) {
                tries.shift();
                insert = tail_throw;
            } else {
                while (tries.length && tries[0].catch) tries.shift();
                tries[0].catch = index - offset;
                insert = [
                    "if (!" + match[1] + ".ufuzz_var) {",
                        match[1] + '.ufuzz_var = "' + match[1] + '";',
                        match[1] + ".ufuzz_try = " + tries[0].try + ";",
                        match[1] + ".ufuzz_catch = " + tries[0].catch + ";",
                        "UFUZZ_ERROR = " + match[1] + ";",
                    "}",
                    "throw " + match[1] + ";",
                ].join("\n");
            }
            var new_code = code.slice(0, index) + insert + code.slice(index) + tail_throw + "var UFUZZ_ERROR;";
            var result = run_code(new_code, toplevel);
            if (!sandbox.is_error(result)) {
                if (!stack.filled && match[1]) stack.push({
                    code: code,
                    index: index && index - 1,
                    offset: offset,
                    tries: JSON.parse(JSON.stringify(tries)),
                });
                offset += insert.length;
                code = new_code;
            } else if (is_error_in(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("invalid `in`");');
            } else if (is_error_tdz(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("TDZ");');
            } else if (is_error_spread(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("spread not iterable");');
            } else if (is_error_recursion(result)) {
                patch(result.ufuzz_try, 'throw new Error("skipping infinite recursion");');
            } else if (is_error_set_property(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("cannot set property");');
            } else if (is_error_destructuring(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("cannot destructure");');
            } else if (is_error_class_constructor(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("missing new for class");');
            } else if (is_error_getter_only_property(result)) {
                patch(result.ufuzz_catch, result.ufuzz_var + ' = new Error("setting getter-only property");');
            }
        }
        stack.filled = true;
    }
}
