












function Compressor(options, false_by_default) {
    this.options = defaults(options, {
        expression      : false,
        functions       : !false_by_default,
        global_defs     : false,
        hoist_funs      : false,
        hoist_props     : !false_by_default,
        if_return       : !false_by_default,
        passes          : 1,
        switches        : !false_by_default,
        top_retain      : null,
        toplevel        : !!(options && options["top_retain"]),
        typeofs         : !false_by_default,
        unsafe          : false,
        unsafe_math     : false,
    }, true);
    var global_defs = this.options["global_defs"];
    if (typeof global_defs == "object") for (var key in global_defs) {
        if (/^@/.test(key) && HOP(global_defs, key)) {
            global_defs[key.slice(1)] = parse(global_defs[key], {
            });
        }
    }
    var keep_fargs = this.options["keep_fargs"];
    this.drop_fargs = keep_fargs == "strict" ? function(lambda, parent) {
        if (lambda.length_read) return false;
        var name = lambda.name;
    } : keep_fargs ? return_false : return_true;
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
        this.pure_funcs = pure_funcs;
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            return pure_funcs !== node.expression.print_to_string();
        };
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
            return !member(node.expression.print_to_string(), pure_funcs);
        };
    } else {
        this.pure_funcs = return_true;
    }
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
        };
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
        };
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
    } : {
}

Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
        if (!(def.global || def.scope.resolve() instanceof AST_Toplevel)) return false;
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
        var mangle = { ie8: this.option("ie8") };
        for (var pass = 0; pass < passes; pass++) {
            node.figure_out_scope(mangle);
            if (pass > 0 || this.option("reduce_vars"))
                node.reset_opt_flags(this);
            node = node.transform(this);
            if (passes > 1) {
                var count = 0;
                node.walk(new TreeWalker(function() {
                    count++;
                }));
                AST_Node.info("pass {pass}: last_count: {min_count}, count: {count}", {
                    pass: pass,
                });
                } else {
                }
            }
        }
    },
    before: function(node, descend, in_list) {
        if (is_scope) {
            node.hoist_declarations(this);
            node.process_boolean_returns(this);
        }
        // Before https://github.com/mishoo/UglifyJS/pull/1602 AST_Node.optimize()
        // would call AST_Node.transform() if a different instance of AST_Node is
        // Migrate and defer all children's AST_Node.transform() to below, which
        var opt = node.optimize(this);
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
            opt.merge_variables(this);
            opt.drop_unused(this);
        }
        if (opt === node) opt._squeezed = true;
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
        return self;
    });
    AST_Node.DEFMETHOD("equivalent_to", function(node) {
        return this.TYPE == node.TYPE && this.print_to_string() == node.print_to_string();
    });

    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
                return make_node(AST_Return, node, {
                });
            }
            if (!insert && node instanceof AST_Return) {
                return transform ? transform(node) : make_node(AST_SimpleStatement, node, {
                    body: node.value || make_node(AST_UnaryPrefix, node, {
                    })
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
        var value;
        if (obj instanceof AST_Array) {
            var elements = obj.elements;
            if (key == "length") return make_node_from_constant(elements.length, obj);
            if (typeof key == "number" && key in elements) value = elements[key];
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
                return make_node_from_constant(obj.argnames.length, obj);
            }
        } else if (obj instanceof AST_Object) {
            key = "" + key;
            var props = obj.properties;
            for (var i = props.length; --i >= 0;) {
                var prop = props[i];
                if (!value && props[i].key === key) value = props[i].value;
            }
        }
    }
    function is_read_only_fn(value, name) {
        if (value instanceof AST_Object) return native_fns.Object[name];
        if (value instanceof AST_RegExp) return native_fns.RegExp[name] && !value.value.global;
    }

    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
            return;
        }
        if (parent instanceof AST_Array) return is_modified(compressor, tw, parent, parent, level + 1);
        if (parent instanceof AST_Call) {
                && (!is_function(value) || !(parent instanceof AST_New) && value.contains_this());
        }
        if (parent instanceof AST_ForIn) return parent.init === node;
        if (parent instanceof AST_PropAccess) {
            var prop = read_property(value, parent);
            return (!immutable || recursive) && is_modified(compressor, tw, parent, prop, level + 1);
        }
    }

    function is_arguments(def) {
        if (def.name != "arguments") return false;
        var orig = def.orig;
        return orig.length == 1 && orig[0] instanceof AST_SymbolFunarg;
    }
    function cross_scope(def, sym) {
        do {
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
                && !compressor.exposed(def)
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
                if (!scope.contains_this()) return;
                scope.functions.each(function(def) {
                    if (is_defun(def.init) && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
            if (compressor.option("ie8")) scope.variables.each(function(def) {
                var d = def.orig[0].definition();
                if (d !== def) d.fixed = false;
            });
        }

        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
                var visited = tw.defun_visited[def.id];
                } else if (visited) {
                    def.init.enclosed.forEach(function(d) {
                    });
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
                if (is_defun(def.init) && !tw.defun_visited[def.id]) {
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
            if (safe) {
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                }
            }
        }

        function safe_to_assign(tw, def, declare) {
            if (!(declare || all(def.orig, function(sym) {
                return !(sym instanceof AST_SymbolConst);
            }))) return false;
            if (def.fixed === undefined) return declare || all(def.orig, function(sym) {
            });
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
            return safe_to_read(tw, def) && all(def.orig, function(sym) {
            });
        }

        function is_immutable(value) {
                || value instanceof AST_This;
        }

        function has_escaped(d, node, parent) {
            if (parent instanceof AST_Call) return parent.expression !== node || parent instanceof AST_New;
        }
        function value_in_use(node, parent) {
            if (parent instanceof AST_Binary) return lazy_op[parent.operator];
        }
        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (has_escaped(d, node, parent)) {
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
            } else if (value_in_use(node, parent)) {
            } else if (parent instanceof AST_PropAccess && parent.expression === node) {
                value = read_property(value, parent);
            }
            d.direct_access = true;
        }
        function mark_assignment_to_arguments(node) {
            var expr = node.expression;
            if (!(expr instanceof AST_SymbolRef)) return;
            var def = expr.definition();
            if (is_arguments(def) && node.property instanceof AST_Number) def.reassigned = true;
        }
        function scan_declaration(tw, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DestructuredArray) {
                    var save = fixed;
                    fixed = save;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save = fixed;
                    node.properties.forEach(function(node) {
                        fixed = function() {
                            var key = node.key;
                            if (typeof key == "string") {
                                } else {
                                    key = make_node_from_constant(key, node);
                                }
                            }
                            return make_node(type, node, {
                                expression: save(),
                                property: key
                            });
                        };
                    });
                    fixed = save;
                }
            });
        }
        function reduce_defun(tw, descend, compressor) {
            var id = this.name.definition().id;
            tw.defun_visited[id] = true;
            pop(tw);
        }
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var left = node.left;
            if (node.operator == "=" && left.equivalent_to(node.right) && !left.has_side_effects(compressor)) {
                walk_prop(left);
                node.__drop = true;
            } else if (!(left instanceof AST_Destructured || left instanceof AST_SymbolRef)) {
            } else if (node.operator == "=") {
                scan_declaration(tw, left, function() {
                }, function(sym, fixed) {
                    if (!(sym instanceof AST_SymbolRef)) {
                        sym.walk(tw);
                        return;
                    }
                    var d = sym.definition();
                    d.assignments++;
                        && can_drop_symbol(sym) && safe_to_assign(tw, d)) {
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
                if (safe && safe_to_assign(tw, d)) {
                    mark(tw, d);
                    if (d.single_use) d.single_use = false;
                    left.fixed = d.fixed = function() {
                        return make_node(AST_Binary, node, {
                        });
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
                } else {
                    left.walk(tw);
                    d.fixed = false;
                }
            }
            return true;
            function walk_prop(node) {
                if (node instanceof AST_Dot) {
                } else if (node instanceof AST_Sub) {
                } else if (node instanceof AST_SymbolRef) {
                    var d = node.definition();
                    node.fixed = d.fixed;
                } else {
            }
        });
        def(AST_Binary, function(tw) {
            this.left.walk(tw);
            push(tw);
            this.right.walk(tw);
        });
        def(AST_BlockScope, function(tw, descend, compressor) {
            this.variables.each(function(def) {
            });
        });
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (is_function(exp)) {
                this.args.forEach(function(arg) {
                    arg.walk(tw);
                });
                return true;
            } else if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
                var defun = mark_defun(tw, def);
                defun.walk(tw);
                return true;
            } else if (this.TYPE == "Call"
                && exp.left instanceof AST_SymbolRef
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
        def(AST_Conditional, function(tw) {
            this.alternative.walk(tw);
        });
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            if (has_loop_control(this, tw.parent())) {
                push(tw);
            }
            this.condition.walk(tw);
            pop(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_For, function(tw, descend, compressor) {
            this.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            if (this.step) {
                if (has_loop_control(this, tw.parent())) {
                    pop(tw);
                }
                this.step.walk(tw);
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
            push(tw);
            } else if (init instanceof AST_SymbolRef) {
            }
            tw.in_loop = saved_loop;
        });
        def(AST_Function, function(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var iife;
            if (!fn.name
                && (iife = tw.parent()) instanceof AST_Call
                && all(iife.args, function(arg) {
                    return !(arg instanceof AST_Spread);
                })) {
                var hit = false;
                var aborts = false;
                fn.walk(new TreeWalker(function(node) {
                    if (hit) return aborts = true;
                    if (node instanceof AST_Return) return hit = true;
                }));
                if (aborts) push(tw);
                var safe = !fn.uses_arguments || tw.has_directive("use strict");
                fn.argnames.forEach(function(arg, i) {
                    scan_declaration(tw, arg, function() {
                    }, function(node, fixed) {
                        var d = node.definition();
                        if (safe && d.fixed === undefined) {
                            mark(tw, d);
                            tw.loop_ids[d.id] = tw.in_loop;
                            d.fixed = fixed;
                            d.fixed.assigns = [ arg ];
                        } else {
                            d.fixed = false;
                        }
                    });
                });
                var safe_ids = tw.safe_ids;
                pop(tw);
                if (!aborts) tw.safe_ids = safe_ids;
            } else {
        });
        def(AST_If, function(tw) {
            this.condition.walk(tw);
            pop(tw);
        });
        def(AST_LabeledStatement, function(tw) {
        });
        def(AST_Lambda, function(tw, descend, compressor) {
            descend();
            pop(tw);
            walk_defuns(tw, this);
        });
        def(AST_Switch, function(tw, descend, compressor) {
            this.body.forEach(function(branch) {
                branch.expression.walk(tw);
            })
        });
        def(AST_SwitchBranch, function(tw) {
            push(tw);
            walk_body(this, tw);
            pop(tw);
        });
        def(AST_SymbolCatch, function() {
        });
        def(AST_SymbolRef, function(tw, descend, compressor) {
            var d = this.definition();
            if (d.references.length == 1
                && d.orig[0] instanceof AST_SymbolDefun) {
                tw.loop_ids[d.id] = tw.in_loop;
            }
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
                        || !d.in_loop
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
        });
        def(AST_Toplevel, function(tw, descend, compressor) {
            this.globals.each(function(def) {
                reset_def(tw, compressor, def);
            });
            return true;
        });
        def(AST_Try, function(tw, descend, compressor) {
            if (this.bcatch) {
                this.bcatch.walk(tw);
            }
        });
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            var d = exp.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (safe_to_read(tw, d) && safe_to_assign(tw, d)) {
                push_ref(d, exp);
                mark(tw, d);
                if (d.single_use) d.single_use = false;
                d.fixed = function() {
                    return make_node(AST_Binary, node, {
                        left: make_node(AST_UnaryPrefix, node, {
                            operator: "+",
                        }),
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
        def(AST_VarDef, function(tw) {
            var node = this;
            if (!node.value) return;
            node.value.walk(tw);
            scan_declaration(tw, node.name, function() {
            }, function(name, fixed) {
                var d = name.definition();
                if (safe_to_assign(tw, d, true)) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    d.fixed = fixed;
                    d.fixed.assigns = [ node ];
                        || !(can_drop_symbol(name) || is_safe_lexical(d))) {
                        d.single_use = false;
                    }
                } else {
                    d.fixed = false;
                }
            });
        });
        def(AST_While, function(tw, descend) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            tw.in_loop = saved_loop;
        });
    })(function(node, func) {
        node.DEFMETHOD("reduce_vars", func);
    });

    function reset_flags(node) {
        node._squeezed = false;
        node._optimized = false;
        if (node instanceof AST_Scope) delete node._var_names;
    }
    AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
        var tw = new TreeWalker(compressor.option("reduce_vars") ? function(node, descend) {
        } : reset_flags);
        // Flow control for visiting `AST_Defun`s
        tw.defun_ids = Object.create(null);
        tw.defun_visited = Object.create(null);
        tw.in_loop = null;
        tw.loop_ids = Object.create(null);
        // - backup & restore via `save_ids` when visiting out-of-order sections
        tw.safe_ids = Object.create(null);
    });


    AST_Destructured.DEFMETHOD("convert_symbol", function(type, process) {
        return this.transform(new TreeTransformer(function(node, descend) {
            if (node instanceof AST_Destructured) {
                node = node.clone();
            }
            if (node instanceof AST_DestructuredKeyVal) {
                node = node.clone();
                node.value = node.value.transform(this);
            }
        }));
    });
    function convert_symbol(type, process) {
        var node = make_node(type, this, this);
    }
    AST_Destructured.DEFMETHOD("mark_symbol", function(process, tw) {
        var marker = new TreeWalker(function(node) {
            if (node instanceof AST_DestructuredKeyVal) {
                return true;
            }
            return process(node);
        });
        this.walk(marker);
    });
    function mark_symbol(process) {
        return process(this);
    }

    AST_Node.DEFMETHOD("match_symbol", function(predicate) {
    });
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    function make_sequence(orig, expressions) {
    }
    function make_node_from_constant(val, orig) {
    }
    function tighten_body(statements, compressor) {
        var CHANGED, max_iter = 10;
        do {
            CHANGED = false;
        } while (CHANGED && max_iter-- > 0);
        function collapse(statements, compressor) {
            var args;
            var candidates = [];
            var scanner = new TreeTransformer(function(node, descend) {
                if (!hit) {
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
                    var funarg = candidate.name instanceof AST_SymbolFunarg;
                    var may_throw = return_false;
                    if (candidate.may_throw(compressor)) {
                        if (funarg && scope instanceof AST_AsyncFunction) continue;
                        may_throw = in_try ? function(node) {
                            return node.has_side_effects(compressor);
                        } : side_effects_external;
                    }
                    var read_toplevel = false;
                    var modify_toplevel = false;
                    // Locate symbols which may execute code outside of scanning range
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    var rvalue = get_rvalue(candidate);
                    if (!side_effects) side_effects = value_has_side_effects();
                    var replace_all = replace_all_symbols(candidate);
                    var hit = funarg;
                    var abort = false;
                    var replaced = 0;
                    var assign_used = false;
                    var can_replace = !args || !hit;
                    if (!can_replace) {
                        for (var j = scope.argnames.lastIndexOf(candidate.name) + 1; !abort && j < args.length; j++) {
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
                    abort = true;
                }
                if (node instanceof AST_Switch) {
                    for (var i = 0; !abort && i < node.body.length; i++) {
                        if (branch instanceof AST_Case) {
                            scan_rhs = false;
                        }
                    }
                    abort = true;
                }
            }
            function should_stop(node, parent) {
                if (node instanceof AST_SymbolRef) {
                    scan_rhs = false;
                }
            }
            function is_last_node(node, parent) {
                if (node instanceof AST_Call) {
                    var replace = can_replace;
                    can_replace = false;
                    var after = stop_after;
                    var if_hit = stop_if_hit;
                    stop_if_hit = if_hit;
                    stop_after = after;
                    can_replace = replace;
                    abort = false;
                }
            }
            function extract_args() {
                var iife, fn = compressor.self();
                if (is_function(fn)
                    && (iife = compressor.parent()) instanceof AST_Call
                    })) {
                    var len = fn.argnames.length;
                    args = iife.args.slice(len);
                    for (var i = len; --i >= 0;) {
                        if (sym instanceof AST_Destructured) {
                            candidates.length = 0;
                        }
                    }
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
            function remove_candidate(expr) {
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    hit = true;
                    if (node instanceof AST_VarDef) {
                        if (value_def) value_def.replaced++;
                    }
                }, patch_sequence);
                abort = false;
                hit = false;
            }
            function symbol_in_lvalues(sym, parent) {
                scan_rhs = false;
            }
        }
        function eliminate_spurious_blocks(statements) {
            for (var i = 0; i < statements.length;) {
                if (stat instanceof AST_BlockStatement) {
                    })) {
                        CHANGED = true;
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
            }
        }
        function handle_if_return(statements, compressor) {
            for (var i = statements.length; --i >= 0;) {
                if (in_lambda && !next && stat instanceof AST_Return) {
                    if (!stat.value) {
                        CHANGED = true;
                    }
                    if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
                        CHANGED = true;
                    }
                }
                if (stat instanceof AST_If) {
                    if (can_merge_flow(ab)) {
                        CHANGED = true;
                    }
                    if (ab && !stat.alternative && stat.body instanceof AST_BlockStatement && next instanceof AST_Jump) {
                        if (negated.print_to_string().length <= stat.condition.print_to_string().length) {
                            CHANGED = true;
                        }
                    }
                    if (can_merge_flow(alt)) {
                        CHANGED = true;
                    }
                }
                if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                        && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
                        CHANGED = true;
                    }
                    if (!stat.alternative && next instanceof AST_Return) {
                        CHANGED = true;
                    }
                    if (!stat.alternative && !next && in_lambda && (in_bool || value && multiple_if_returns)) {
                        CHANGED = true;
                    }
                        && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
                        CHANGED = true;
                    }
                }
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
        function join_var_assign(definitions, exprs, keep) {
            while (exprs.length > keep) {
                var expr = exprs[0];
                var lhs = expr.left;
                var def = lhs.definition();
                def.replaced++;
            }
        }
        function join_consecutive_vars(statements) {
            for (var i = 0, j = -1; i < statements.length; i++) {
                if (stat instanceof AST_Definitions) {
                    if (prev && prev.TYPE == stat.TYPE) {
                        CHANGED = true;
                    } else if (defs && defs.TYPE == stat.TYPE && declarations_only(stat)) {
                        CHANGED = true;
                    } else {
                } else if (stat instanceof AST_Exit) {
                } else if (stat instanceof AST_For) {
                    if (exprs) {
                        CHANGED = true;
                    } else if (prev instanceof AST_Var && (!stat.init || stat.init.TYPE == prev.TYPE)) {
                        CHANGED = true;
                    } else if (defs && stat.init && defs.TYPE == stat.init.TYPE && declarations_only(stat.init)) {
                        CHANGED = true;
                    } else if (stat.init instanceof AST_Var) {
                } else if (stat instanceof AST_ForIn) {
                    if (defs && defs.TYPE == stat.init.TYPE) {
                        CHANGED = true;
                    }
                } else if (stat instanceof AST_If) {
                } else if (stat instanceof AST_SimpleStatement) {
                    if (exprs) {
                        CHANGED = true;
                    }
                } else if (stat instanceof AST_Switch) {
            }
            function join_assigns_expr(value) {
                CHANGED = true;
            }
            function merge_defns(stat) {
                return stat.transform(new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_Definitions) {
                        CHANGED = true;
                    }
                }));
            }
        }
    }
    var lazy_op = makePredicate("&& ||");
    function best_of_statement(ast1, ast2, threshold) {
    }

    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    function has_loop_control(loop, parent, type) {
        if (!type) type = AST_LoopControl;
    }
    function is_safe_lexical(def) {
        return def.name != "arguments" && def.orig.length < (def.orig[0] instanceof AST_SymbolLambda ? 3 : 2);
    }
})(function(node, optimizer) {
