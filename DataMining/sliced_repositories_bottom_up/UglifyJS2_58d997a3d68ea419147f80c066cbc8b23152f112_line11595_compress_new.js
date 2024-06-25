(function(OPT) {
    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                lhs = lhs.fixed_value();
            }
        }
    }
    function extract_lhs(node, compressor) {
        if (node instanceof AST_Assign) return is_lhs_read_only(node.left, compressor) ? node : node.left;
        if (node instanceof AST_Sequence) return extract_lhs(node.tail_node(), compressor);
            return is_lhs_read_only(node.expression, compressor) ? node : node.expression;
    }
})(function(node, optimizer) {
