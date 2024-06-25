












function Compressor(options, false_by_default) {
    this.options = defaults(options, {
        expression      : false,
        functions       : !false_by_default,
        global_defs     : false,
        hoist_funs      : false,
        hoist_props     : !false_by_default,
        if_return       : !false_by_default,
        properties      : !false_by_default,
        toplevel        : !!(options && options["top_retain"]),
        typeofs         : !false_by_default,
        unsafe          : false,
        unsafe_comps    : false,
        unsafe_Function : false,
        unsafe_regexp   : false,
    }, true);
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
        if (name.fixed_value() !== lambda) return false;
        var def = name.definition();
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
        vars: /vars/.test(toplevel)
    } : {
    };
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        if (this.option("expression")) {
        }
        var passes = +this.options.passes || 1;
        var min_count = 1 / 0;
        var stopping = false;
        var mangle = { ie8: this.option("ie8") };
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
    },
    before: function(node, descend, in_list) {
        if (node._squeezed) return node;
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
            node.process_boolean_returns(this);
        }
        // thus gives a consistent AST snapshot.
        descend(node, this);
        // Existing code relies on how AST_Node.optimize() worked, and omitting the
        // following replacement call would result in degraded efficiency of both
        // output and performance.
        var opt = node.optimize(this);
        if (is_scope && opt === node) {
            descend(opt, this);
        }
        if (opt === node) opt._squeezed = true;
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
        return self;
    });

    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
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
                return node;
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
        self.transform(tt);
    });

    function read_property(obj, node) {
        var key = node.getProperty();
        if (key instanceof AST_Node) return;
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
        }
        var lhs = is_lhs(node, parent);
        if (lhs) return lhs;
        if (!immutable
            && parent instanceof AST_Call
            && parent.expression === node
            && !parent.is_expr_pure(compressor)
            && (!(value instanceof AST_Function)
                || !(parent instanceof AST_New) && value.contains_this())) {
            return true;
        }
        if (parent instanceof AST_Array) {
        }
        if (parent instanceof AST_PropAccess && parent.expression === node) {
            var prop = read_property(value, parent);
            return (!immutable || recursive) && is_modified(compressor, tw, parent, prop, level + 1);
        }
    }
    function is_arguments(def) {
        if (def.name != "arguments") return false;
    }

    (function(def) {
        def(AST_Node, noop);

        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.scope.pinned()
                && !compressor.exposed(def)
            if (def.fixed instanceof AST_Defun && !all(def.references, function(ref) {
                var scope = ref.scope;
                do {
                } while (scope instanceof AST_Function && (scope = scope.parent_scope));
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
                reset_def(tw, compressor, def);
                if (def.fixed === null) {
                    def.safe_ids = tw.safe_ids;
                    mark(tw, def, true);
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
                } else if (visited) {
                    def.init.enclosed.forEach(function(d) {
                        if (!safe_to_read(tw, d)) d.fixed = false;
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
                if (def.init instanceof AST_Defun && !tw.defun_visited[def.id]) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                    def.init.walk(tw);
                }
            });
        }
        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }
        function pop(tw) {
            tw.safe_ids = Object.getPrototypeOf(tw.safe_ids);
        }
        function mark(tw, def, safe) {
            tw.safe_ids[def.id] = safe;
        }
        function add_assign(tw, def, node) {
        }
        function set_assign(tw, def, node) {
            if (def.fixed === false) return;
            var assigns = tw.assigns.get(def.id);
            if (assigns) assigns.forEach(function(node) {
                node.assigns = assigns;
            });
            tw.assigns.set(def.id, def.assigns = [ node ]);
        }
        function safe_to_read(tw, def) {
            if (tw.safe_ids[def.id]) {
                if (def.fixed == null) {
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                }
            }
        }
        function safe_to_assign(tw, def, value) {
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
        }
        function is_immutable(value) {
            if (!value) return false;
            return value.is_constant()
                || value instanceof AST_Lambda
                || value instanceof AST_This;
        }
        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
                || parent instanceof AST_VarDef && node === parent.value) {
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
            } else if (parent instanceof AST_Array
            } else if (parent instanceof AST_ObjectKeyVal && node === parent.value) {
                var obj = tw.parent(level + 1);
                mark_escaped(tw, d, scope, obj, obj, level + 2, depth);
            } else if (parent instanceof AST_PropAccess && node === parent.expression) {
                value = read_property(value, parent);
            }
            d.direct_access = true;
        }
        var suppressor = new TreeWalker(function(node) {
            if (!(node instanceof AST_Symbol)) return;
            var d = node.definition();
            d.fixed = false;
        });
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var sym = node.left;
            if (!(sym instanceof AST_SymbolRef)) {
            }
            if (sym.fixed) delete sym.fixed;
            var d = sym.definition();
            d.assignments++;
            var eq = node.operator == "=";
            var value = eq ? node.right : node;
            sym.fixed = d.fixed = eq ? function() {
                return node.right;
            } : function() {
            if (eq) {
                mark_escaped(tw, d, sym.scope, node, value, 0, 1);
                set_assign(tw, d, node);
            } else {
            }
        });
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (exp instanceof AST_Function) {
                this.args.forEach(function(arg) {
                });
            } else if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
            } else if (this.TYPE == "Call"
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
        def(AST_Case, function(tw) {
            push(tw);
            walk_body(this, tw);
        });
        def(AST_Default, function(tw, descend) {
            push(tw);
        });
        def(AST_Defun, function(tw, descend, compressor) {
            var id = this.name.definition().id;
            tw.defun_visited[id] = true;
            pop(tw);
            walk_defuns(tw, this);
        });
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            tw.in_loop = saved_loop;
            return true;
        });
        def(AST_For, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            pop(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_ForIn, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            this.body.walk(tw);
            tw.in_loop = saved_loop;
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
                if (aborts) push(tw);
                reset_variables(tw, compressor, fn);
                // So existing transformation rules can work on them.
                fn.argnames.forEach(function(arg, i) {
                    var d = arg.definition();
                    if (d.fixed === undefined && (!fn.uses_arguments || tw.has_directive("use strict"))) {
                        d.fixed = function() {
                            var j = fn.argnames.indexOf(arg);
                            return iife.args[j] || make_node(AST_Undefined, iife);
                        };
                        tw.loop_ids[d.id] = tw.in_loop;
                        mark(tw, d, true);
                    } else {
                        d.fixed = false;
                    }
                });
                var safe_ids = tw.safe_ids;
                if (!aborts) tw.safe_ids = safe_ids;
            } else {
                push(tw);
                pop(tw);
                walk_defuns(tw, fn);
            }
        });
        def(AST_If, function(tw) {
            pop(tw);
            if (this.alternative) {
                push(tw);
            }
        });
        def(AST_LabeledStatement, function(tw) {
        });
        def(AST_SymbolCatch, function() {
            this.definition().fixed = false;
        });
        def(AST_SymbolRef, function(tw, descend, compressor) {
            if (this.fixed) delete this.fixed;
            var d = this.definition();
            if (d.references.length == 1
                && d.orig[0] instanceof AST_SymbolDefun) {
                tw.loop_ids[d.id] = tw.in_loop;
            }
            var value;
            if (d.fixed === undefined || !safe_to_read(tw, d)) {
                d.fixed = false;
            } else if (d.fixed) {
                value = this.fixed_value();
                var recursive = recursive_ref(tw, d);
                if (recursive) {
                    d.recursive_refs++;
                } else if (value && ref_once(tw, compressor, d)) {
                    d.single_use = value instanceof AST_Lambda && !value.pinned()
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
                mark_escaped(tw, d, this.scope, this, value, 0, 1);
            }
            var parent;
            if (d.fixed instanceof AST_Defun
                && !((parent = tw.parent()) instanceof AST_Call && parent.expression === this)) {
            }
        });
        def(AST_Toplevel, function(tw, descend, compressor) {
            this.globals.each(function(def) {
            });
            push(tw);
        });
        def(AST_Try, function(tw) {
            push(tw);
            walk_body(this, tw);
            pop(tw);
            if (this.bcatch) {
                this.bcatch.walk(tw);
            }
        });
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            var d = exp.definition();
            var safe = safe_to_assign(tw, d, true);
            d.assignments++;
            var fixed = d.fixed;
            if (!fixed) return;
            exp.fixed = d.fixed = function() {
                var value = fixed instanceof AST_Node ? fixed : fixed();
                return value && make_node(AST_Binary, node, {
                    left: make_node(AST_UnaryPrefix, node, {
                    }),
                });
            };
            if (!safe) return;
        });
        def(AST_VarDef, function(tw, descend) {
            var node = this;
            var d = node.name.definition();
            if (node.value) {
                if (safe_to_assign(tw, d, node.value)) {
                    d.fixed = function() {
                        return node.value;
                    };
                    tw.loop_ids[d.id] = tw.in_loop;
                    mark(tw, d, true);
                } else {
                    d.fixed = false;
                }
            }
        });
        def(AST_While, function(tw, descend) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            tw.in_loop = saved_loop;
        });
    })(function(node, func) {
    AST_Toplevel.DEFMETHOD("reset_opt_flags", function(compressor) {
        var tw = new TreeWalker(compressor.option("reduce_vars") ? function(node, descend) {
            reset_flags(node);
        } : reset_flags);
        // Assignment chains
        tw.assigns = new Dictionary();
        tw.defun_ids = Object.create(null);
        tw.defun_visited = Object.create(null);
        tw.in_loop = null;
        tw.loop_ids = Object.create(null);
        // Stack of look-up tables to keep track of whether a `SymbolDef` has been
        tw.safe_ids = Object.create(null);
        function reset_flags(node) {
            node._squeezed = false;
            node._optimized = false;
            if (node instanceof AST_Scope) delete node._var_names;
        }
    });
    AST_Symbol.DEFMETHOD("fixed_value", function() {
        var fixed = this.definition().fixed;
        if (this.fixed) fixed = this.fixed;
    });
    AST_SymbolRef.DEFMETHOD("is_immutable", function() {
        var def = this.definition();
        if (def.orig.length != 1) return false;
    });
    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                lhs = lhs.fixed_value();
            }
        }
    }
    function find_variable(compressor, name) {
    }

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
        switch (typeof val) {
          case "string":
          case "boolean":
            return make_node(val ? AST_True : AST_False, orig);
            if (val === null) {
            }
            if (val instanceof RegExp) {
                return make_node(AST_RegExp, orig, { value: val });
            }
        }
    }
    function needs_unbinding(compressor, val) {
        return val instanceof AST_PropAccess
    }
    function merge_sequence(array, node) {
        if (node instanceof AST_Sequence) {
        } else {
            array.push(node);
        }
    }
    function as_statement_array(thing) {
        if (thing === null) return [];
        if (thing instanceof AST_EmptyStatement) return [];
    }
    function is_empty(thing) {
        return false;
    }

    function loop_body(x) {
    }


    function is_iife_call(node) {
    }
    function get_rvalue(expr) {
        return expr[expr instanceof AST_Assign ? "right" : "value"];
    }
    AST_SymbolRef.DEFMETHOD("is_declared", function(compressor) {
    });
    function is_identifier_atom(node) {
            || node instanceof AST_NaN
            || node instanceof AST_Undefined;
    }

    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
        var CHANGED, max_iter = 10;
        do {
            CHANGED = false;
            if (compressor.option("if_return")) {
            }
            if (compressor.option("collapse_vars")) {
                collapse(statements, compressor);
            }
        } while (CHANGED && max_iter-- > 0);

        function find_loop_scope_try() {
            var node = compressor.self(), level = 0;
            do {
                if (node instanceof AST_Catch || node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                } else if (node instanceof AST_Try) {
                    in_try = node;
                }
            } while (node = compressor.parent(level++));
        }
        // - `var a = x;`
        // - `a = x;`
        // to fold assignment into the site for compression.
        function collapse(statements, compressor) {
            var candidates = [];
            var stat_index = statements.length;
            var scanner = new TreeTransformer(function(node, descend) {
                if (!hit) {
                    stop_after = (value_def ? find_stop_value : find_stop)(node, 0);
                    if (stop_after === node) abort = true;
                }
                // Stop immediately if these node types are encountered
                var parent = scanner.parent();
                if (should_stop(node, parent)) {
                    abort = true;
                    return node;
                }
                // Stop only if candidate is found within conditional branches
                if (!stop_if_hit && in_conditional(node, parent)) {
                    stop_if_hit = parent;
                }
                // Skip transient nodes caused by single-use variable replacement
                if (node.single_use && parent instanceof AST_VarDef && parent.value === node) return node;
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
                        return get_rvalue(candidate);
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
                    var scan_rhs = foldable(get_rhs(candidate));
                    if (!scan_lhs && !scan_rhs) continue;
                    var modify_toplevel = false;
                    // Locate symbols which may execute code outside of scanning range
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    if (!side_effects) side_effects = value_has_side_effects(candidate);
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
            function handle_custom_scan_order(node) {
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
            }
            function in_conditional(node, parent) {
            }
            function is_last_node(node, parent) {
                if (node instanceof AST_Call) {
                    var after = stop_after;
                    var if_hit = stop_if_hit;
                    var rhs_fn = scan_rhs;
                    scan_rhs = rhs_fn;
                    stop_if_hit = if_hit;
                    stop_after = after;
                    abort = false;
                }
            }
            function extract_candidates(expr) {
                } else if (expr instanceof AST_For) {
                    if (expr.condition) extract_candidates(expr.condition);
                    if (!(expr.body instanceof AST_Block)) {
                    }
                } else if (expr instanceof AST_ForIn) {
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
            function get_rhs(expr) {
            }
            function foldable(expr) {
            }
            function remove_candidate(expr) {
                return statements[stat_index].transform(new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_VarDef) {
                        if (value_def) value_def.replaced++;
                    }
                }, patch_sequence));
            }
            function symbol_in_lvalues(sym, parent) {
                scan_rhs = false;
            }
        }
        function eliminate_spurious_blocks(statements) {
            for (var i = 0; i < statements.length;) {
                if (stat instanceof AST_BlockStatement) {
                    CHANGED = true;
                } else if (stat instanceof AST_EmptyStatement) {
                    CHANGED = true;
                } else if (stat instanceof AST_Directive) {
                    } else {
                        CHANGED = true;
                    }
                } else i++;
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
                    if ((in_bool || value) && !stat.alternative && next instanceof AST_Return) {
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
                    || stat instanceof AST_Defun) {
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
                CHANGED = true;
            }
            for (var i = 0; i < statements.length; i++) {
                if (prev) {
                    } else if (stat instanceof AST_For) {
                        if (!(stat.init instanceof AST_Definitions)) {
                            if (!abort) {
                                else {
                                    CHANGED = true;
                                }
                            }
                        }
                    } else if (stat instanceof AST_ForIn) {
                }
                if (compressor.option("conditionals") && stat instanceof AST_If) {
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
                    } else if (stat.init instanceof AST_Definitions) {
                } else if (stat instanceof AST_ForIn) {
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
    function is_lhs(node, parent) {
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    (function(def) {
        var static_values = convert_to_predicate({
            Math: [
                "SQRT2",
            ],
        });
        def(AST_PropAccess, function(compressor, ignore_side_effects, cached, depth) {
        });
    })(function(node, func) {
    AST_Scope.DEFMETHOD("hoist_properties", function(compressor) {
        function can_hoist(sym, right, count) {
            var def = sym.definition();
            if (sym.fixed_value() !== right) return;
            return right instanceof AST_Object && right.properties.length > 0;
        }
    });
})(function(node, optimizer) {
