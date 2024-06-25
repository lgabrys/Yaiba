(function(OPT) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        function scan_ref_scoped(node, descend, init) {
            if (node instanceof AST_ForIn) {
                if (!compressor.option("loops")) return;
            }
        }
    });
})(function(node, optimizer) {
