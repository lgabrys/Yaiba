(function(OPT) {
    function is_lambda(node) {
    }
    function is_funarg(def) {
    }
    OPT(AST_SymbolRef, function(self, compressor) {
        var parent = compressor.parent();
        if (compressor.option("reduce_vars") && is_lhs(compressor.self(), parent) !== compressor.self()) {
            var def = self.definition();
            var fixed = self.fixed_value();
            var single_use = def.single_use && !(parent instanceof AST_Call && parent.is_expr_pure(compressor));
            if (single_use) {
                if (is_lambda(fixed)) {
                        && (!compressor.option("reduce_funcs") || def.escaped.depth == 1 || fixed.inlined)) {
                        single_use = false;
                    } else if (recursive_ref(compressor, def)) {
                        single_use = false;
                    } else if (fixed.name && fixed.name.definition() !== def) {
                        single_use = false;
                    } else if (fixed.parent_scope !== self.scope.resolve() || is_funarg(def)) {
                    } else if (fixed.name && (fixed.name.name == "await" && is_async(fixed)
                } else if (!fixed || !fixed.is_constant_expression() || fixed.drop_side_effect_free(compressor)) {
            }
        }
    });
})(function(node, optimizer) {
