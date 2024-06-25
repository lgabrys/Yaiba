var U = require("..");
var List = U.List;
var sandbox = require("./sandbox");
Error.stackTraceLimit = Infinity;
module.exports = function reduce_test(testcase, minify_options, reduce_options) {
    minify_options = minify_options || {};
    reduce_options = reduce_options || {};
    var print_options = {};
    [
    ].forEach(function(name) {
        var value = minify_options[name] || minify_options.output && minify_options.output[name];
        if (value) print_options[name] = value;
    });
    if (testcase instanceof U.AST_Node) testcase = testcase.print_to_string(print_options);
    var max_iterations = reduce_options.max_iterations || 1000;
    var max_timeout = reduce_options.max_timeout || 10000;
    var warnings = [];
    var log = reduce_options.log || function(msg) {
        warnings.push(msg);
    };
    var verbose = reduce_options.verbose;
    var minify_options_json = JSON.stringify(minify_options, null, 2);
    var result_cache = Object.create(null);
    var test_for_diff = compare_run_code;
    var differs = test_for_diff(testcase, minify_options, result_cache, max_timeout);
    if (differs && differs.error && [ "DefaultsError", "SyntaxError" ].indexOf(differs.error.name) < 0) {
        test_for_diff = test_minify;
        differs = test_for_diff(testcase, minify_options, result_cache, max_timeout);
    }
    if (!differs) {
        // same stdout result produced when minified
        return {
            code: [
                "// Can't reproduce test failure",
                "// minify options: " + to_comment(minify_options_json)
            ].join("\n"),
            warnings: warnings,
        };
    } else if (differs.timed_out) {
        return {
            code: [
                "// Can't reproduce test failure within " + max_timeout + "ms",
                "// minify options: " + to_comment(minify_options_json)
            ].join("\n"),
            warnings: warnings,
        };
    } else if (differs.error) {
        differs.warnings = warnings;
        return differs;
    } else if (sandbox.is_error(differs.unminified_result)
        && sandbox.is_error(differs.minified_result)
        && differs.unminified_result.name == differs.minified_result.name) {
        return {
            code: [
                "// No differences except in error message",
                "// minify options: " + to_comment(minify_options_json)
            ].join("\n"),
            warnings: warnings,
        };
    } else {
        max_timeout = Math.min(100 * differs.elapsed, max_timeout);
        var REPLACEMENTS = [
            // "null", "''", "false", "'foo'", "undefined", "9",
            "1", "0",
        ];
            }
        var diff_error_message;
        for (var pass = 1; pass <= 3; ++pass) {
            var testcase_ast = U.parse(testcase);
            if (diff_error_message === testcase) {
                var code = testcase_ast.print_to_string(print_options);
                var diff = test_for_diff(code, minify_options, result_cache, max_timeout);
                if (diff && !diff.timed_out && !diff.error) {
                    testcase = code;
                    differs = diff;
                } else {
                    testcase_ast = U.parse(testcase);
                }
            }
            diff_error_message = null;
            for (var c = 0; c < max_iterations; ++c) {
                if (verbose && pass == 1 && c % 25 == 0) {
                    log("// reduce test pass " + pass + ", iteration " + c + ": " + testcase.length + " bytes");
                }
            }
        }
    }
};
