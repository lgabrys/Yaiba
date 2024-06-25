(function(OPT) {
    function is_lhs(node, parent) {
    }
    function recursive_ref(compressor, def) {
    }
    OPT(AST_SymbolRef, function(self, compressor) {
        var parent = compressor.parent();
        if (compressor.option("reduce_vars") && is_lhs(compressor.self(), parent) !== compressor.self()) {
            var def = self.definition();
            var fixed = self.fixed_value();
            var single_use = def.single_use && !(parent instanceof AST_Call && parent.is_expr_pure(compressor));
            if (single_use) {
                if (fixed instanceof AST_Lambda) {
                        && (!compressor.option("reduce_funcs") || def.escaped.depth == 1 || fixed.inlined)) {
                        single_use = false;
                    } else if (recursive_ref(compressor, def)) {
                        single_use = false;
                    } else if (fixed.name && fixed.name.definition() !== def) {
                    } else if (def.scope !== self.scope || def.orig[0] instanceof AST_SymbolFunarg) {
                } else if (!fixed || !fixed.is_constant_expression()) {
            }
        }
    });
})(function(node, optimizer) {
