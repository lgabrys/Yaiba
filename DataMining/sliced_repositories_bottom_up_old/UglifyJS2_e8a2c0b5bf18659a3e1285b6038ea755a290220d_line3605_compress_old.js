function Compressor(options, false_by_default) {
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
    } : {
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
});
(function(OPT) {
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.chained = false;
            def.direct_access = false;
            def.escaped = false;
            def.fixed = !def.scope.pinned()
            if (def.fixed instanceof AST_Defun && !all(def.references, function(ref) {
            })) {
                tw.defun_ids[def.id] = false;
            }
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }
        function reset_variables(tw, compressor, scope) {
            scope.variables.each(function(def) {
            });
        }
    })(function(node, func) {
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var drop_vars = !(self instanceof AST_Toplevel) || compressor.toplevel.vars;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
        };
        var in_use_ids = Object.create(null); // avoid expensive linear scans of in_use
        var fixed_ids = Object.create(null);
        if (self instanceof AST_Toplevel && compressor.top_retain) {
            self.variables.each(function(def) {
                if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                    in_use_ids[def.id] = true;
                }
            });
        }
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Lambda && node.uses_arguments && !tw.has_directive("use strict")) {
                node.argnames.forEach(function(argname) {
                    var def = argname.definition();
                    if (!(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                });
            }
            if (node instanceof AST_Defun) {
                var node_def = node.name.definition();
                if (!drop_funcs && scope === self) {
                    if (!(node_def.id in in_use_ids)) {
                        in_use_ids[node_def.id] = true;
                    }
                }
            }
            if (node instanceof AST_Definitions && scope === self) {
                node.definitions.forEach(function(def) {
                    var node_def = def.name.definition();
                    if (!drop_vars) {
                        if (!(node_def.id in in_use_ids)) {
                            in_use_ids[node_def.id] = true;
                        }
                    }
                    if (def.value) {
                        if (!node_def.chained && def.name.fixed_value() === def.value) {
                            fixed_ids[node_def.id] = def;
                        }
                    }
                });
            }
        });
        tw = new TreeWalker(scan_ref_scoped);
        var drop_fn_name = compressor.option("keep_fnames") ? return_false : compressor.option("ie8") ? function(def) {
        } : function(def) {
        var tt = new TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
                if (sym) {
                    var def = sym.definition();
                }
            }
            if (node instanceof AST_Function && node.name && drop_fn_name(node.name.definition())) {
                node.name = null;
            }
            if (node instanceof AST_Lambda && !(node instanceof AST_Accessor)) {
                for (var a = node.argnames, i = a.length; --i >= 0;) {
                    var sym = a[i];
                    if (!(sym.definition().id in in_use_ids)) {
                        sym.__unused = true;
                    } else {
                }
            }
            if (drop_funcs && node instanceof AST_Defun && node !== self) {
                var def = node.name.definition();
                if (!(def.id in in_use_ids)) {
                    def.eliminated++;
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                node.definitions.forEach(function(def) {
                    if (def.value) def.value = def.value.transform(tt);
                    var sym = def.name.definition();
                    if (!drop_vars || sym.id in in_use_ids) {
                        if (def.value && sym.id in fixed_ids && fixed_ids[sym.id] !== def) {
                            def.value = def.value.drop_side_effect_free(compressor);
                        }
                        if (var_defs.length > 1 && (!def.value || sym.orig.indexOf(def.name) > sym.eliminated)) {
                            if (def.value) {
                                var assign = make_node(AST_Assign, def, {
                                });
                                if (fixed_ids[sym.id] === def) {
                                    fixed_ids[sym.id] = assign;
                                }
                            }
                            sym.eliminated++;
                        }
                            && (!compressor.has_directive("use strict") || parent instanceof AST_Scope)) {
                            var defun = make_node(AST_Defun, def, def.value);
                            defun.name = make_node(AST_SymbolDefun, def.name, def.name);
                            self.def_function(defun.name);
                        } else {
                    } else if (sym.orig[0] instanceof AST_SymbolCatch) {
                });
            }
        });
    });
})(function(node, optimizer) {
