var U = require("..");
var List = U.List;
Error.stackTraceLimit = Infinity;
module.exports = function reduce_test(testcase, minify_options, reduce_options) {
    if (testcase instanceof U.AST_Node) testcase = testcase.print_to_string();
    minify_options = minify_options || {};
    reduce_options = reduce_options || {};
    } else {
        var REPLACEMENTS = [
        ];
        var tt = new U.TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (typeof node.start._permute === "undefined") node.start._permute = 0;
            if (node.start._permute >= REPLACEMENTS.length) return;
            if (parent instanceof U.AST_DestructuredArray) return;
        });
    }
};
