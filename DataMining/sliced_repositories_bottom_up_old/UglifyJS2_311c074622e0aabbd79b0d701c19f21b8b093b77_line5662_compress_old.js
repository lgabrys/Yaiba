function Compressor(options, false_by_default) {
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
    }
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
        return !all(def.orig, function(sym) {
        });
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        var passes = +this.options.passes || 1;
        var mangle = { ie8: this.option("ie8") };
        for (var pass = 0; pass < passes; pass++) {
            node = node.transform(this);
        }
        return node;
    },
    before: function(node, descend, in_list) {
        // Before https://github.com/mishoo/UglifyJS/pull/1602 AST_Node.optimize()
        // This corrupts TreeWalker.stack, which cause AST look-ups to malfunction.
        // Existing code relies on how AST_Node.optimize() worked, and omitting the
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
    });
    AST_Node.DEFMETHOD("equivalent_to", function(node) {
        return this.TYPE == node.TYPE && this.print_to_string() == node.print_to_string();
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
            if (!insert && node instanceof AST_Return) {
                return transform ? transform(node) : make_node(AST_SimpleStatement, node, {
                    body: node.value || make_node(AST_UnaryPrefix, node, {
                        expression: make_node(AST_Number, node, {
                        })
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
        if (obj instanceof AST_Array) {
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
            key = "" + key;
            var props = obj.properties;
            for (var i = props.length; --i >= 0;) {
            }
        }
    }
    function is_read_only_fn(value, name) {
        if (value instanceof AST_Lambda) return native_fns.Function[name];
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
        }
        if (parent instanceof AST_Call) {
        }
        if (parent instanceof AST_PropAccess) {
            var prop = read_property(value, parent);
            return (!immutable || recursive) && is_modified(compressor, tw, parent, prop, level + 1);
        }
    }
    function is_funarg(def) {
    }
    function can_drop_symbol(ref, keep_lambda) {
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
            if (is_defun(def.fixed) && !all(def.references, function(ref) {
                var scope = ref.scope.resolve();
                do {
                } while (is_function(scope) && (scope = scope.parent_scope.resolve()));
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
            if (scope.uses_arguments) scope.each_argname(function(node) {
                node.definition().last_ref = false;
            });
        }
        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
                var marker = tw.defun_ids[def.id];
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
        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }
        function safe_to_read(tw, def) {
            var safe = tw.safe_ids[def.id];
            if (safe) {
                if (!HOP(tw.safe_ids, def.id)) safe.read = safe.read && safe.read !== tw.safe_ids ? true : tw.safe_ids;
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                }
            }
        }
        function safe_to_assign(tw, def, declare) {
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
            }
        }
        function value_in_use(node, parent) {
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
        }
        function scan_declaration(tw, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DestructuredObject) {
                }
                visit(node, fixed, function() {
                    var save_len = tw.stack.length;
                    tw.stack.length = save_len;
                });
            });
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
            fn.argnames.forEach(function(arg, i) {
                scan_declaration(tw, arg, function() {
                }, function(node, fixed) {
                    var d = node.definition();
                    if (safe && d.fixed === undefined) {
                        tw.loop_ids[d.id] = tw.in_loop;
                        d.fixed = fixed;
                        d.fixed.assigns = [ arg ];
                    } else {
                        d.fixed = false;
                    }
                });
            });
            var safe_ids = tw.safe_ids;
            if (!aborts) tw.safe_ids = safe_ids;
        }
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var left = node.left;
            if (node.operator == "=" && left.equivalent_to(node.right) && !left.has_side_effects(compressor)) {
                node.__drop = true;
            } else if (!(left instanceof AST_Destructured || left instanceof AST_SymbolRef)) {
            } else if (node.operator == "=") {
                scan_declaration(tw, left, function() {
                }, function(sym, fixed, walk) {
                    var d = sym.definition();
                    d.assignments++;
                    if (!is_modified(compressor, tw, node, node.right, 0) && safe_to_assign(tw, d)) {
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
                if (safe && safe_to_assign(tw, d)) {
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
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            this.body.walk(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_ForIn, function(tw, descend, compressor) {
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
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            var d = exp.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (safe_to_read(tw, d) && safe_to_assign(tw, d)) {
                if (d.single_use) d.single_use = false;
                d.fixed = function() {
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
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    function make_sequence(orig, expressions) {
    }
    function is_declaration(stat) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function is_last_node(node, parent) {
                var sym = is_lhs(node.left, node);
                return sym.match_symbol(function(node) {
                    return node instanceof AST_SymbolRef
                }, true);
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
                    if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
                        statements[i] = make_node(AST_SimpleStatement, stat, {
                        });
                    }
                }
                if (stat instanceof AST_If) {
                    var ab = aborts(stat.body);
                    if (can_merge_flow(ab)) {
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
                        statements[i] = make_node(AST_SimpleStatement, stat.condition, {
                        });
                    }
                    if (!stat.alternative && next instanceof AST_Return) {
                        stat = stat.clone();
                        stat.alternative = next;
                    }
                    if (!stat.alternative && !next && in_lambda && (in_bool || value && multiple_if_returns)) {
                        stat = stat.clone();
                        stat.alternative = make_node(AST_Return, stat, {
                        });
                    }
                        && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
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
                for (var j = i + 1; j < statements.length; j++) {
                    if (!is_declaration(statements[j])) break;
                }
            }
            function prev_index(i) {
            }
        }
    }
    (function(def) {
    })(function(node, func) {
    });
    (function(def) {
        def(AST_Assign, function(compressor) {
            switch (this.operator) {
              case "=":
            }
        });
    })(function(node, func) {
    function is_lhs(node, parent) {
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    function aborts(thing) {
    }
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var drop_funcs = !(self instanceof AST_Toplevel) || compressor.toplevel.funcs;
        var drop_vars = !(self instanceof AST_Toplevel) || compressor.toplevel.vars;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
        };
        var in_use_ids = Object.create(null); // avoid expensive linear scans of in_use
        if (self instanceof AST_Toplevel && compressor.top_retain) {
            self.variables.each(function(def) {
                if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                    in_use_ids[def.id] = true;
                }
            });
        }
        var var_defs_by_id = new Dictionary();
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Lambda && node.uses_arguments && !tw.has_directive("use strict")) {
                node.each_argname(function(argname) {
                    var def = argname.definition();
                    if (!(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                });
            }
            if (scope === self) {
                if (is_defun(node)) {
                    var def = node.name.definition();
                    if (!drop_funcs && !(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                }
                if (node instanceof AST_Definitions) {
                    node.definitions.forEach(function(defn) {
                        defn.name.mark_symbol(function(name) {
                            var def = name.definition();
                                || !(node instanceof AST_Var || is_safe_lexical(def)))) {
                                in_use_ids[def.id] = true;
                            }
                        }, tw);
                    });
                }
                if (node instanceof AST_SymbolFunarg) {
                    var def = node.definition();
                }
            }
        });
        tw.directives = Object.create(compressor.directives);
        tw = new TreeWalker(scan_ref_scoped);
        var tt = new TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
                if (sym) {
                    var def = sym.definition();
                } else if (node instanceof AST_UnaryPostfix
            }
            if (node instanceof AST_Lambda) {
                if (drop_funcs && node !== self && is_defun(node)) {
                    var def = node.name.definition();
                    if (!(def.id in in_use_ids)) {
                        def.eliminated++;
                    }
                }
                if (!(node instanceof AST_Accessor)) {
                    var trim = compressor.drop_fargs(node, parent);
                    for (var a = node.argnames, i = a.length; --i >= 0;) {
                        var sym = a[i];
                        if (!(sym instanceof AST_SymbolFunarg)) {
                            if (arg) {
                                trim = false;
                            } else if (trim) {
                            } else {
                                sym.name.__unused = true;
                                a[i] = sym.name;
                            }
                        }
                        var def = sym.definition();
                        if (def.id in in_use_ids) {
                            trim = false;
                            if (indexOf_assign(def, sym) < 0) sym.__unused = null;
                        } else if (trim) {
                        } else {
                            sym.__unused = true;
                        }
                    }
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                var is_var = node instanceof AST_Var;
                node.definitions.forEach(function(def) {
                    if (def.value) def.value = def.value.transform(tt);
                    if (def.name instanceof AST_Destructured) {
                        } else {
                            var value = def.value.drop_side_effect_free(compressor);
                        }
                    }
                    var sym = def.name.definition();
                    var drop_sym = is_var ? can_drop_symbol(def.name) : is_safe_lexical(sym);
                    if (!drop_sym || !drop_vars || sym.id in in_use_ids) {
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
                        if (!def.value && !(node instanceof AST_Let)) {
                            if (drop_sym && var_defs.length > 1) {
                                sym.eliminated++;
                            } else {
                        } else if (compressor.option("functions")
                            && (!def.value.name || (old_def = def.value.name.definition()).assignments == 0
                                })))
                            && can_rename(def.value, def.name.name)) {
                            if (old_def) old_def.references.forEach(function(node) {
                            });
                        } else {
                    } else if (is_catch(def.name)) {
                });
            }
        });
    });
})(function(node, optimizer) {
