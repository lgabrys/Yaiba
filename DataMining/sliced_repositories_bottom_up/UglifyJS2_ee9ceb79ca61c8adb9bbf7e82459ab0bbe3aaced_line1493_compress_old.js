(function(OPT) {
    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_PropAccess) {
            if (lhs.property == "__proto__") return true;
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                if (lhs.is_immutable()) return false;
                lhs = lhs.fixed_value();
            }
            if (!lhs) return true;
            if (lhs.is_constant()) return true;
            return is_lhs_read_only(lhs, compressor);
        }
    }
})(function(node, optimizer) {
