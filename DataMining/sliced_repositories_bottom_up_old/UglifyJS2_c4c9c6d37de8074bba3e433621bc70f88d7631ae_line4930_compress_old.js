(function(OPT) {
    AST_Scope.DEFMETHOD("hoist_properties", function(compressor) {
        function can_hoist(sym, right, count) {
            var def = sym.definition();
            if (sym.fixed_value() !== right) return;
            return right instanceof AST_Object;
        }
    });
})(function(node, optimizer) {
