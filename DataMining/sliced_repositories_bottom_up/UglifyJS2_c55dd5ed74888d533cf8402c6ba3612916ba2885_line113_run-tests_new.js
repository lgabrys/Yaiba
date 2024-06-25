var U = require("../tools/node");
var fs = require("fs");
function log_directory(dir) {
}
function find_test_files(dir) {
}
function test_directory(dir) {
}
function as_toplevel(input) {
    if (input instanceof U.AST_BlockStatement) input = input.body;
    else if (input instanceof U.AST_Statement) input = [ input ];
}
function run_compress_tests() {
    var dir = test_directory("compress");
    var files = find_test_files(dir);
    function test_file(file) {
        function test_case(test) {
            var options = U.defaults(test.options, {
                warnings: false
            });
            var warnings_emitted = [];
            if (test.expect_warnings) {
                U.AST_Node.warn_function = function(text) {
                    warnings_emitted.push("WARN: " + text);
                };
                options.warnings = true;
            }
            var cmp = new U.Compressor(options, true);
            var input = as_toplevel(test.input);
            if (test.mangle_props) {
                input = U.mangle_properties(input, test.mangle_props);
            }
            var output = cmp.compress(input);
        }
    }
}
