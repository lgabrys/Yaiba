(function(OPT) {
    function is_lambda(node) {
    }
    AST_Scope.DEFMETHOD("merge_variables", function(compressor) {
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Call) {
                var exp = node.expression;
                var tail = exp.tail_node();
                if (!is_lambda(tail)) {
                }
            }
        });
    });
})(function(node, optimizer) {
