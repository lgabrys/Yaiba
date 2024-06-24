(function(OPT) {
    function is_funarg(def) {
    }
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
                        single_use = false;
                    } else if (fixed.parent_scope !== self.scope.resolve() || is_funarg(def)) {
                        single_use = fixed.is_constant_expression(self.scope);
                    } else if (fixed.name && fixed.name.name == "await" && is_async(fixed)) {
                        single_use = false;
                    }
                    if (single_use) fixed.parent_scope = self.scope;
                } else if (!fixed || !fixed.is_constant_expression()) {
                }
            }
        }
    });
})(function(node, optimizer) {
