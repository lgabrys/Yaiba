var U = require("..");
var List = U.List;
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
    var result_cache = Object.create(null);
    var test_for_diff = compare_run_code;
    var differs = test_for_diff(testcase, minify_options, result_cache, max_timeout);
    if (differs && differs.error && [ "DefaultsError", "SyntaxError" ].indexOf(differs.error.name) < 0) {
        test_for_diff = test_minify;
    }
};
