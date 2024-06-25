(function(OPT) {
    (function(def) {
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
            } else if (this.TYPE == "Call"
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
    })(function(node, func) {
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    AST_Call.DEFMETHOD("is_call_pure", function(compressor) {
        var dot = this.expression;
        var exp = dot.expression;
        var map;
        var prop = dot.property;
        if (exp instanceof AST_Array) {
            map = native_fns.Array;
        } else if (exp.is_boolean(compressor)) {
            map = native_fns.Boolean;
        } else if (exp.is_number(compressor)) {
            map = native_fns.Number;
        } else if (exp instanceof AST_RegExp) {
            map = native_fns.RegExp;
        } else if (exp.is_string(compressor)) {
            map = native_fns.String;
        } else if (!dot.may_throw_on_access(compressor)) {
            map = native_fns.Object;
        }
        return map && map[prop];
    });
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
                        if (!node_def.chained && def.name.fixed_value(true) === def.value) {
                            fixed_ids[node_def.id] = def;
                        }
                    }
                });
            }
        });
        tw = new TreeWalker(scan_ref_scoped);
        var tt = new TreeTransformer(function(node, descend, in_list) {
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
                if (sym) {
                    var def = sym.definition();
                    var in_use = def.id in in_use_ids;
                    if (node instanceof AST_Assign) {
                        if (!in_use || node.left === sym && def.id in fixed_ids && fixed_ids[def.id] !== node) {
                            if (node.write_only === true) {
                            }
                        }
                    } else if (!in_use) {
                }
            }
        });
    });
})(function(node, optimizer) {
