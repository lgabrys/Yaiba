(function(OPT) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        function get_rhs(assign) {
            var rhs = assign.right;
            if (!(rhs instanceof AST_Binary && lazy_op[rhs.operator])) return rhs;
            var sym = assign.left;
            if (!(sym instanceof AST_SymbolRef) || sym.name != rhs.left.name) return rhs;
            return rhs.right;
        }
    });
})(function(node, optimizer) {
