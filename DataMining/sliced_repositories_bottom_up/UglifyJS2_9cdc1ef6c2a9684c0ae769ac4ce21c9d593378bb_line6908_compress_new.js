(function(OPT) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var scope = this;
        var tw = new TreeWalker(function(node, descend) {
            if (scope === self) {
                if (node instanceof AST_LambdaDefinition) {
                    if (tw.parent() instanceof AST_ExportDefault) {
                        return scan_ref_scoped(node, descend, true);
                    }
                }
            }
        });
    });
})(function(node, optimizer) {
