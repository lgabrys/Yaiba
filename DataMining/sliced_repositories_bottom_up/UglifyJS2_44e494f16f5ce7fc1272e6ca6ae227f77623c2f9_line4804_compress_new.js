(function(OPT) {
    AST_Scope.DEFMETHOD("merge_variables", function(compressor) {
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Call) {
                var exp = node.expression;
                var tail = exp.tail_node();
                if (!is_function(tail)) return;
            }
        });
    });
})(function(node, optimizer) {
