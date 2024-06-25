(function(OPT) {
    AST_Scope.DEFMETHOD("merge_variables", function(compressor) {
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Scope) {
                if (node instanceof AST_LambdaExpression && !node.name && !is_async(node) && !is_generator(node)) {
                }
            }
        });
    });
})(function(node, optimizer) {
