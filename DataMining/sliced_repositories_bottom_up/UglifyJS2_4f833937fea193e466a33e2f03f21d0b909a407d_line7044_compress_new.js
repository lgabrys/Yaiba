













function Compressor(options, false_by_default) {
    this.options = defaults(options, {
        arguments       : !false_by_default,
        assignments     : !false_by_default,
        booleans        : !false_by_default,
        collapse_vars   : !false_by_default,
        comparisons     : !false_by_default,
        conditionals    : !false_by_default,
        dead_code       : !false_by_default,
        directives      : !false_by_default,
        drop_console    : false,
        drop_debugger   : !false_by_default,
        evaluate        : !false_by_default,
        expression      : false,
        functions       : !false_by_default,
        global_defs     : false,
        hoist_funs      : false,
        hoist_props     : !false_by_default,
        hoist_vars      : false,
        ie8             : false,
        if_return       : !false_by_default,
        inline          : !false_by_default,
        join_vars       : !false_by_default,
        keep_fargs      : false_by_default || "strict",
        keep_fnames     : false,
        keep_infinity   : false,
        loops           : !false_by_default,
        merge_vars      : !false_by_default,
        negate_iife     : !false_by_default,
        objects         : !false_by_default,
        passes          : 1,
        properties      : !false_by_default,
        pure_getters    : !false_by_default && "strict",
        pure_funcs      : null,
        reduce_funcs    : !false_by_default,
        reduce_vars     : !false_by_default,
        sequences       : !false_by_default,
        side_effects    : !false_by_default,
        strings         : !false_by_default,
        switches        : !false_by_default,
        top_retain      : null,
        toplevel        : !!(options && options["top_retain"]),
        typeofs         : !false_by_default,
        unsafe          : false,
        unsafe_comps    : false,
        unsafe_Function : false,
        unsafe_math     : false,
        unsafe_proto    : false,
        unsafe_regexp   : false,
        unsafe_undefined: false,
        unused          : !false_by_default,
    }, true);
    var global_defs = this.options["global_defs"];
    if (typeof global_defs == "object") for (var key in global_defs) {
        if (/^@/.test(key) && HOP(global_defs, key)) {
            global_defs[key.slice(1)] = parse(global_defs[key], {
                expression: true
            });
        }
    }
    var keep_fargs = this.options["keep_fargs"];
    this.drop_fargs = keep_fargs == "strict" ? function(lambda, parent) {
        var name = lambda.name;
        if (!name) return parent && parent.TYPE == "Call" && parent.expression === lambda;
        if (name.fixed_value() !== lambda) return false;
        var def = name.definition();
    } : keep_fargs ? return_false : return_true;
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
        this.pure_funcs = pure_funcs;
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
        }
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
            return !member(node.expression.print_to_string(), pure_funcs);
        }
    }
        this.pure_funcs = return_true;
    }
    var sequences = this.options["sequences"];
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
            return top_retain.test(def.name);
        };
    }
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
            return member(def.name, top_retain);
        };
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
        vars: /vars/.test(toplevel)
    } : {
        funcs: toplevel,
        vars: toplevel
    };
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
        if (def.undeclared) return true;
        var toplevel = this.toplevel;
        return !all(def.orig, function(sym) {
            return toplevel[sym instanceof AST_SymbolDefun ? "funcs" : "vars"];
        });
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        if (this.option("expression")) {
            node.process_expression(true);
        }
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
        return node;
    },
    before: function(node, descend, in_list) {
        var is_scope = node instanceof AST_Scope;
        // Before https://github.com/mishoo/UglifyJS/pull/1602 AST_Node.optimize()
        // produced after OPT().
        // This corrupts TreeWalker.stack, which cause AST look-ups to malfunction.
        // Migrate and defer all children's AST_Node.transform() to below, which
        // will now happen after this parent AST_Node has been properly substituted
        // thus gives a consistent AST snapshot.
        descend(node, this);
        // output and performance.
        descend(node, this);
        var opt = node.optimize(this);
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
        }
        if (opt === node) opt._squeezed = true;
        return opt;
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
    });
    AST_Node.DEFMETHOD("equivalent_to", function(node) {
        return this.TYPE == node.TYPE && this.print_to_string() == node.print_to_string();
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
                return make_node(AST_Return, node, {
                    value: node.body
                });
            }
            if (!insert && node instanceof AST_Return) {
                return transform ? transform(node) : make_node(AST_SimpleStatement, node, {
                    body: node.value || make_node(AST_UnaryPrefix, node, {
                        operator: "void",
                        expression: make_node(AST_Number, node, {
                            value: 0
                        })
                    })
                });
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
            return node;
        });
    });

    function read_property(obj, node) {
        var key = node.getProperty();
        var value;
        if (obj instanceof AST_Array) {
            var elements = obj.elements;
            if (typeof key == "number" && key in elements) value = elements[key];
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
            key = "" + key;
            var props = obj.properties;
            for (var i = props.length; --i >= 0;) {
                var prop = props[i];
                if (!(prop instanceof AST_ObjectKeyVal)) return;
                if (!value && props[i].key === key) value = props[i].value;
            }
        }
        return value instanceof AST_SymbolRef && value.fixed_value() || value;
    }

    function is_read_only_fn(value, name) {
        if (value instanceof AST_Boolean) return native_fns.Boolean[name];
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
            return;
        }
        var lhs = is_lhs(node, parent);
        if (lhs) return lhs;
        if (parent instanceof AST_Array) return is_modified(compressor, tw, parent, parent, level + 1);
        if (parent instanceof AST_Call) {
            return !immutable
                && parent.expression === node
                && !parent.is_expr_pure(compressor)
                && (!(value instanceof AST_Function)
                    || !(parent instanceof AST_New) && value.contains_this());
        }
        if (parent instanceof AST_ObjectKeyVal) {
        }
        if (parent instanceof AST_PropAccess) {
            if (parent.expression !== node) return;
            var prop = read_property(value, parent);
        }
    }

    function is_arguments(def) {
        if (def.name != "arguments") return false;
        var orig = def.orig;
        return orig.length == 1 && orig[0] instanceof AST_SymbolFunarg;
    }

    function cross_scope(def, sym) {
        do {
            if (def === sym) return false;
            if (sym instanceof AST_Scope) return true;
        } while (sym = sym.parent_scope);
    }

    (function(def) {
        def(AST_Node, noop);

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
                    if (def.scope === scope) return true;
                } while (scope instanceof AST_Function && (scope = scope.parent_scope.resolve()));
            }
                tw.defun_ids[def.id] = false;
            }
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }

        function reset_variables(tw, compressor, scope) {
            scope.variables.each(function(def) {
                reset_def(tw, compressor, def);
                if (def.fixed === null) {
                    def.safe_ids = tw.safe_ids;
                } else if (def.fixed) {
                    tw.loop_ids[def.id] = tw.in_loop;
                }
            });
            scope.may_call_this = function() {
                scope.may_call_this = noop;
                if (!scope.contains_this()) return;
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
                var visited = tw.defun_visited[def.id];
                if (marker === tw.safe_ids) {
                    if (!visited) return def.fixed;
                } else if (visited) {
                    def.init.enclosed.forEach(function(d) {
                        if (def.init.variables.get(d.name) === d) return;
                        if (!safe_to_read(tw, d)) d.fixed = false;
                    });
                } else {
                    tw.defun_ids[def.id] = false;
                }
            } else {
                if (!tw.in_loop) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                    return def.fixed;
                }
                tw.defun_ids[def.id] = false;
            }
        }
        function walk_defuns(tw, scope) {
            scope.functions.each(function(def) {
                if (def.init instanceof AST_Defun && !tw.defun_visited[def.id]) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                }
            });
        }
        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }

        function pop(tw) {
            tw.safe_ids = Object.getPrototypeOf(tw.safe_ids);
        }
        function mark(tw, def) {
            tw.safe_ids[def.id] = {};
        }
        function push_ref(def, ref) {
            def.last_ref = ref;
        }
        function safe_to_read(tw, def) {
            var safe = tw.safe_ids[def.id];
            if (safe) {
                if (!HOP(tw.safe_ids, def.id)) safe.read = safe.read && safe.read !== tw.safe_ids ? true : tw.safe_ids;
                if (def.fixed == null) {
                    if (is_arguments(def)) return false;
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                }
            }
        }
        function safe_to_assign(tw, def, declare) {
            if (!(declare || all(def.orig, function(sym) {
                return !(sym instanceof AST_SymbolConst);
            }))) return false;
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
            var safe = tw.safe_ids[def.id];
            if (!HOP(tw.safe_ids, def.id)) {
                if (!safe) return false;
                if (safe.read && def.scope !== tw.find_parent(AST_Scope)) return false;
                safe.assign = safe.assign && safe.assign !== tw.safe_ids ? true : tw.safe_ids;
            }
            if (def.fixed != null && safe.read) {
                if (safe.read !== tw.safe_ids) return false;
            }
            return safe_to_read(tw, def) && all(def.orig, function(sym) {
                return !(sym instanceof AST_SymbolLambda);
            });
        }
        function make_ref(ref, fixed) {
        }
        function ref_once(compressor, def) {
        }

        function is_immutable(value) {
            if (!value) return false;
        }
        function has_escaped(d, node, parent) {
        }
        function value_in_use(node, parent) {
        }

        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (has_escaped(d, node, parent)) {
                d.escaped.push(parent);
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
            } else if (value_in_use(node, parent)) {
            } else if (parent instanceof AST_PropAccess && parent.expression === node) {
                value = read_property(value, parent);
                mark_escaped(tw, d, scope, parent, value, level + 1, depth + 1);
            }
            if (parent instanceof AST_SimpleStatement) return;
            if (parent instanceof AST_Unary && !unary_side_effects[parent.operator]) return;
            d.direct_access = true;
        }
        function mark_assignment_to_arguments(node) {
            var expr = node.expression;
            var def = expr.definition();
            if (is_arguments(def) && node.property instanceof AST_Number) def.reassigned = true;
        }
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var eq = node.operator == "=";
            var sym = node.left;
            if (eq && sym.equivalent_to(node.right) && !sym.has_side_effects(compressor)) {
                node.right.walk(tw);
                node.__drop = true;
                return true;
            }
            var d = sym.definition();
            d.assignments++;
            var fixed = d.fixed;
            var value = eq ? node.right : node;
            if (is_modified(compressor, tw, node, value, 0)) {
                d.fixed = false;
            }
            var safe = eq || safe_to_read(tw, d);
            if (safe && safe_to_assign(tw, d)) {
                push_ref(d, sym);
                if (eq) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    sym.fixed = d.fixed = function() {
                    };
                } else {
                    if (d.single_use) d.single_use = false;
                    sym.fixed = d.fixed = function() {
                        }
                    };
                }
                sym.fixed.assigns = eq || !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
            } else {
                d.fixed = false;
            }
            return true;

            function walk_prop(node) {
                if (node instanceof AST_Dot) {
                    walk_prop(node.expression);
                } else if (node instanceof AST_Sub) {
                } else if (node instanceof AST_SymbolRef) {
                    var d = node.definition();
                    node.fixed = d.fixed;
                } else {
                }
            }
        });
        def(AST_Call, function(tw, descend) {
            tw.find_parent(AST_Scope).may_call_this();
            var exp = this.expression;
            if (exp instanceof AST_Function) {
                this.args.forEach(function(arg) {
                    arg.walk(tw);
                });
            } else if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
                var defun = mark_defun(tw, def);
                defun.walk(tw);
                return true;
            }
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
        def(AST_Conditional, function(tw) {
            this.alternative.walk(tw);
            pop(tw);
        });
        def(AST_Defun, function(tw, descend, compressor) {
            var id = this.name.definition().id;
            tw.defun_visited[id] = true;
            push(tw);
            return true;
        });
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            pop(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_For, function(tw, descend, compressor) {
            this.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
            if (this.init) this.init.walk(tw);
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            if (this.condition) this.condition.walk(tw);
            this.body.walk(tw);
            if (this.step) {
                if (has_loop_control(this, tw.parent())) {
                    pop(tw);
                }
            }
            tw.in_loop = saved_loop;
        });
        def(AST_ForIn, function(tw, descend, compressor) {
            this.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
            this.object.walk(tw);
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            var init = this.init;
            init.walk(tw);
            if (init instanceof AST_SymbolRef) {
                init.definition().fixed = false;
            } else if (init instanceof AST_Var) {
                init.definitions[0].name.definition().fixed = false;
            }
            this.body.walk(tw);
            tw.in_loop = saved_loop;
            return true;
        });
        def(AST_Function, function(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var iife;
            if (!fn.name && (iife = tw.parent()) instanceof AST_Call && iife.expression === fn) {
                var hit = false;
                var aborts = false;
                fn.walk(new TreeWalker(function(node) {
                    if (hit) return aborts = true;
                    if (node instanceof AST_Return) return hit = true;
                }));
                // So existing transformation rules can work on them.
                fn.argnames.forEach(function(arg, i) {
                    var d = arg.definition();
                    if (d.fixed === undefined && (!fn.uses_arguments || tw.has_directive("use strict"))) {
                        tw.loop_ids[d.id] = tw.in_loop;
                        var value = iife.args[i];
                        d.fixed = function() {
                            var j = fn.argnames.indexOf(arg);
                            return (j < 0 ? value : iife.args[j]) || make_node(AST_Undefined, iife);
                        };
                        d.fixed.assigns = [ arg ];
                    } else {
                        d.fixed = false;
                    }
                });
                var safe_ids = tw.safe_ids;
                pop(tw);
                walk_defuns(tw, fn);
                if (!aborts) tw.safe_ids = safe_ids;
            } else {
                push(tw);
                descend();
                pop(tw);
                walk_defuns(tw, fn);
            }
            return true;
        });
        def(AST_If, function(tw) {
            this.condition.walk(tw);
            if (this.alternative) {
                push(tw);
                this.alternative.walk(tw);
            }
            return true;
        });
        def(AST_Switch, function(tw, descend, compressor) {
            this.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
            var first = true;
            this.body.forEach(function(branch) {
                if (first) {
                    first = false;
                }
            })
            if (!first) pop(tw);
            walk_body(this, tw);
        });
        def(AST_SwitchBranch, function(tw) {
        });
        def(AST_SymbolCatch, function() {
            this.definition().fixed = false;
        });
        def(AST_SymbolRef, function(tw, descend, compressor) {
            var d = this.definition();
                && d.orig[0] instanceof AST_SymbolDefun) {
                tw.loop_ids[d.id] = tw.in_loop;
            }
            if (d.fixed === false) {
                var redef = d.redefined();
                if (redef && cross_scope(d.scope, this.scope)) redef.single_use = false;
            } else if (d.fixed === undefined || !safe_to_read(tw, d)) {
                d.fixed = false;
            } else if (d.fixed) {
                var value = this.fixed_value();
                var recursive = recursive_ref(tw, d);
                if (recursive) {
                    d.recursive_refs++;
                } else if (value && ref_once(compressor, d)) {
                    d.in_loop = tw.loop_ids[d.id] !== tw.in_loop;
                    d.single_use = value instanceof AST_Lambda
                            && !value.pinned()
                            && (!d.in_loop || tw.parent() instanceof AST_Call)
                        || !d.in_loop
                            && d.scope === this.scope.resolve()
                            && value.is_constant_expression();
                } else {
                    d.single_use = false;
                }
                if (is_modified(compressor, tw, this, value, 0, is_immutable(value), recursive)) {
                    if (d.single_use) {
                        d.single_use = "m";
                    } else {
                        d.fixed = false;
                    }
                }
                if (d.fixed && tw.loop_ids[d.id] !== tw.in_loop) {
                    d.cross_loop = true;
                }
            }
            var parent;
                && !((parent = tw.parent()) instanceof AST_Call && parent.expression === this)) {
            }
        });
        def(AST_Toplevel, function(tw, descend, compressor) {
            this.globals.each(function(def) {
                reset_def(tw, compressor, def);
            });
            push(tw);
        });
        def(AST_Try, function(tw, descend, compressor) {
            this.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
            if (this.bcatch) {
            }
            if (this.bfinally) this.bfinally.walk(tw);
            return true;
        });
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            var d = exp.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (safe_to_read(tw, d) && safe_to_assign(tw, d)) {
                if (d.single_use) d.single_use = false;
                d.fixed = function() {
                    return make_node(AST_Binary, node, {
                        left: make_node(AST_UnaryPrefix, node, {
                            operator: "+",
                            expression: make_ref(exp, fixed)
                        }),
                        right: make_node(AST_Number, node, {
                            value: 1
                        })
                    });
                };
                d.fixed.assigns = fixed && fixed.assigns ? fixed.assigns.slice() : [];
                if (node instanceof AST_UnaryPrefix) {
                    exp.fixed = d.fixed;
                } else {
                    exp.fixed = function() {
                        return make_node(AST_UnaryPrefix, node, {
                            operator: "+",
                            expression: make_ref(exp, fixed)
                        }
                    };
                    exp.fixed.assigns = fixed && fixed.assigns;
                }
            } else {
                d.fixed = false;
            }
            return true;
        });
        def(AST_VarDef, function(tw, descend) {
            var node = this;
            var d = node.name.definition();
            if (safe_to_assign(tw, d, true)) {
                mark(tw, d);
                tw.loop_ids[d.id] = tw.in_loop;
                d.fixed = function() {
                };
                d.fixed.assigns = [ node ];
                if (node.name instanceof AST_SymbolConst && d.redefined()) d.single_use = false;
            } else {
                d.fixed = false;
            }
            return true;
        });
    })(function(node, func) {
    AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
        var tw = new TreeWalker(compressor.option("reduce_vars") ? function(node, descend) {
            reset_flags(node);
            return node.reduce_vars(tw, descend, compressor);
        } : reset_flags);
        tw.defun_ids = Object.create(null);
        tw.defun_visited = Object.create(null);
        // Record the loop body in which `AST_SymbolDeclaration` is first encountered
        tw.in_loop = null;
        tw.loop_ids = Object.create(null);
        // Stack of look-up tables to keep track of whether a `SymbolDef` has been
        // properly assigned before use:
        // - `push()` & `pop()` when visiting conditional branches
        // - backup & restore via `save_ids` when visiting out-of-order sections
        tw.safe_ids = Object.create(null);

        function reset_flags(node) {
            node._squeezed = false;
            node._optimized = false;
            if (node instanceof AST_Scope) delete node._var_names;
        }
    });
    AST_SymbolRef.DEFMETHOD("is_immutable", function() {
    });

    function find_scope(compressor) {
        var level = 0, node;
        while (node = compressor.parent(level++)) {
            if (node.variables) return node;
        }
    }

    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_This) return true;
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                if (lhs.is_immutable()) return false;
                lhs = lhs.fixed_value();
            }
            if (!lhs) return true;
        }
    }
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }

    function make_sequence(orig, expressions) {
        if (expressions.length == 1) return expressions[0];
    }

    function make_node_from_constant(val, orig) {
        switch (typeof val) {
          case "string":
            return make_node(AST_String, orig, {
                value: val
            });
            if (isFinite(val)) {
                return 1 / val < 0 ? make_node(AST_UnaryPrefix, orig, {
                    operator: "-",
                    expression: make_node(AST_Number, orig, { value: -val })
                }) : make_node(AST_Number, orig, { value: val });
            }
            return val < 0 ? make_node(AST_UnaryPrefix, orig, {
                operator: "-",
                expression: make_node(AST_Infinity, orig)
            }) : make_node(AST_Infinity, orig);
          default:
            if (val === null) {
                return make_node(AST_Null, orig, { value: null });
            }
            if (val instanceof RegExp) {
                return make_node(AST_RegExp, orig, { value: val });
            }
            throw new Error(string_template("Can't handle constant of type: {type}", {
                type: typeof val
            }));
        }
    }

    function needs_unbinding(compressor, val) {
        return val instanceof AST_PropAccess
            || is_undeclared_ref(val) && val.name == "eval";
    }

    // we shouldn't compress (1,func)(something) to
    // func(something) because that changes the meaning of
    // the func (becomes lexical instead of global).
    function maintain_this_binding(compressor, parent, orig, val) {
        var wrap = false;
        if (parent.TYPE == "Call") {
            wrap = parent.expression === orig && needs_unbinding(compressor, val);
        } else if (parent instanceof AST_UnaryPrefix) {
            wrap = parent.operator == "delete"
                || parent.operator == "typeof" && is_undeclared_ref(val);
        }
        return wrap ? make_sequence(orig, [ make_node(AST_Number, orig, { value: 0 }), val ]) : val;
    }

    function merge_sequence(array, node) {
        if (node instanceof AST_Sequence) {
            array.push.apply(array, node.expressions);
        } else {
            array.push(node);
        }
    }
    function as_statement_array(thing) {
    }

    function is_empty(thing) {
        if (thing === null) return true;
        if (thing instanceof AST_EmptyStatement) return true;
        if (thing instanceof AST_BlockStatement) return thing.body.length == 0;
    }
    function has_declarations_only(block) {
        return all(block.body, function(stat) {
                || stat instanceof AST_Var && all(stat.definitions, function(var_def) {
                    return !var_def.value;
                });
        });
    }

    function root_expr(prop) {
        while (prop instanceof AST_PropAccess) prop = prop.expression;
        return prop;
    }

    function is_iife_call(node) {
        if (node.TYPE != "Call") return false;
        return node.expression instanceof AST_Function || is_iife_call(node.expression);
    }

    function is_undeclared_ref(node) {
        return node instanceof AST_SymbolRef && node.definition().undeclared;
    }
    function get_rvalue(expr) {
    }
    function declarations_only(node) {
    }
    function is_declaration(stat) {
    }
    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
        var CHANGED, max_iter = 10;
        do {
            CHANGED = false;
        } while (CHANGED && max_iter-- > 0);
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
            var args;
            var candidates = [];
            var force_single;
            var stat_index = statements.length;
            var scanner = new TreeTransformer(function(node, descend) {
                if (!hit) {
                    hit_index++;
                    hit = true;
                    stop_after = (value_def ? find_stop_value : find_stop)(node, 0);
                    if (stop_after === node) abort = true;
                }
                var parent = scanner.parent();
                if (should_stop(node, parent)) {
                    abort = true;
                }
                if (!stop_if_hit && in_conditional(node, parent)) {
                    stop_if_hit = parent;
                }
                var hit_rhs;
                if (!(node instanceof AST_SymbolDeclaration)
                    && (scan_lhs && lhs.equivalent_to(node)
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (!can_replace || stop_if_hit && (hit_rhs || !lhs_local || !replace_all)) {
                        if (!hit_rhs || !value_def) abort = true;
                    }
                    if (is_lhs(node, parent)) {
                        if (value_def && !hit_rhs) {
                            assign_used = true;
                            replaced++;
                        }
                    } else if (value_def) {
                        if (!hit_rhs) replaced++;
                    } else {
                        replaced++;
                    }
                    CHANGED = abort = true;
                    if (candidate instanceof AST_UnaryPostfix) {
                        if (lhs instanceof AST_SymbolRef) lhs.definition().fixed = false;
                    }
                    if (candidate instanceof AST_VarDef) {
                        var def = candidate.name.definition();
                        if (def.references.length - def.replaced == 1 && !compressor.exposed(def)) {
                            def.replaced++;
                        }
                    }
                    candidate.write_only = false;
                }
                if (is_last_node(node, parent) || may_throw(node)) {
                    stop_after = node;
                    if (node instanceof AST_Scope) abort = true;
                }
                if (node instanceof AST_Accessor) {
                    var replace = can_replace;
                    can_replace = false;
                    can_replace = replace;
                }
            }, function(node) {
                if (stop_after === node) abort = true;
                if (stop_if_hit === node) stop_if_hit = null;
            });
            var multi_replacer = new TreeTransformer(function(node) {
                if (!hit) {
                    hit_index++;
                    switch (hit_stack.length - hit_index) {
                      case 0:
                        hit = true;
                        if (assign_used) return node;
                        if (node instanceof AST_VarDef) return node;
                        def.replaced++;
                        var parent = multi_replacer.parent();
                        if (parent instanceof AST_Sequence && parent.tail_node() !== node) {
                            value_def.replaced++;
                            return List.skip;
                        }
                        return rvalue;
                      case 1:
                        if (!assign_used && node.body === candidate) {
                            hit = true;
                            def.replaced++;
                            value_def.replaced++;
                            return null;
                        }
                      default:
                        return;
                    }
                }
                    && node.name == def.name) {
                    if (!--replaced) abort = true;
                    def.replaced++;
                    value_def.replaced--;
                }
            }, patch_sequence);
            while (--stat_index >= 0) {
                var hit_stack = [];
                while (candidates.length > 0) {
                    hit_stack = candidates.pop();
                    var hit_index = 0;
                    var candidate = hit_stack[hit_stack.length - 1];
                    var value_def = null;
                    var stop_after = null;
                    var stop_if_hit = null;
                    var lhs = get_lhs(candidate);
                    var side_effects = lhs && lhs.has_side_effects(compressor);
                    var scan_lhs = lhs && !side_effects && !is_lhs_read_only(lhs, compressor);
                    var scan_rhs = foldable(candidate);
                    if (!scan_lhs && !scan_rhs) continue;
                    var read_toplevel = false;
                    var modify_toplevel = false;
                    // Locate symbols which may execute code outside of scanning range
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    var rvalue = get_rvalue(candidate);
                    if (!side_effects) side_effects = value_has_side_effects();
                    var replace_all = replace_all_symbols(candidate);
                    var may_throw = candidate.may_throw(compressor) ? in_try ? function(node) {
                        return node.has_side_effects(compressor);
                    } : side_effects_external : return_false;
                    var funarg = candidate.name instanceof AST_SymbolFunarg;
                    var hit = funarg;
                    var abort = false;
                    var replaced = 0;
                    var assign_used = false;
                    var can_replace = !args || !hit;
                    if (!can_replace) {
                        for (var j = compressor.self().argnames.lastIndexOf(candidate.name) + 1; !abort && j < args.length; j++) {
                            args[j].transform(scanner);
                        }
                        can_replace = true;
                    }
                    for (var i = stat_index; !abort && i < statements.length; i++) {
                        statements[i].transform(scanner);
                    }
                    if (value_def) {
                        var def = lhs.definition();
                        var referenced = def.references.length - def.replaced;
                        if (candidate instanceof AST_Assign) referenced--;
                        if (replaced && referenced == replaced) {
                            abort = false;
                        } else {
                            candidates.push(hit_stack);
                            force_single = true;
                            continue;
                        }
                        if (replaced) {
                            hit_index = 0;
                            hit = funarg;
                            for (var i = stat_index; !abort && i < statements.length; i++) {
                                if (!statements[i].transform(multi_replacer)) statements.splice(i--, 1);
                            }
                            if (candidate instanceof AST_VarDef) {
                                replaced = !compressor.exposed(def) && def.references.length == def.replaced;
                            }
                            value_def.single_use = false;
                        }
                    }
                    if (replaced && !remove_candidate(candidate)) statements.splice(stat_index, 1);
                }
            }
            function handle_custom_scan_order(node, tt) {
                }))) {
                    abort = true;
                }
                if (node instanceof AST_ForIn) {
                    node.object = node.object.transform(tt);
                    abort = true;
                }
                if (node instanceof AST_Switch) {
                    node.expression = node.expression.transform(tt);
                    for (var i = 0; !abort && i < node.body.length; i++) {
                        var branch = node.body[i];
                        if (branch instanceof AST_Case) {
                            if (!hit) {
                                hit_index++;
                            }
                            branch.expression = branch.expression.transform(tt);
                            scan_rhs = false;
                        }
                    }
                    abort = true;
                }
            }
            function should_stop(node, parent) {
            }
            function is_last_node(node, parent) {
                if (node instanceof AST_Call) {
                    var def, fn = node.expression;
                    if (fn instanceof AST_SymbolRef) {
                        def = fn.definition();
                        fn = fn.fixed_value();
                    }
                    fn.collapse_scanning = true;
                    var replace = can_replace;
                    can_replace = false;
                    var after = stop_after;
                    var if_hit = stop_if_hit;
                    stop_if_hit = if_hit;
                    stop_after = after;
                    can_replace = replace;
                    abort = false;
                }
                if (node instanceof AST_SymbolRef) {
                    if (symbol_in_lvalues(node, parent)) {
                    }
                    var def = node.definition();
                }
            }
            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_Function
                    && (iife = compressor.parent()) instanceof AST_Call
                    && iife.expression === fn) {
                    var len = fn.argnames.length;
                    args = iife.args.slice(len);
                }
            }
            function find_stop(node, level) {
            }
            function find_stop_value(node, level) {
                var parent = scanner.parent(level);
                if (parent instanceof AST_Binary) {
                    if (lazy_op[parent.operator] && parent.left !== node) {
                        do {
                            node = parent;
                            parent = scanner.parent(++level);
                        } while (parent instanceof AST_Binary && parent.operator == node.operator);
                    }
                }
            }
            function mangleable_var(value) {
                if (force_single) {
                    force_single = false;
                }
                var def = value.definition();
                return value_def = def;
            }
            function get_lhs(expr) {
            }
            function foldable(expr) {
                while (expr instanceof AST_Assign && expr.operator == "=") {
                    expr = expr.right;
                }
            }
            function get_lvalues(expr) {
                var tw = new TreeWalker(function(node) {
                    if (node.TYPE == "Call") {
                        modify_toplevel = true;
                    } else if (node instanceof AST_PropAccess && may_be_global(node.expression)) {
                        if (node === lhs && !(expr instanceof AST_Unary)) {
                            modify_toplevel = true;
                        } else {
                            read_toplevel = true;
                        }
                    }
                });
            }
            function remove_candidate(expr) {
                if (expr.name instanceof AST_SymbolFunarg) {
                    if (args[index]) {
                        expr.name.definition().fixed = false;
                    }
                }
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    hit_index++;
                    hit = true;
                    if (node instanceof AST_VarDef) {
                        node.value = null;
                        if (value_def) value_def.replaced++;
                    }
                }, patch_sequence);
                abort = false;
                hit = false;
                hit_index = 0;
            }
            function patch_sequence(node) {
            }
            function is_lhs_local(lhs) {
            }
            function value_has_side_effects() {
            }
            function replace_all_symbols(expr) {
            }
            function symbol_in_lvalues(sym, parent) {
                scan_rhs = false;
            }
            function side_effects_external(node, lhs) {
            }
        }
        function eliminate_spurious_blocks(statements) {
            var seen_dirs = [];
            for (var i = 0; i < statements.length;) {
                var stat = statements[i];
                if (stat instanceof AST_BlockStatement) {
                    })) {
                        CHANGED = true;
                        i += stat.body.length;
                    }
                }
                if (stat instanceof AST_Directive) {
                    if (member(stat.value, seen_dirs)) {
                        CHANGED = true;
                        statements.splice(i, 1);
                        continue;
                    }
                }
                if (stat instanceof AST_EmptyStatement) {
                    CHANGED = true;
                }
                i++;
            }
        }
        function handle_if_return(statements, compressor) {
            var in_lambda = last_of(function(node) {
            });
            var multiple_if_returns = has_multiple_if_returns(statements);
            for (var i = statements.length; --i >= 0;) {
                var stat = statements[i];
                var j = next_index(i);
                var next = statements[j];
                if (in_lambda && !next && stat instanceof AST_Return) {
                    if (!stat.value) {
                        CHANGED = true;
                    }
                    if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
                        CHANGED = true;
                        statements[i] = make_node(AST_SimpleStatement, stat, {
                        });
                    }
                }
                if (stat instanceof AST_If) {
                    var ab = aborts(stat.body);
                    if (can_merge_flow(ab)) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.condition = stat.condition.negate(compressor);
                        stat.body = make_node(AST_BlockStatement, stat, {
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat, {
                        });
                        statements[i] = stat;
                        statements[i] = stat.transform(compressor);
                    }
                    if (ab && !stat.alternative && stat.body instanceof AST_BlockStatement && next instanceof AST_Jump) {
                        var negated = stat.condition.negate(compressor);
                        if (negated.print_to_string().length <= stat.condition.print_to_string().length) {
                            CHANGED = true;
                            stat = stat.clone();
                            stat.condition = negated;
                            statements[j] = stat.body;
                            stat.body = next;
                            statements[i] = stat;
                            statements[i] = stat.transform(compressor);
                        }
                    }
                    var alt = aborts(stat.alternative);
                    if (can_merge_flow(alt)) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.body = make_node(AST_BlockStatement, stat.body, {
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
                        });
                        statements[i] = stat;
                        statements[i] = stat.transform(compressor);
                    }
                }
                if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                    var value = stat.body.value;
                    var in_bool = stat.body.in_bool || next instanceof AST_Return && next.in_bool;
                        && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
                        CHANGED = true;
                        statements[i] = make_node(AST_SimpleStatement, stat.condition, {
                        });
                    }
                    if (!stat.alternative && next instanceof AST_Return) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.alternative = next;
                    }
                    if (!stat.alternative && !next && in_lambda && (in_bool || value && multiple_if_returns)) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.alternative = make_node(AST_Return, stat, {
                        });
                    }
                        && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
                        CHANGED = true;
                        stat = stat.clone();
                        stat.alternative = make_node(AST_BlockStatement, next, {
                        });
                    }
                }
            }
            function has_multiple_if_returns(statements) {
            }
            function last_of(predicate) {
            }
            function can_merge_flow(ab) {
            }
            function extract_functions() {
                statements.length = i + 1;
            }
            function next_index(i) {
            }
        }
        function eliminate_dead_code(statements, compressor) {
            for (var i = 0, n = 0, len = statements.length; i < len; i++) {
                var stat = statements[i];
                if (stat instanceof AST_LoopControl) {
                    } else {
                        statements[n++] = stat;
                    }
                } else {
                    statements[n++] = stat;
                }
            }
            statements.length = n;
            CHANGED = n != len;
        }
        function sequencesize(statements, compressor) {
            var seq = [], n = 0;
            function push_seq() {
                var body = make_sequence(seq[0], seq);
                statements[n++] = make_node(AST_SimpleStatement, body, { body: body });
                seq = [];
            }
            for (var i = 0, len = statements.length; i < len; i++) {
                var stat = statements[i];
                } else if (is_declaration(stat)) {
                    statements[n++] = stat;
                } else {
                    statements[n++] = stat;
                }
            }
            statements.length = n;
            if (n != len) CHANGED = true;
        }
        function to_simple_statement(block, decls) {
        }
        function sequencesize_2(statements, compressor) {
            function cons_seq(right) {
                n--;
                CHANGED = true;
            }
            var n = 0, prev;
            for (var i = 0; i < statements.length; i++) {
                var stat = statements[i];
                if (prev) {
                    if (stat instanceof AST_Exit) {
                        stat.value = cons_seq(stat.value || make_node(AST_Undefined, stat)).transform(compressor);
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
                                    CHANGED = true;
                                }
                            }
                        }
                    } else if (stat instanceof AST_ForIn) {
                        stat.object = cons_seq(stat.object);
                    } else if (stat instanceof AST_If) {
                        stat.condition = cons_seq(stat.condition);
                    } else if (stat instanceof AST_Switch) {
                        stat.expression = cons_seq(stat.expression);
                    } else if (stat instanceof AST_With) {
                        stat.expression = cons_seq(stat.expression);
                    }
                }
                if (compressor.option("conditionals") && stat instanceof AST_If) {
                    var decls = [];
                    var body = to_simple_statement(stat.body, decls);
                    var alt = to_simple_statement(stat.alternative, decls);
                    if (body !== false && alt !== false && decls.length > 0) {
                        var len = decls.length;
                        decls.push(make_node(AST_If, stat, {
                            condition: stat.condition,
                            body: body || make_node(AST_EmptyStatement, stat.body),
                            alternative: alt
                        }));
                        decls.unshift(n, 1);
                        [].splice.apply(statements, decls);
                        i += len;
                        n += len + 1;
                        prev = null;
                        CHANGED = true;
                        continue;
                    }
                }
                statements[n++] = stat;
                prev = stat instanceof AST_SimpleStatement ? stat : null;
            }
            statements.length = n;
        }
        function join_assigns(defn, body, keep) {
            if (defn instanceof AST_Definitions) {
                keep = keep || 0;
            }
        }
        function join_var_assign(definitions, exprs, keep) {
            while (exprs.length > keep) {
                var expr = exprs[0];
                var lhs = expr.left;
                var def = lhs.definition();
                def.replaced++;
            }
        }
        function join_consecutive_vars(statements) {
            var defs;
            for (var i = 0, j = -1; i < statements.length; i++) {
                var stat = statements[i];
                var prev = statements[j];
                if (stat instanceof AST_Definitions) {
                    if (prev && prev.TYPE == stat.TYPE) {
                        prev.definitions = prev.definitions.concat(stat.definitions);
                        CHANGED = true;
                    } else if (defs && defs.TYPE == stat.TYPE && declarations_only(stat)) {
                        defs.definitions = defs.definitions.concat(stat.definitions);
                        CHANGED = true;
                    } else {
                        statements[++j] = stat;
                        if (stat instanceof AST_Var) defs = stat;
                    }
                } else if (stat instanceof AST_Exit) {
                    stat.value = join_assigns_expr(stat.value);
                } else if (stat instanceof AST_For) {
                    var exprs = join_assigns(prev, stat.init);
                    if (exprs) {
                        CHANGED = true;
                        stat.init = exprs.length ? make_sequence(stat.init, exprs) : null;
                    } else if (prev instanceof AST_Var && (!stat.init || stat.init.TYPE == prev.TYPE)) {
                        if (stat.init) {
                            prev.definitions = prev.definitions.concat(stat.init.definitions);
                        }
                        defs = stat.init = prev;
                        statements[j] = merge_defns(stat);
                        CHANGED = true;
                    } else if (defs && stat.init && defs.TYPE == stat.init.TYPE && declarations_only(stat.init)) {
                        defs.definitions = defs.definitions.concat(stat.init.definitions);
                        stat.init = null;
                        CHANGED = true;
                    } else if (stat.init instanceof AST_Var) {
                        defs = stat.init;
                    }
                } else if (stat instanceof AST_ForIn) {
                    if (defs && defs.TYPE == stat.init.TYPE) {
                        defs.definitions = defs.definitions.concat(stat.init.definitions);
                        var name = stat.init.definitions[0].name;
                        var ref = make_node(AST_SymbolRef, name, name);
                        stat.init = ref;
                        CHANGED = true;
                    }
                    stat.object = join_assigns_expr(stat.object);
                } else if (stat instanceof AST_If) {
                    stat.condition = join_assigns_expr(stat.condition);
                } else if (stat instanceof AST_SimpleStatement) {
                    var exprs = join_assigns(prev, stat.body);
                    if (exprs) {
                        CHANGED = true;
                        stat.body = make_sequence(stat.body, exprs);
                    }
                } else if (stat instanceof AST_Switch) {
                    stat.expression = join_assigns_expr(stat.expression);
                } else if (stat instanceof AST_With) {
                    stat.expression = join_assigns_expr(stat.expression);
                }
                statements[++j] = defs ? merge_defns(stat) : stat;
            }
            statements.length = j + 1;
            function join_assigns_expr(value) {
                CHANGED = true;
            }
            function merge_defns(stat) {
                return stat.transform(new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_Definitions) {
                        defs.definitions = defs.definitions.concat(node.definitions);
                        CHANGED = true;
                    }
                }));
            }
        }
    }

    var lazy_op = makePredicate("&& ||");
    var unary_side_effects = makePredicate("delete ++ --");
    function is_lhs(node, parent) {
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    (function(def) {
        def(AST_Array, function(compressor, ignore_side_effects, cached, depth) {
            if (compressor.option("unsafe")) {
                var elements = [];
            }
        });
    })(function(node, func) {
    function aborts(thing) {
    }
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var drop_funcs = !(self instanceof AST_Toplevel) || compressor.toplevel.funcs;
        var drop_vars = !(self instanceof AST_Toplevel) || compressor.toplevel.vars;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
        };
        var assign_in_use = Object.create(null);
        var for_ins = Object.create(null);
        var in_use_ids = Object.create(null); // avoid expensive linear scans of in_use
        if (self instanceof AST_Toplevel && compressor.top_retain) {
            self.variables.each(function(def) {
                if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                    in_use_ids[def.id] = true;
                }
            });
        }
        var assignments = new Dictionary();
        var var_defs_by_id = new Dictionary();
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Lambda && node.uses_arguments && !tw.has_directive("use strict")) {
                node.argnames.forEach(function(argname) {
                    var def = argname.definition();
                    if (!(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                });
            }
            if (scope === self) {
                if (node instanceof AST_Defun) {
                    var def = node.name.definition();
                    if (!drop_funcs && !(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                }
                if (node instanceof AST_Definitions) {
                    node.definitions.forEach(function(defn) {
                        var def = defn.name.definition();
                            && !(def.id in in_use_ids)) {
                            in_use_ids[def.id] = true;
                        }
                    });
                }
                if (node instanceof AST_SymbolFunarg) {
                    var def = node.definition();
                }
            }
        });
        tw.directives = Object.create(compressor.directives);
        tw = new TreeWalker(scan_ref_scoped);
        Object.keys(assign_in_use).forEach(function(id) {
            var in_use = (assignments.get(id) || []).filter(function(node) {
            });
            if (assigns.length == in_use.length) {
                assign_in_use[id] = in_use;
            } else {
        });
        var tt = new TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
                if (sym) {
                    var def = sym.definition();
                } else if (node instanceof AST_UnaryPostfix
            }
            if (node instanceof AST_Lambda) {
                if (drop_funcs && node !== self && node instanceof AST_Defun) {
                    var def = node.name.definition();
                    if (!(def.id in in_use_ids)) {
                        def.eliminated++;
                    }
                }
                if (!(node instanceof AST_Accessor)) {
                    for (var a = node.argnames, i = a.length; --i >= 0;) {
                        var sym = a[i];
                        var def = sym.definition();
                        if (def.id in in_use_ids) {
                            if (indexOf_assign(def, sym) < 0) sym.__unused = null;
                        } else {
                            sym.__unused = true;
                        }
                    }
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                var body = [], head = [], tail = [];
                var side_effects = [];
                var duplicated = 0;
                node.definitions.forEach(function(def) {
                    if (def.value) def.value = def.value.transform(tt);
                    var sym = def.name.definition();
                    if (!drop_vars || sym.id in in_use_ids) {
                        if (def.value && indexOf_assign(sym, def) < 0) {
                            var write_only = def.value.write_only;
                            var value = def.value.drop_side_effect_free(compressor);
                            if (def.value !== value) {
                                def.value = value && make_sequence(def.value, [
                                ]);
                            } else if (def.value.write_only !== write_only) {
                                def.value.write_only = write_only;
                            }
                        }
                        var old_def, var_defs = var_defs_by_id.get(sym.id);
                        if (!def.value) {
                            if (var_defs.length > 1) {
                                sym.eliminated++;
                            } else {
                        } else if (compressor.option("functions")
                            && (!def.value.name || (old_def = def.value.name.definition()).assignments == 0
                                })))
                            && can_rename(def.value, def.name.name)) {
                        } else {
                            if (var_defs.length > 1 && sym.orig.indexOf(def.name) > sym.eliminated) {
                                duplicated++;
                            }
                            if (side_effects.length > 0) {
                                if (tail.length > 0) {
                                    side_effects.push(def.value);
                                    def.value = make_sequence(def.value, side_effects);
                                } else {
                                    body.push(make_node(AST_SimpleStatement, node, {
                                        body: make_sequence(node, side_effects)
                                    }));
                                }
                                side_effects = [];
                            }
                        }
                    } else if (sym.orig[0] instanceof AST_SymbolCatch
                        && sym.scope.resolve() === def.name.scope.resolve()) {
                        var value = def.value && def.value.drop_side_effect_free(compressor);
                        var var_defs = var_defs_by_id.get(sym.id);
                        if (var_defs.length > 1) {
                            sym.eliminated++;
                        } else {
                            def.value = null;
                        }
                    } else {
                        var value = def.value && !def.value.single_use && def.value.drop_side_effect_free(compressor);
                        sym.eliminated++;
                    }
                });
                switch (head.length) {
                  case 0:
                    if (tail.length == 0) break;
                    if (tail.length == duplicated) {
                        [].unshift.apply(side_effects, tail.map(function(def) {
                            AST_Node.warn("Dropping duplicated definition of variable {name} [{file}:{line},{col}]", template(def.name));
                            var sym = def.name.definition();
                            var ref = make_node(AST_SymbolRef, def.name, def.name);
                            sym.references.push(ref);
                            var assign = make_node(AST_Assign, def, {
                                operator: "=",
                                left: ref,
                                right: def.value
                            });
                            var index = indexOf_assign(sym, def);
                            if (index >= 0) assign_in_use[sym.id][index] = assign;
                            sym.eliminated++;
                            return assign;
                        }));
                        break;
                    }
                  case 1:
                    if (tail.length == 0) {
                        var id = head[0].name.definition().id;
                        if (id in for_ins) {
                            node.definitions = head;
                            for_ins[id].init = node;
                            break;
                        }
                    }
                  default:
                    node.definitions = head.concat(tail);
                    body.push(node);
                }
            }
            if (node instanceof AST_LabeledStatement && node.body instanceof AST_For) {
                if (node.body instanceof AST_BlockStatement) {
                    var block = node.body;
                    node.body = block.body.pop();
                }
            }
        });
            && self.body[0].value == "use strict") {
            self.body.length = 0;
        }
        function template(sym) {
        }
        function track_assigns(def, node) {
            if (!def.fixed || !node.fixed) assign_in_use[def.id] = false;
        }
        function add_assigns(def, node) {
            if (!assign_in_use[def.id]) assign_in_use[def.id] = [];
        }
        function indexOf_assign(def, node) {
        }
        function verify_safe_usage(def, read, modified) {
            if (read && modified) {
                in_use_ids[def.id] = true;
            } else {
        }
        function scan_ref_scoped(node, descend, init) {
            var node_def, props = [], sym = assign_as_unused(node, props);
            if (sym && self.variables.get(sym.name) === (node_def = sym.definition())) {
            }
            if (node instanceof AST_ForIn) {
                if (node.init instanceof AST_SymbolRef && scope === self) {
                    var id = node.init.definition().id;
                    if (!(id in for_ins)) for_ins[id] = node;
                }
            }
            if (node instanceof AST_SymbolRef) {
                node_def = node.definition();
                if (!(node_def.id in in_use_ids)) {
                    in_use_ids[node_def.id] = true;
                }
                if (cross_scope(node_def.scope, node.scope)) {
                    var redef = node_def.redefined();
                    if (redef && !(redef.id in in_use_ids)) {
                        in_use_ids[redef.id] = true;
                    }
                }
            }
        }
    });
    function has_loop_control(loop, parent, type) {
        if (!type) type = AST_LoopControl;
    }
    AST_Definitions.DEFMETHOD("to_assignments", function(compressor) {
        var assignments = this.definitions.reduce(function(a, def) {
            def = def.name.definition();
            def.eliminated++;
            def.replaced--;
        }, []);
    });
    OPT(AST_Call, function(self, compressor) {
        var exp = self.expression;
            && exp.name == "Function") {
            })) {
                try {
                    self.args = [
                    ];
                } catch (ex) {
            }
        }
        var fn = exp instanceof AST_SymbolRef ? exp.fixed_value() : exp;
        var is_func = fn instanceof AST_Lambda;
        var stat = is_func && fn.first_statement();
        var can_inline = compressor.option("inline") && !self.is_expr_pure(compressor);
        if (can_inline && stat instanceof AST_Return) {
            var value = stat.value;
        }
        if (is_func) {
            var def, value, var_assigned = false;
            if (can_inline
                && (exp === fn || !recursive_ref(compressor, def = exp.definition())
                    && fn.is_constant_expression(find_scope(compressor)))
                && (value = can_flatten_body(stat))
                && !fn.contains_this()) {
                var replacing = exp === fn || def.single_use && def.references.length - def.replaced == 1;
            }
        }
    });
})(function(node, optimizer) {
