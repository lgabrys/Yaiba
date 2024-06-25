function Compressor(options, false_by_default) {
    } else {
    }
    var top_retain = this.options["top_retain"];
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
}
(function(OPT) {
    function read_property(obj, node) {
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
    }
    function is_arguments(def) {
    }
    (function(def) {
        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (has_escaped(d, node, parent)) {
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
            } else if (value_in_use(node, parent)) {
            } else if (parent instanceof AST_PropAccess && parent.expression === node) {
                value = read_property(value, parent);
                mark_escaped(tw, d, scope, parent, value, level + 1, depth + 1);
            }
            d.direct_access = true;
        }
        function mark_assignment_to_arguments(node) {
        }
        function reduce_iife(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var hit = fn instanceof AST_AsyncFunction;
            var aborts = false;
            fn.walk(new TreeWalker(function(node) {
                if (hit) return aborts = true;
                if (node instanceof AST_Return) return hit = true;
            }));
            var safe = !fn.uses_arguments || tw.has_directive("use strict");
            var safe_ids = tw.safe_ids;
            if (!aborts) tw.safe_ids = safe_ids;
            function visit(node, fixed) {
                var d = node.definition();
                if (fixed && safe && d.fixed === undefined) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    d.fixed = fixed;
                    d.fixed.assigns = [ node ];
                } else {
                    d.fixed = false;
                }
            }
        }
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (is_function(exp)) {
                var iife = !exp.name;
                this.args.forEach(function(arg) {
                    if (arg instanceof AST_Spread) iife = false;
                });
                if (iife) exp.reduce_vars = reduce_iife;
            } else if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
            } else if (this.TYPE == "Call"
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
    })(function(node, func) {
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (is_function(fn)
                    && (iife = compressor.parent()) instanceof AST_Call
                    })) {
                    var has_await = is_async(fn) ? function(node) {
                    } : function(node) {
                    };
                }
            }
        }
        function handle_if_return(statements, compressor) {
            for (var i = statements.length; --i >= 0;) {
                if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                        && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
                        stat.alternative = make_node(AST_BlockStatement, next, {
                            body: [
                                make_node(AST_Return, next, {
                                })
                            ]
                        });
                    }
                }
            }
            function has_multiple_if_returns(statements) {
            }
        }
    }

    (function(def) {
        def(AST_Binary, function(compressor) {
            if (this.operator != "+") return false;
        });
    })(function(node, func) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
        };
        var find_variable = function(name) {
            find_variable = compose(self, 0, noop);
            function compose(child, level, find) {
            }
        };
        var assignments = new Dictionary();
        var tw = new TreeWalker(function(node, descend) {
        });
        tw.directives = Object.create(compressor.directives);
        tw = new TreeWalker(scan_ref_scoped);
            && self.body[0].value == "use strict") {
            self.body.length = 0;
        }
        function get_init_symbol(for_in) {
        }
        function scan_ref_scoped(node, descend, init) {
            if (node instanceof AST_Assign && node.left instanceof AST_SymbolRef) {
                var def = node.left.definition();
                if (def.scope === self) assignments.add(def.id, node);
            }
            if (node instanceof AST_Unary && node.expression instanceof AST_SymbolRef) {
                var def = node.expression.definition();
                if (def.scope === self) assignments.add(def.id, node);
            }
            var node_def, props = [], sym = assign_as_unused(node, props);
            if (sym && self.variables.get(sym.name) === (node_def = sym.definition())
                && !(is_arguments(node_def) && !all(self.argnames, function(argname) {
                    return !argname.match_symbol(function(node) {
                        if (node instanceof AST_SymbolFunarg) {
                            var def = node.definition();
                        }
                    }, true);
                }))) {
            if (node instanceof AST_ForIn) {
                if (node.init.has_side_effects(compressor)) return;
                var sym = get_init_symbol(node);
                if (!sym) return;
                var def = sym.definition();
                if (def.scope !== self) {
                    var d = find_variable(sym.name);
                    if ((d && d.redefined() || d) === def) return;
                }
                node.object.walk(tw);
            }
        }
    });
})(function(node, optimizer) {
