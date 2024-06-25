
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
var num_iterations = +process.argv[2] || 1/0;
for (var i = 2; i < process.argv.length; ++i) {
    switch (process.argv[i]) {
        MAX_GENERATED_TOPLEVELS_PER_RUN = +process.argv[++i];
        break;
        MAX_GENERATION_RECURSION_DEPTH = +process.argv[++i];
        var name = process.argv[++i];
        STMT_FIRST_LEVEL_OVERRIDE = STMT_ARG_TO_ID[name];
        break;
        var name = process.argv[++i];
        STMT_SECOND_LEVEL_OVERRIDE = STMT_ARG_TO_ID[name];
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
var ASSIGNMENTS = [
    "+=",
    "+=",
];
var CAN_BREAK = true;
var CAN_CONTINUE = true;
var unique_vars = [];
function rng(max) {
}
function createTopLevelCode() {
    unique_vars.length = 0;
}
function createFunctions(n, recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (n-- > 0) {
    }
}
function createFunction(recurmax, allowDefun, canThrow, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    if (!STMT_COUNT_FROM_GLOBAL) stmtDepth = 0;
    } else {
        unique_vars.length -= 3;
    }
}
function createStatements(n, recurmax, canThrow, canBreak, canContinue, cannotReturn, stmtDepth) {
    if (--recurmax < 0) { return ";"; }
    while (--n > 0) {
    }
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
        switch (rng(3)) {
            unique_vars.pop();
        }
    }
}
function createSwitchParts(recurmax, n, canThrow, canBreak, canContinue, cannotReturn, stmtDepth) {
    var hadDefault = false;
    var s = [""];
    canBreak = enableLoopControl(canBreak, CAN_BREAK);
    while (n-- > 0) {
        } else {
            hadDefault = true;
        }
    }
}
function patch_try_catch(orig, toplevel) {
    var stack = [ {
        code: orig,
        index: 0,
        offset: 0,
        tries: [],
    } ];
    var re = /(?:(?:^|[\s{}):;])try|}\s*catch\s*\(([^)]+)\)|}\s*finally)\s*(?={)/g;
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
                insert = 'if (typeof UFUZZ_ERROR == "object") throw UFUZZ_ERROR;';
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
            var new_code = code.slice(0, index) + insert + code.slice(index);
            var result = sandbox.run_code(new_code, toplevel);
            if (typeof result != "object" || typeof result.name != "string" || typeof result.message != "string") {
                if (!stack.filled && match[1]) stack.push({
                    code: code,
                    index: index,
                    offset: offset,
                    tries: JSON.parse(JSON.stringify(tries)),
                }
                offset += insert.length;
                code = new_code;
            }
                index = result.ufuzz_catch;
                return orig.slice(0, index) + result.ufuzz_var + ' = new Error("invalid `in`");' + orig.slice(index);
            } else if (result.name == "RangeError" && result.message == "Maximum call stack size exceeded") {
                index = result.ufuzz_try;
                return orig.slice(0, index) + 'throw new Error("skipping infinite recursion");' + orig.slice(index);
            }
        }
        stack.filled = true;
    }
}
