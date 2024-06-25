function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
            return !member(node.expression.print_to_string(), pure_funcs);
        };
    } else {
    }
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
            return top_retain.test(def.name);
        };
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
        if (def.exported) return true;
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        node.hoist_exports(this);
        var passes = +this.options.passes || 1;
        var min_count = 1 / 0;
        var stopping = false;
        for (var pass = 0; pass < passes; pass++) {
            node = node.transform(this);
            if (passes > 1) {
                var count = 0;
                node.walk(new TreeWalker(function() {
                    count++;
                }));
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
        if (node._squeezed) return node;
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
            node.hoist_properties(this);
        }
        // This corrupts TreeWalker.stack, which cause AST look-ups to malfunction.
        var opt = node.optimize(this);
        if (opt === node) opt._squeezed = true;
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
    });
    AST_Toplevel.DEFMETHOD("hoist_exports", function(compressor) {
        var body = this.body, props = [];
        for (var i = 0; i < body.length; i++) {
            var stat = body[i];
            if (stat instanceof AST_ExportDeclaration) {
                body[i] = stat = stat.body;
                if (stat instanceof AST_Definitions) {
                } else {
            } else if (stat instanceof AST_ExportReferences) {
        }
        function export_symbol(sym) {
            var node = make_node(AST_SymbolExport, sym, sym);
            node.alias = node.name;
        }
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
                return make_node(AST_Return, node, {
                });
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
        if (value instanceof AST_Array) return native_fns.Array[name];
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
            return;
        }
        if (parent instanceof AST_Conditional) {
        }
        if (parent instanceof AST_Sequence) {
            if (parent.tail_node() !== node) return;
        }
    }
    function cross_scope(def, sym) {
        do {
        } while (sym = sym.parent_scope);
    }
    function can_drop_symbol(ref, keep_lambda) {
        var def = ref.definition();
        return all(def.orig, function(sym) {
            return !(sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet
                || keep_lambda && sym instanceof AST_SymbolLambda);
        });
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
                && !(def.init instanceof AST_LambdaExpression && def.init !== def.scope)
                && def.init;
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
                    if (def.init instanceof AST_LambdaDefinition && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
        }
        function safe_to_read(tw, def) {
            var safe = tw.safe_ids[def.id];
            if (safe) {
                if (!HOP(tw.safe_ids, def.id)) safe.read = safe.read && safe.read !== tw.safe_ids ? true : tw.safe_ids;
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                }
                return !safe.assign || safe.assign === tw.safe_ids;
            }
        }
        function safe_to_assign(tw, def, declare) {
            if (def.fixed === undefined) return declare || all(def.orig, function(sym) {
                return !(sym instanceof AST_SymbolLet);
            });
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
            if (def.fixed != null && safe.read) {
                if (tw.loop_ids[def.id] !== tw.in_loop) return false;
            }
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    var save = fixed;
                    if (save) fixed = function() {
                    };
                    fixed = save;
                }
                if (node instanceof AST_DestructuredArray) {
                    var save = fixed;
                    node.elements.forEach(function(node, index) {
                        if (save) fixed = function() {
                            return make_node(AST_Sub, node, {
                                property: make_node(AST_Number, node, {
                                    value: index
                                })
                            });
                        };
                    });
                    if (node.rest) {
                        if (save) fixed = compressor.option("rests") && function() {
                        };
                    }
                    fixed = save;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save = fixed;
                    if (node.rest) {
                        fixed = false;
                    }
                    fixed = save;
                }
                visit(node, fixed, function() {
                    var save_len = tw.stack.length;
                    tw.stack.length = save_len;
                });
            });
            lhs.walk(scanner);
        }
        function reduce_iife(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var hit = is_async(fn) || is_generator(fn);
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
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var left = node.left;
            if (node.operator == "=" && left.equivalent_to(node.right) && !left.has_side_effects(compressor)) {
                node.__drop = true;
            } else if (!(left instanceof AST_Destructured || left instanceof AST_SymbolRef)) {
            } else if (node.operator == "=") {
                scan_declaration(tw, compressor, left, function() {
                }, function(sym, fixed, walk) {
                    var d = sym.definition();
                    d.assignments++;
                        && safe_to_assign(tw, d)) {
                        if (d.single_use && left instanceof AST_Destructured) d.single_use = false;
                        tw.loop_ids[d.id] = tw.in_loop;
                        sym.fixed = d.fixed = fixed;
                        sym.fixed.assigns = [ node ];
                    } else {
                        d.fixed = false;
                    }
                });
            } else {
                var d = left.definition();
                d.assignments++;
                var fixed = d.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    d.fixed = false;
                }
                var safe = safe_to_read(tw, d);
                if (safe && !left.in_arg && safe_to_assign(tw, d)) {
                    if (d.single_use) d.single_use = false;
                    left.fixed = d.fixed = function() {
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
                } else {
                    d.fixed = false;
                }
            }
        });
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (exp instanceof AST_LambdaExpression) {
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
        def(AST_ForEnumeration, function(tw, descend, compressor) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            var init = this.init;
            if (init instanceof AST_Definitions) {
                init.definitions[0].name.mark_symbol(function(node) {
                    if (node instanceof AST_SymbolDeclaration) {
                        var def = node.definition();
                        def.assignments++;
                        def.fixed = false;
                    }
                }, tw);
            } else if (init instanceof AST_Destructured || init instanceof AST_SymbolRef) {
                init.mark_symbol(function(node) {
                    if (node instanceof AST_SymbolRef) {
                        var def = node.definition();
                        def.assignments++;
                        if (!node.is_immutable()) def.fixed = false;
                    }
                }, tw);
            } else {
            tw.in_loop = saved_loop;
        });
        def(AST_LabeledStatement, function(tw) {
            return true;
        });
        def(AST_Switch, function(tw, descend, compressor) {
            this.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
            this.body.forEach(function(branch) {
                branch.expression.walk(tw);
            })
        });
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            var d = exp.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (safe_to_read(tw, d) && !exp.in_arg && safe_to_assign(tw, d)) {
                if (d.single_use) d.single_use = false;
                d.fixed = function() {
                    return make_node(AST_Binary, node, {
                        right: make_node(AST_Number, node, {
                        })
                    });
                };
                d.fixed.assigns = fixed && fixed.assigns ? fixed.assigns.slice() : [];
                if (node instanceof AST_UnaryPrefix) {
                    exp.fixed = d.fixed;
                } else {
                    exp.fixed = function() {
                    };
                    exp.fixed.assigns = fixed && fixed.assigns;
                }
            } else {
                d.fixed = false;
            }
        });
    })(function(node, func) {
    function in_async_generator(scope) {
    }
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    function is_lexical_definition(stat) {
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
            function get_lhs(expr) {
            }
            function get_rvalue(expr) {
            }
        }
        function sequencesize_2(statements, compressor) {
            function cons_seq(right) {
                n--;
                var left = prev.body;
            }
            var n = 0, prev;
            for (var i = 0; i < statements.length; i++) {
                var stat = statements[i];
                if (prev) {
                    if (stat instanceof AST_Exit) {
                        if (stat.value || !in_async_generator(scope)) {
                            stat.value = cons_seq(stat.value || make_node(AST_Undefined, stat)).transform(compressor);
                        }
                    } else if (stat instanceof AST_For) {
                        if (!(stat.init instanceof AST_Definitions)) {
                            var abort = false;
                            prev.body.walk(new TreeWalker(function(node) {
                                if (node instanceof AST_Binary && node.operator == "in") {
                                    abort = true;
                                }
                            }));
                            if (!abort) {
                                if (stat.init) stat.init = cons_seq(stat.init);
                                else {
                                    stat.init = prev.body;
                                    n--;
                                }
                            }
                        }
                    } else if (stat instanceof AST_ForIn) {
                        if (!is_lexical_definition(stat.init)) stat.object = cons_seq(stat.object);
                    }
                        stat.condition = cons_seq(stat.condition);
                }
            }
        }
    }
})(function(node, optimizer) {
