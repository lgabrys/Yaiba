function Compressor(options, false_by_default) {
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
        };
    } else {
    var top_retain = this.options["top_retain"];
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
            return member(def.name, top_retain);
        };
    }
    } : {
    };
}
merge(Compressor.prototype, {
    compress: function(node) {
        var passes = +this.options.passes || 1;
        var min_count = 1 / 0;
        var stopping = false;
        for (var pass = 0; pass < passes; pass++) {
            if (passes > 1) {
                var count = 0;
                node.walk(new TreeWalker(function() {
                    count++;
                }));
                AST_Node.info("pass " + pass + ": last_count: " + min_count + ", count: " + count);
                if (count < min_count) {
                    min_count = count;
                    stopping = false;
                } else if (stopping) {
                } else {
                    stopping = true;
                }
            }
        }
    },
    before: function(node, descend, in_list) {
        // Before https://github.com/mishoo/UglifyJS/pull/1602 AST_Node.optimize()
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
        }
    }
});
(function(OPT) {
    AST_Node.DEFMETHOD("equivalent_to", function(node) {
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
            if (!insert && node instanceof AST_Return) {
            }
            if (node instanceof AST_Lambda && node !== self) {
            }
            if (node instanceof AST_Block) {
                var index = node.body.length - 1;
                if (index >= 0) {
                    node.body[index] = node.body[index].transform(tt);
                }
            } else if (node instanceof AST_If) {
                node.body = node.body.transform(tt);
                if (node.alternative) {
                    node.alternative = node.alternative.transform(tt);
                }
            } else if (node instanceof AST_With) {
                node.body = node.body.transform(tt);
            }
        });
    });
    function read_property(obj, node) {
        var key = node.getProperty();
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
            key = "" + key;
        }
    }
    function is_read_only_fn(value, name) {
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        var lhs = is_lhs(node, parent);
        if (parent instanceof AST_PropAccess) {
            var prop = read_property(value, parent);
        }
    }
    function is_arguments(def) {
        var orig = def.orig;
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
            if (def.fixed instanceof AST_Defun && !all(def.references, function(ref) {
                var scope = ref.scope.resolve();
                do {
                } while (scope instanceof AST_Function && (scope = scope.parent_scope.resolve()));
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
                if (def.fixed === null) {
                    def.safe_ids = tw.safe_ids;
                } else if (def.fixed) {
                    tw.loop_ids[def.id] = tw.in_loop;
                }
            });
            scope.may_call_this = function() {
                scope.may_call_this = noop;
                scope.functions.each(function(def) {
                    if (def.init instanceof AST_Defun && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
        }
        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
                var marker = tw.defun_ids[def.id];
                if (!marker) return;
                } else {
                    tw.defun_ids[def.id] = false;
                }
            } else {
                if (!tw.in_loop) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                }
                tw.defun_ids[def.id] = false;
            }
        }
        function walk_defuns(tw, scope) {
            scope.functions.each(function(def) {
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
    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
        function find_loop_scope_try() {
            var node = compressor.self(), level = 0;
            do {
                if (node instanceof AST_Catch) {
                    if (!compressor.parent(level).bfinally) level++;
                } else if (node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                } else if (node instanceof AST_Try) {
                    if (!in_try) in_try = node;
                }
            } while (node = compressor.parent(level++));
        }
        function collapse(statements, compressor) {
            function is_last_node(node, parent) {
                if (node instanceof AST_Call) {
                    var def, fn = node.expression;
                    if (fn instanceof AST_SymbolRef) {
                        def = fn.definition();
                        fn = fn.fixed_value();
                    }
                    fn.collapse_scanning = true;
                }
                if (node instanceof AST_SymbolRef) {
                    var def = node.definition();
                    return (in_try || def.scope.resolve() !== scope) && !all(def.orig, function(sym) {
                        return !(sym instanceof AST_SymbolConst);
                    });
                }
            }
        }
    }
    function is_lhs(node, parent) {
    }
    OPT(AST_Const, function(self, compressor) {
        return all(self.definitions, function(defn) {
            var node = defn.name;
            var def = node.definition();
            var scope = def.scope.resolve();
            var s = def.scope;
            do {
                s = s.parent_scope;
                if (s.var_names()[node.name]) return false;
            } while (s !== scope);
        }) ? make_node(AST_Var, self, {
    });
})(function(node, optimizer) {
