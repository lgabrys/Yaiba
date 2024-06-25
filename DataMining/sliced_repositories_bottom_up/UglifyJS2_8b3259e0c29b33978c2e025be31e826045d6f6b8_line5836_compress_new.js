(function(OPT) {
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.chained = false;
            def.direct_access = false;
            def.escaped = false;
            def.fixed = !def.scope.pinned()
            })) {
                tw.defun_ids[def.id] = false;
            }
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }
        def(AST_SymbolRef, function(tw, descend, compressor) {
            var d = this.definition();
            var value;
            if (d.fixed === undefined || !safe_to_read(tw, d)) {
                d.fixed = false;
            } else if (d.fixed) {
                value = this.fixed_value();
                if (value instanceof AST_Lambda && recursive_ref(tw, d)) {
                    d.recursive_refs++;
                } else if (value && ref_once(tw, compressor, d)) {
                    d.single_use = value instanceof AST_Lambda && !value.pinned()
                } else {
                    d.single_use = false;
                }
                if (is_modified(compressor, tw, this, value, 0, is_immutable(value))) {
                    if (d.single_use) {
                        d.single_use = "m";
                    } else {
                        d.fixed = false;
                    }
                }
            }
        });
    })(function(node, func) {
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    function is_lhs(node, parent) {
    }
    OPT(AST_SymbolRef, function(self, compressor) {
        var parent = compressor.parent();
        if (compressor.option("reduce_vars") && is_lhs(self, parent) !== self) {
            var def = self.definition();
            var fixed = self.fixed_value();
            var single_use = def.single_use && !(parent instanceof AST_Call && parent.is_expr_pure(compressor));
            if (single_use && fixed instanceof AST_Lambda) {
                    && (!compressor.option("reduce_funcs") || def.escaped == 1 || fixed.inlined)) {
                    single_use = false;
                } else if (recursive_ref(compressor, def)) {
                    single_use = false;
                } else if (def.scope !== self.scope || def.orig[0] instanceof AST_SymbolFunarg) {
                    single_use = fixed.is_constant_expression(self.scope);
                }
            }
            if (single_use && fixed) {
                def.single_use = false;
                fixed._squeezed = true;
                if (fixed instanceof AST_Defun) {
                    fixed = make_node(AST_Function, fixed, fixed);
                    fixed.name = make_node(AST_SymbolLambda, fixed.name, fixed.name);
                }
                var value;
                if (def.recursive_refs > 0) {
                    value = fixed.clone(true);
                    var defun_def = value.name.definition();
                    var lambda_def = value.variables.get(value.name.name);
                    var name = lambda_def && lambda_def.orig[0];
                    if (!(name instanceof AST_SymbolLambda)) {
                        name = make_node(AST_SymbolLambda, value.name, value.name);
                        name.scope = value;
                        value.name = name;
                        lambda_def = value.def_function(name);
                    }
                    value.walk(new TreeWalker(function(node) {
                        var def = node.definition();
                        if (def === defun_def) {
                            node.thedef = lambda_def;
                        } else {
                            def.single_use = false;
                            var fn = node.fixed_value();
                            if (fixed.variables.get(fn.name.name) !== fn.name.definition()) return;
                        }
                    }));
                } else {
            }
        }
    });
})(function(node, optimizer) {
