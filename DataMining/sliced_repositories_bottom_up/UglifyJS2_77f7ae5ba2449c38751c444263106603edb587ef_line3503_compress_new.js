












function Compressor(options, false_by_default) {
    this.options = defaults(options, {
        directives      : !false_by_default,
        drop_console    : false,
        drop_debugger   : !false_by_default,
        evaluate        : !false_by_default,
        expression      : false,
        hoist_exports   : !false_by_default,
        keep_fnames     : false,
        pure_getters    : !false_by_default && "strict",
        reduce_funcs    : !false_by_default,
        reduce_vars     : !false_by_default,
        rests           : !false_by_default,
        sequences       : !false_by_default,
        strings         : !false_by_default,
        unsafe_proto    : false,
    }, true);
    var global_defs = this.options["global_defs"];
    if (typeof global_defs == "object") for (var key in global_defs) {
        if (/^@/.test(key) && HOP(global_defs, key)) {
            global_defs[key.slice(1)] = parse(global_defs[key], {
            });
        }
    }
    this.drop_fargs = this.options["keep_fargs"] ? return_false : function(lambda, parent) {
        var name = lambda.name;
        if (name.fixed_value() !== lambda) return false;
        var def = name.definition();
    };
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
        this.pure_funcs = pure_funcs;
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            var expr;
            if (node instanceof AST_Call) {
                expr = node.expression;
            } else if (node instanceof AST_Template) {
                expr = node.tag;
            }
        };
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
            var expr;
            if (node instanceof AST_Call) {
                expr = node.expression;
            } else if (node instanceof AST_Template) {
                expr = node.tag;
            }
        };
    } else {
        this.pure_funcs = return_true;
    }
    var sequences = this.options["sequences"];
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
        this.top_retain = function(def) {
        };
    }
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
        funcs: /funcs/.test(toplevel),
    } : {
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
        if (def.exported) return true;
        if (def.undeclared) return true;
        if (!(def.global || def.scope.resolve() instanceof AST_Toplevel)) return false;
        var toplevel = this.toplevel;
        return !all(def.orig, function(sym) {
            return toplevel[sym instanceof AST_SymbolDefun ? "funcs" : "vars"];
        });
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        if (this.option("expression")) {
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
                AST_Node.info("pass {pass}: last_count: {min_count}, count: {count}", {
                    pass: pass,
                    min_count: min_count,
                    count: count,
                });
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
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
        }
        // produced after OPT().
        // will now happen after this parent AST_Node has been properly substituted
        // thus gives a consistent AST snapshot.
        descend(node, this);
        // output and performance.
        descend(node, this);
        var opt = node.optimize(this);
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
        }
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
                    stat.definitions.forEach(function(defn) {
                    });
                } else {
                }
            } else if (stat instanceof AST_ExportReferences) {
                body.splice(i--, 1);
            }
        }
        function export_symbol(sym) {
            var node = make_node(AST_SymbolExport, sym, sym);
            node.alias = node.name;
        }
    });

    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
                return transform ? transform(node) : make_node(AST_Return, node, { value: node.body });
            }
            if (!insert && node instanceof AST_Return) {
                return transform ? transform(node) : make_node(AST_SimpleStatement, node, {
                });
            }
            if (node instanceof AST_Block) {
                for (var index = node.body.length; --index >= 0;) {
                    var stat = node.body[index];
                    if (!is_declaration(stat, true)) {
                        node.body[index] = stat.transform(tt);
                        break;
                    }
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
        var key = node.get_property();
        var value;
        if (obj instanceof AST_Array) {
            var elements = obj.elements;
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
                if (!can_hoist_property(prop)) return;
                if (!value && props[i].key === key) value = props[i].value;
            }
        }
    }
    function is_read_only_fn(value, name) {
        if (name == "valueOf") return false;
        if (value instanceof AST_RegExp) return native_fns.RegExp[name] && !value.value.global;
    }

    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
            return;
        }
        var lhs = is_lhs(node, parent);
        if (parent instanceof AST_Assign) switch (parent.operator) {
            return is_modified(compressor, tw, parent, parent, level + 1);
        }
        if (parent instanceof AST_Call) {
            return !immutable
                && parent.expression === node
                && !parent.is_expr_pure(compressor)
                && (!(value instanceof AST_LambdaExpression) || !(parent instanceof AST_New) && value.contains_this());
        }
        if (parent instanceof AST_Conditional) {
            if (parent.condition === node) return;
            return is_modified(compressor, tw, parent, parent, level + 1);
        }
        if (parent instanceof AST_ObjectKeyVal) {
            if (parent.value !== node) return;
        }
    }

    function is_lambda(node) {
        return node instanceof AST_Class || node instanceof AST_Lambda;
    }

    function safe_for_extends(node) {
    }
    function is_arguments(def) {
    }
    function is_funarg(def) {
        return def.orig[0] instanceof AST_SymbolFunarg || def.orig[1] instanceof AST_SymbolFunarg;
    }
    function cross_scope(def, sym) {
        do {
        } while (sym = sym.parent_scope);
    }
    function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.definition();
        if (ref.in_arg && is_funarg(def)) return false;
        return all(def.orig, function(sym) {
            if (sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet) {
                return compressor && can_varify(compressor, sym);
            }
        });
    }
    function has_escaped(d, scope, node, parent) {
        if (parent instanceof AST_VarDef) return parent.value === node;
    }
    var RE_POSITIVE_INTEGER = /^(0|[1-9][0-9]*)$/;
    (function(def) {
        def(AST_Node, noop);
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
                && !def.scope.pinned()
                && !(def.init instanceof AST_LambdaExpression && def.init !== def.scope)
                && def.init;
            def.reassigned = 0;
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }
        function reset_block_variables(tw, compressor, scope) {
        }
        function reset_variables(tw, compressor, scope) {
            scope.fn_defs = [];
            scope.variables.each(function(def) {
                reset_def(tw, compressor, def);
                if (def.fixed === null) {
                    def.safe_ids = tw.safe_ids;
                } else if (def.fixed) {
                    tw.loop_ids[def.id] = tw.in_loop;
                }
            });
            scope.may_call_this = function() {
                scope.may_call_this = scope.contains_this() ? return_true : return_false;
            };
            if (compressor.option("ie")) scope.variables.each(function(def) {
                var d = def.orig[0].definition();
                if (d !== def) d.fixed = false;
            });
        }

        function walk_fn_def(tw, fn) {
            var was_scanning = tw.fn_scanning;
            tw.fn_scanning = fn;
            fn.walk(tw);
            tw.fn_scanning = was_scanning;
        }
        function mark_fn_def(tw, def, fn) {
            if (!HOP(fn, "safe_ids")) return;
            var marker = fn.safe_ids;
            } else if (marker) {
                var visited = member(fn, tw.fn_visited);
                if (marker === tw.safe_ids) {
                } else if (visited) {
                } else {
                    fn.safe_ids = false;
                }
            } else if (tw.fn_scanning && tw.fn_scanning !== def.scope.resolve()) {
                fn.safe_ids = false;
            } else {
                fn.safe_ids = tw.safe_ids;
            }
        }
        function pop_scope(tw, scope) {
            var fn_defs = scope.fn_defs;
            var tangled = scope.may_call_this === return_true ? fn_defs : fn_defs.filter(function(fn) {
                if (fn.safe_ids === false) return true;
                fn.safe_ids = tw.safe_ids;
                walk_fn_def(tw, fn);
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
            if (def.last_ref !== false) def.last_ref = ref;
        }
        function safe_to_read(tw, def) {
            var safe = tw.safe_ids[def.id];
            if (safe) {
                var in_order = HOP(tw.safe_ids, def.id);
                if (!in_order) safe.read = safe.read && safe.read !== tw.safe_ids ? true : tw.safe_ids;
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                    if (in_order) delete def.safe_ids;
                }
                return !safe.assign || safe.assign === tw.safe_ids;
            }
        }
        function safe_to_assign(tw, def, declare) {
            if (def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
        }
        function make_ref(ref, fixed) {
            var node = make_node(AST_SymbolRef, ref, ref);
            node.fixed = fixed || make_node(AST_Undefined, ref);
        }
        function ref_once(compressor, def) {
        }
        function is_immutable(value) {
            if (value instanceof AST_Assign) {
                var op = value.operator;
            }
        }
        function value_in_use(node, parent) {
        }

        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (has_escaped(d, scope, node, parent)) {
                d.escaped.push(parent);
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
                if (d.scope.resolve() !== scope.resolve()) d.escaped.cross_scope = true;
            } else if (value_in_use(node, parent)) {
            } else if (parent instanceof AST_PropAccess && parent.expression === node) {
                value = read_property(value, parent);
                mark_escaped(tw, d, scope, parent, value, level + 1, depth + 1);
            }
            if (level > 0) return;
            d.direct_access = true;
        }
        function mark_assignment_to_arguments(node) {
            var expr = node.expression;
            var def = expr.definition();
            if (!is_arguments(def)) return;
            var key = node.property;
            if (key.is_constant()) key = key.value;
            if (!(key instanceof AST_Node) && !RE_POSITIVE_INTEGER.test(key)) return;
            def.reassigned++;
        }

        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    push(tw);
                    var save = fixed;
                    if (save) fixed = function() {
                    };
                    node.name.walk(scanner);
                    fixed = save;
                    return true;
                }
                if (node instanceof AST_DestructuredArray) {
                    var save = fixed;
                    node.elements.forEach(function(node, index) {
                        if (save) fixed = function() {
                            return make_node(AST_Sub, node, {
                                expression: save(),
                            });
                        };
                        node.walk(scanner);
                    });
                    if (node.rest) {
                        var fixed_node;
                        if (save) fixed = compressor.option("rests") && function() {
                            var value = save();
                            if (!fixed_node) fixed_node = make_node(AST_Array, node);
                            fixed_node.elements = value.elements.slice(node.elements.length);
                            return fixed_node;
                        };
                    }
                    fixed = save;
                    return true;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save = fixed;
                    node.properties.forEach(function(node) {
                        if (node.key instanceof AST_Node) {
                            push(tw);
                            node.key.walk(tw);
                            pop(tw);
                        }
                        if (save) fixed = function() {
                            var key = node.key;
                            var type = AST_Sub;
                            if (typeof key == "string") {
                                if (is_identifier_string(key)) {
                                    type = AST_Dot;
                                } else {
                                    key = make_node_from_constant(key, node);
                                }
                            }
                            return make_node(type, node, {
                                expression: save(),
                            });
                        };
                    });
                    if (node.rest) {
                        fixed = false;
                        node.rest.walk(scanner);
                    }
                    fixed = save;
                }
                visit(node, fixed, function() {
                    var save_len = tw.stack.length;
                    for (var i = 0, len = scanner.stack.length - 1; i < len; i++) {
                    }
                    tw.stack.length = save_len;
                });
            });
        }
        function reduce_iife(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var iife = tw.parent();
            var hit = is_async(fn) || is_generator(fn);
            var aborts = false;
            fn.walk(new TreeWalker(function(node) {
                if (hit) return aborts = true;
                if (node instanceof AST_Return) return hit = true;
                if (node instanceof AST_Scope && node !== fn) return true;
            }));
            // Virtually turn IIFE parameters into variable definitions:
            var safe = !fn.uses_arguments || tw.has_directive("use strict");
            fn.argnames.forEach(function(argname, i) {
                var value = iife.args[i];
                scan_declaration(tw, compressor, argname, function() {
                    var j = fn.argnames.indexOf(argname);
                    var arg = j < 0 ? value : iife.args[j];
                    if (arg instanceof AST_Sequence && arg.expressions.length < 2) arg = arg.expressions[0];
                }, visit);
            });
            var rest = fn.rest, fixed_node;
            if (rest) scan_declaration(tw, compressor, rest, compressor.option("rests") && function() {
                if (!fixed_node) fixed_node = make_node(AST_Array, fn);
                fixed_node.elements = iife.args.slice(fn.argnames.length);
                return fixed_node;
            }, visit);
            var safe_ids = tw.safe_ids;
            pop_scope(tw, fn);
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
            var right = node.right;
            var ld = left instanceof AST_SymbolRef && left.definition();
            switch (node.operator) {
                if (left.equivalent_to(right) && !left.has_side_effects(compressor)) {
                    node.__drop = true;
                }
                if (ld && right instanceof AST_LambdaExpression) {
                    walk_assign();
                    right.safe_ids = null;
                }
                return;
              case "&&=":
              case "||=":
                var lazy = true;
              default:
                ld.assignments++;
                var fixed = ld.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    ld.fixed = false;
                    return walk_lazy();
                }
                var safe = safe_to_read(tw, ld);
                if (safe && !left.in_arg && safe_to_assign(tw, ld)) {
                    if (ld.single_use) ld.single_use = false;
                    left.fixed = ld.fixed = function() {
                        return make_node(AST_Binary, node, {
                            operator: node.operator.slice(0, -1),
                            left: make_ref(left, fixed),
                            right: node.right,
                        });
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
                } else {
                    ld.fixed = false;
                }
            }

            function walk_prop(lhs) {
                } else if (lhs instanceof AST_SymbolRef) {
                    var d = lhs.definition();
                    if (d.fixed) {
                        lhs.fixed = d.fixed;
                        if (lhs.fixed.assigns) {
                        } else {
                            lhs.fixed.assigns = [ node ];
                        }
                    }
                } else {
            }
            function walk_assign() {
                var recursive = ld && recursive_ref(tw, ld);
                var modified = is_modified(compressor, tw, node, right, 0, is_immutable(right), recursive);
                scan_declaration(tw, compressor, left, function() {
                }, function(sym, fixed, walk) {
                    var d = sym.definition();
                    d.assignments++;
                    if (!fixed || sym.in_arg || !safe_to_assign(tw, d)) {
                        d.fixed = false;
                    } else if (modified) {
                        d.fixed = 0;
                    } else {
                            || d.orig.length == 1 && d.orig[0] instanceof AST_SymbolDefun) {
                            d.single_use = false;
                        }
                        tw.loop_ids[d.id] = tw.in_loop;
                        sym.fixed = d.fixed = fixed;
                        sym.fixed.assigns = [ node ];
                    }
                });
            }
            function walk_lazy() {
                if (!lazy) return;
                left.walk(tw);
            }
        });
        def(AST_Binary, function(tw) {
            if (!lazy_op[this.operator]) return;
        });
        def(AST_BlockScope, function(tw, descend, compressor) {
        });
        def(AST_Call, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            if (exp instanceof AST_LambdaExpression) {
                var iife = is_iife_single(node);
                node.args.forEach(function(arg) {
                    if (arg instanceof AST_Spread) iife = false;
                });
                if (iife) exp.reduce_vars = reduce_iife;
            }
            if (node.TYPE == "Call" && tw.in_boolean_context()) {
                if (exp instanceof AST_SymbolRef) {
                    exp.definition().bool_fn++;
                } else if (exp instanceof AST_Assign && exp.operator == "=" && exp.left instanceof AST_SymbolRef) {
                    exp.left.definition().bool_fn++;
                }
            }
            var optional = node.optional;
            node.args.forEach(function(arg) {
                arg.walk(tw);
            });
            if (optional) pop(tw);
        });
        def(AST_Class, function(tw, descend, compressor) {
            var node = this;
            reset_block_variables(tw, compressor, node);
            var props = node.properties.filter(function(prop) {
            });
            if (node.name) {
                var d = node.name.definition();
                var parent = tw.parent();
                if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) d.single_use = false;
                if (safe_to_assign(tw, d, true)) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    d.fixed = function() {
                    };
                    d.fixed.assigns = [ node ];
                    if (!is_safe_lexical(d)) d.single_use = false;
                } else {
                    d.fixed = false;
                }
            }
            props.forEach(function(prop) {
                if (!prop.static || prop instanceof AST_ClassField && prop.value.contains_this()) {
                    prop.value.walk(tw);
                } else {
                }
            });
        });
        def(AST_Conditional, function(tw) {
            this.condition.walk(tw);
            this.consequent.walk(tw);
        });
        def(AST_Do, function(tw) {
            var save_loop = tw.in_loop;
            tw.in_loop = this;
            push(tw);
            this.body.walk(tw);
            this.condition.walk(tw);
            tw.in_loop = save_loop;
        });
        def(AST_For, function(tw, descend, compressor) {
            var node = this;
            var save_loop = tw.in_loop;
            tw.in_loop = node;
            push(tw);
            if (node.step) {
                if (has_loop_control(node, tw.parent())) {
                }
            }
            tw.in_loop = save_loop;
        });
        def(AST_ForEnumeration, function(tw, descend, compressor) {
            var node = this;
            reset_block_variables(tw, compressor, node);
            node.object.walk(tw);
            var save_loop = tw.in_loop;
            tw.in_loop = node;
            push(tw);
            var init = node.init;
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
            }
            node.body.walk(tw);
            tw.in_loop = save_loop;
        });
        def(AST_If, function(tw) {
            push(tw);
        });
        def(AST_LabeledStatement, function(tw) {
            push(tw);
            this.body.walk(tw);
        });
        def(AST_Lambda, function(tw, descend, compressor) {
            var fn = this;
            if (HOP(fn, "safe_ids") && fn.safe_ids !== tw.safe_ids) return true;
            fn.inlined = false;
            if (fn.name) mark_escaped(tw, fn.name.definition(), fn, fn.name, fn, 0, 1);
        });
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            reset_variables(tw, compressor, fn);
            descend();
            pop_scope(tw, fn);
            return true;
        });
        def(AST_Sub, function(tw) {
            if (!this.optional) return;
            this.expression.walk(tw);
        });
        def(AST_Switch, function(tw, descend, compressor) {
            var node = this;
            var first = true;
            node.body.forEach(function(branch) {
                if (first) {
                    first = false;
                    push(tw);
                }
            })
            if (!first) pop(tw);
            walk_body(node, tw);
            return true;
        });
        def(AST_SwitchBranch, function(tw) {
            push(tw);
        });
        def(AST_SymbolRef, function(tw, descend, compressor) {
            var d = this.definition();
            push_ref(d, this);
            if (d.references.length == 1 && !d.fixed && d.orig[0] instanceof AST_SymbolDefun) {
                tw.loop_ids[d.id] = tw.in_loop;
            }
            var recursive = recursive_ref(tw, d);
            if (recursive) recursive.enclosed.forEach(function(def) {
                if (d === def) return;
                var safe = tw.safe_ids[def.id];
                safe.assign = true;
            });
            } else if (d.fixed === undefined || !safe_to_read(tw, d)) {
                d.fixed = false;
            } else if (d.fixed) {
                if (this.in_arg && d.orig[0] instanceof AST_SymbolLambda) this.fixed = d.scope;
                var value = this.fixed_value();
                if (recursive) {
                    d.recursive_refs++;
                } else if (value && ref_once(compressor, d)) {
                    d.in_loop = tw.loop_ids[d.id] !== tw.in_loop;
                    d.single_use = is_lambda(value)
                } else {
                    d.single_use = false;
                }
                if (is_modified(compressor, tw, this, value, 0, is_immutable(value), recursive)) {
                    if (d.single_use) {
                        d.single_use = "m";
                    } else {
                        d.fixed = 0;
                    }
                }
                if (d.fixed && tw.loop_ids[d.id] !== tw.in_loop) d.cross_loop = true;
            }
            if (!this.fixed) this.fixed = d.fixed;
            var parent;
            if (value instanceof AST_Lambda
                && !((parent = tw.parent()) instanceof AST_Call && parent.expression === this)) {
        });
        def(AST_Template, function(tw, descend) {
            var node = this;
            var tag = node.tag;
            if (!tag) return;
            if (tag instanceof AST_LambdaExpression) {
                node.expressions.forEach(function(exp) {
                    exp.walk(tw);
                });
                tag.walk(tw);
                return true;
            }
            node.expressions.forEach(function(exp) {
                exp.walk(tw);
            });
        });
        def(AST_Toplevel, function(tw, descend, compressor) {
            var node = this;
            node.globals.each(function(def) {
                reset_def(tw, compressor, def);
            });
            push(tw);
            reset_variables(tw, compressor, node);
            return true;
        });
        def(AST_Try, function(tw, descend, compressor) {
            var node = this;
            if (node.bcatch) {
                pop(tw);
            }
        });
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            if (!(exp instanceof AST_SymbolRef)) {
                return;
            }
            var d = exp.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (safe_to_read(tw, d) && !exp.in_arg && safe_to_assign(tw, d)) {
                push_ref(d, exp);
                mark(tw, d);
                if (d.single_use) d.single_use = false;
                d.fixed = function() {
                    return make_node(AST_Binary, node, {
                        left: make_node(AST_UnaryPrefix, node, {
                            expression: make_ref(exp, fixed)
                        }),
                    });
                };
                d.fixed.assigns = fixed && fixed.assigns ? fixed.assigns.slice() : [];
                if (node instanceof AST_UnaryPrefix) {
                    exp.fixed = d.fixed;
                } else {
                    exp.fixed = function() {
                        return make_node(AST_UnaryPrefix, node, {
                            expression: make_ref(exp, fixed)
                        });
                    };
                    exp.fixed.assigns = fixed && fixed.assigns;
                }
            } else {
                d.fixed = false;
            }
            return true;
        });
        def(AST_VarDef, function(tw, descend, compressor) {
            var node = this;
            var value = node.value;
            if (value instanceof AST_LambdaExpression && node.name instanceof AST_SymbolDeclaration) {
                value.safe_ids = null;
                var ld = node.name.definition();
            } else if (value) {
            } else if (tw.parent() instanceof AST_Let) {
                walk_defn();
            }
            function walk_defn() {
                scan_declaration(tw, compressor, node.name, function() {
                }, function(name, fixed) {
                    var d = name.definition();
                    if (fixed && safe_to_assign(tw, d, true)) {
                        tw.loop_ids[d.id] = tw.in_loop;
                        d.fixed = fixed;
                        d.fixed.assigns = [ node ];
                        if (name instanceof AST_SymbolConst && d.redefined()
                            || !(can_drop_symbol(name) || is_safe_lexical(d)
                            d.single_use = false;
                        }
                    } else {
                        d.fixed = false;
                    }
                });
            }
        });
        def(AST_While, function(tw, descend) {
            var save_loop = tw.in_loop;
            tw.in_loop = this;
            pop(tw);
            tw.in_loop = save_loop;
        });
    })(function(node, func) {
    });
    function reset_flags(node) {
        node._squeezed = false;
        node._optimized = false;
    }
    AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
        var tw = new TreeWalker(compressor.option("reduce_vars") ? function(node, descend) {
            reset_flags(node);
        } : reset_flags);
        // Flow control for visiting lambda definitions
        tw.fn_scanning = null;
        tw.fn_visited = [];
        tw.in_loop = null;
        tw.loop_ids = Object.create(null);
        // - `push()` & `pop()` when visiting conditional branches
        tw.safe_ids = Object.create(null);
    });
    AST_Symbol.DEFMETHOD("fixed_value", function() {
        var fixed = this.definition().fixed;
        if (fixed) {
            if (this.fixed) fixed = this.fixed;
            return fixed instanceof AST_Node ? fixed : fixed();
        }
        fixed = fixed === 0 && this.fixed;
        var value = fixed instanceof AST_Node ? fixed : fixed();
        return value.is_constant() && value;
    });

    function convert_destructured(type, process) {
        return this.transform(new TreeTransformer(function(node, descend) {
            if (node instanceof AST_DefaultValue) {
                node = node.clone();
                node.name = node.name.transform(this);
            }
            if (node instanceof AST_Destructured) {
                node = node.clone();
                descend(node, this);
                return node;
            }
            if (node instanceof AST_DestructuredKeyVal) {
                node = node.clone();
                node.value = node.value.transform(this);
            }
        }));
    }
    AST_Destructured.DEFMETHOD("convert_symbol", convert_destructured);
    function mark_destructured(process, tw) {
        var marker = new TreeWalker(function(node) {
            if (node instanceof AST_DefaultValue) {
                node.value.walk(tw);
                node.name.walk(marker);
                return true;
            }
            if (node instanceof AST_DestructuredKeyVal) {
                node.value.walk(marker);
            }
        });
        this.walk(marker);
    }
    function mark_symbol(process) {
    }
    function match_destructured(predicate, ignore_side_effects) {
        var found = false;
        var tw = new TreeWalker(function(node) {
            if (node instanceof AST_DefaultValue) {
                if (!ignore_side_effects) return found = true;
                node.name.walk(tw);
                return true;
            }
            if (node instanceof AST_DestructuredKeyVal) {
                if (!ignore_side_effects && node.key instanceof AST_Node) return found = true;
                return true;
            }
            if (predicate(node)) return found = true;
        });
    }

    function find_scope(compressor) {
        var level = 0, node;
        while (node = compressor.parent(level++)) {
            if (node.variables) return node;
        }
    }
    var identifier_atom = makePredicate("Infinity NaN undefined");
    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_PropAccess) {
            if (lhs.property === "__proto__") return true;
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                lhs = lhs.fixed_value();
            }
        }
        if (lhs instanceof AST_SymbolRef) {
            if (lhs.is_immutable()) return true;
            var def = lhs.definition();
            return compressor.exposed(def) && identifier_atom[def.name];
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
        return make_node(AST_Sequence, orig, {
        });
    }
    function make_node_from_constant(val, orig) {
        switch (typeof val) {
            if (isNaN(val)) return make_node(AST_NaN, orig);
            if (isFinite(val)) {
                return 1 / val < 0 ? make_node(AST_UnaryPrefix, orig, {
                }) : make_node(AST_Number, orig, { value: val });
            }
            return make_node(AST_Undefined, orig);
        }
    }
    function is_lexical_definition(stat) {
    }
    function is_iife_single(call) {
    }
    function is_declaration(stat, lexical) {
    }
    function tighten_body(statements, compressor) {
        var CHANGED, max_iter = 10;
        do {
            CHANGED = false;
        } while (CHANGED && max_iter-- > 0);
        function collapse(statements, compressor) {
            var candidates = [];
            var scanner = new TreeTransformer(function(node, descend) {
                if (!hit) {
                    stop_after = (value_def ? find_stop_value : find_stop)(node, 0);
                    if (stop_after === node) abort = true;
                }
                if (should_stop(node, parent)) {
                    abort = true;
                }
                var hit_rhs;
                if (!(node instanceof AST_SymbolDeclaration)
                    && (scan_lhs && lhs.equivalent_to(node)
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (!can_replace || stop_if_hit && (hit_rhs || !lhs_local || !replace_all)) {
                        if (!hit_rhs && !value_def) abort = true;
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
                }
                if (is_last_node(node, parent) || may_throw(node)) {
                    stop_after = node;
                    if (node instanceof AST_Scope) abort = true;
                }
                if (node instanceof AST_DefaultValue) {
                    node.name = node.name.transform(scanner);
                    node.value = node.value.transform(scanner);
                }
            }, signal_abort);
            var multi_replacer = new TreeTransformer(function(node) {
                if (!hit) {
                    switch (hit_stack.length - hit_index) {
                      case 0:
                        hit = true;
                        if (assign_used) return node;
                        if (node !== candidate) return node;
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
                        return handle_custom_scan_order(node, multi_replacer);
                    }
                }
                if (node instanceof AST_SymbolRef && node.definition() === def) {
                    if (!--replaced) abort = true;
                    if (replaced == assign_pos) {
                        abort = true;
                    }
                    def.replaced++;
                }
            }, patch_sequence);
            while (--stat_index >= 0) {
                var hit_stack = [];
                while (candidates.length > 0) {
                    hit_stack = candidates.pop();
                    var hit_index = 0;
                    var candidate = hit_stack[hit_stack.length - 1];
                    var assign_pos = -1;
                    var assign_used = false;
                    var remaining;
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
                        if (funarg && is_async(scope)) continue;
                        may_throw = in_try ? function(node) {
                            return node.has_side_effects(compressor);
                        } : side_effects_external;
                    }
                    var read_toplevel = false;
                    var modify_toplevel = false;
                    // Locate symbols which may execute code outside of scanning range
                    var well_defined = true;
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    var rvalue = get_rvalue(candidate);
                    if (!side_effects) side_effects = value_has_side_effects();
                    var check_destructured = in_try || !lhs_local ? function(node) {
                        return node instanceof AST_Destructured;
                    } : return_false;
                    var replace_all = replace_all_symbols(candidate);
                    var hit = funarg;
                    var abort = false;
                    var replaced = 0;
                    var can_replace = !args || !hit;
                    if (!can_replace) {
                        for (var j = candidate.arg_index + 1; !abort && j < args.length; j++) {
                            if (args[j]) args[j].transform(scanner);
                        }
                        can_replace = true;
                    }
                    for (var i = stat_index; !abort && i < statements.length; i++) {
                        statements[i].transform(scanner);
                    }
                    if (value_def) {
                        if (!replaced || remaining > replaced + assign_used) {
                            candidates.push(hit_stack);
                            force_single = true;
                            continue;
                        }
                        if (replaced == assign_pos) assign_used = true;
                        var def = lhs.definition();
                        abort = false;
                        hit_index = 0;
                        hit = funarg;
                        for (var i = stat_index; !abort && i < statements.length; i++) {
                            if (!statements[i].transform(multi_replacer)) statements.splice(i--, 1);
                        }
                        replaced = candidate instanceof AST_VarDef
                            && candidate === hit_stack[hit_stack.length - 1]
                            && def.references.length == def.replaced
                            && !compressor.exposed(def);
                        value_def.last_ref = false;
                        value_def.single_use = false;
                        CHANGED = true;
                    }
                    if (replaced && !remove_candidate(candidate)) statements.splice(stat_index, 1);
                }
            }
            function signal_abort(node) {
                if (stop_after === node) abort = true;
            }
            function handle_custom_scan_order(node, tt) {
                if (node instanceof AST_ForEnumeration) {
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
                    var after = stop_after;
                    })) {
                        abort = true;
                    } else if (is_arrow(fn) && fn.value) {
                    stop_after = after;
                    abort = false;
                }
            }
            function extract_args() {
                    })) {
                    for (var i = fn.argnames.length; --i >= 0;) {
                        if (sym instanceof AST_Destructured) {
                            candidates.length = 0;
                        }
                    }
                }
            }
            function extract_candidates(expr, unused) {
                } else if (expr instanceof AST_Unary) {
                    } else {
                        extract_candidates(expr.expression);
                    }
                } else if (expr instanceof AST_VarDef) {
                } else if (expr instanceof AST_Yield) {
            }
            function find_stop(node, level) {
            }
            function find_stop_expr(expr, cont, node, parent, level) {
                var after = stop_after;
                var stack = scanner.stack;
                scanner.stack = [ parent ];
                scanner.stack = stack;
                stop_after = after;
                if (abort) {
                    abort = false;
                }
            }
            function find_stop_value(node, level) {
            }
            function mangleable_var(rhs) {
                var value = rhs instanceof AST_Assign && rhs.operator == "=" ? rhs.left : rhs;
                var def = value.definition();
                if (value !== rhs) {
                    var expr = candidate.clone();
                    expr[expr instanceof AST_Assign ? "right" : "value"] = value;
                    if (candidate.name_index >= 0) {
                        expr.name_index = candidate.name_index;
                        expr.arg_index = candidate.arg_index;
                    }
                    candidate = expr;
                }
                return value_def = def;
            }
            function get_lhs(expr) {
            }
            function get_rvalue(expr) {
                if (expr instanceof AST_Binary) {
                    var node = expr.clone();
                    node.right = expr.right.right;
                }
            }
            function invariant(expr) {
                if (expr instanceof AST_Binary && lazy_op[expr.operator]) {
                    return invariant(expr.left) && invariant(expr.right);
                }
            }
            function foldable(expr) {
                while (expr instanceof AST_Assign && expr.operator == "=") {
                    expr = expr.right;
                }
            }
            function remove_candidate(expr) {
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_VarDef) {
                        if (value_def) value_def.replaced++;
                    }
                }, patch_sequence);
                abort = false;
            }
            function symbol_in_lvalues(sym, parent) {
                scan_rhs = false;
            }
        }
        function eliminate_spurious_blocks(statements) {
            for (var i = 0; i < statements.length;) {
                if (stat instanceof AST_BlockStatement) {
                    if (all(stat.body, safe_to_trim)) {
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
                    if (tail instanceof AST_UnaryPrefix && tail.operator == "void") {
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
                        || stat instanceof AST_Break && lct instanceof AST_IterationStatement) {
                        statements[n++] = stat;
                    } else if (stat.label) {
                } else {
                    statements[n++] = stat;
                }
            }
            statements.length = n;
            CHANGED = statements.length != len;
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
                        if (stat.value || !in_async_generator(scope)) {
                            stat.value = cons_seq(stat.value || make_node(AST_Undefined, stat)).optimize(compressor);
                        }
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
                        if (!is_lexical_definition(stat.init)) stat.object = cons_seq(stat.object);
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
        function extract_exprs(body) {
            if (body instanceof AST_Sequence) return body.expressions.slice();
        }
        function join_assigns(defn, body, keep) {
            var exprs = extract_exprs(body);
            for (var i = exprs.length - (keep || 0); --i >= 0;) {
            }
        }
    }
})(function(node, optimizer) {
