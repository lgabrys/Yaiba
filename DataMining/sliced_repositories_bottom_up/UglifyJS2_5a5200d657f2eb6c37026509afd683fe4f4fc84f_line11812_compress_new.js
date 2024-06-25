function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            if (node instanceof AST_Call) {
            } else if (node instanceof AST_Template) {
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
    }
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
    } else if (typeof top_retain == "function") {
        this.top_retain = top_retain;
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
}
Compressor.prototype = new TreeTransformer(function(node, descend, in_list) {
    var is_scope = node instanceof AST_Scope;
    if (is_scope) {
        if (this.option("arrows") && is_arrow(node) && node.value) {
            node.body = [ node.first_statement() ];
            node.value = null;
        }
    }
    // will now happen after this parent AST_Node has been properly substituted
});
Compressor.prototype.option = function(key) {
};
Compressor.prototype.exposed = function(def) {
    var toplevel = this.toplevel;
    return !all(def.orig, function(sym) {
    });
};
Compressor.prototype.compress = function(node) {
    node = node.resolve_defines(this);
    var merge_vars = this.options.merge_vars;
    var passes = +this.options.passes || 1;
    var min_count = 1 / 0;
    var stopping = false;
    var mangle = { ie: this.option("ie") };
    for (var pass = 0; pass < passes; pass++) {
            node.reset_opt_flags(this);
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
    return node;
};
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
    });
    AST_Toplevel.DEFMETHOD("hoist_exports", function(compressor) {
        if (!compressor.option("hoist_exports")) return;
        var body = this.body, props = [];
        for (var i = 0; i < body.length; i++) {
            var stat = body[i];
            if (stat instanceof AST_ExportDeclaration) {
                body[i] = stat = stat.body;
                } else {
                    export_symbol(stat.name);
                }
            } else if (stat instanceof AST_ExportReferences) {
                body.splice(i--, 1);
            }
        }
        function export_symbol(sym) {
        }
    });

    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
            if (insert) {
                if (node instanceof AST_Directive) node = make_node(AST_SimpleStatement, node, {
                });
            } else if (node instanceof AST_Return) {
            }
            if (node instanceof AST_Block) {
                for (var index = node.body.length; --index >= 0;) {
                    var stat = node.body[index];
                    if (!is_declaration(stat, true)) {
                        node.body[index] = stat.transform(tt);
                    }
                }
            } else if (node instanceof AST_If) {
                node.body = node.body.transform(tt);
                if (node.alternative) node.alternative = node.alternative.transform(tt);
            } else if (node instanceof AST_With) {
                node.body = node.body.transform(tt);
            }
        });
    });
    AST_Toplevel.DEFMETHOD("unwrap_expression", function() {
        var self = this;
        switch (self.body.length) {
          default:
        }
    });
    function read_property(obj, node) {
        var key = node.get_property();
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
        if (level == 0 && value && value.is_constant()) return;
        if (parent instanceof AST_Call) {
        }
        if (parent instanceof AST_PropAccess) {
            var prop = read_property(value, parent);
        }
    }
    function safe_for_extends(node) {
        return node instanceof AST_Class || node instanceof AST_Defun || node instanceof AST_Function;
    }

    function cross_scope(def, sym) {
        do {
        } while (sym = sym.parent_scope);
    }
    function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.redef || ref.definition();
        return all(def.orig, function(sym) {
            if (sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet) {
                if (sym instanceof AST_SymbolImport) return true;
            }
        });
    }
    function has_escaped(d, scope, node, parent) {
        if (parent instanceof AST_VarDef) return parent.value === node;
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_return = 0;
            def.drop_return = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
            def.reassigned = 0;
            def.recursive_refs = 0;
            def.references = [];
            def.single_use = undefined;
        }
        function safe_to_visit(tw, fn) {
            var marker = fn.safe_ids;
        }
        function revisit_fn_def(tw, fn) {
            fn.enclosed.forEach(function(d) {
                d.single_use = false;
                var fixed = d.fixed;
                if (typeof fixed == "function") fixed = fixed();
                d.fixed = false;
            });
        }
        function mark_fn_def(tw, def, fn) {
            var marker = fn.safe_ids;
            if (fn.parent_scope.resolve().may_call_this === return_true) {
                if (member(fn, tw.fn_visited)) revisit_fn_def(tw, fn);
            } else if (marker) {
                } else {
                    fn.safe_ids = false;
                }
            } else if (tw.fn_scanning && tw.fn_scanning !== def.scope.resolve()) {
                fn.safe_ids = false;
            } else {
                fn.safe_ids = tw.safe_ids;
            }
        }
        function push(tw, sequential) {
            var safe_ids = Object.create(tw.safe_ids);
            if (!sequential) safe_ids.seq = {};
            tw.safe_ids = safe_ids;
        }
        function safe_to_read(tw, def) {
            if (safe) {
                var in_order = HOP(tw.safe_ids, def.id);
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                    if (in_order) def.safe_ids = undefined;
                }
            }
        }
        function safe_to_assign(tw, def, declare) {
            if (def.safe_ids) {
                def.safe_ids[def.id] = false;
                def.safe_ids = undefined;
            }
        }
        function replace_ref(ref, fixed) {
            return function() {
                var def = ref.definition();
                def.replaced++;
            };
        }
        function ref_once(compressor, def) {
            return compressor.option("unused")
        }
        function is_immutable(value) {
        }
        function make_fixed(save, fn) {
            return function() {
            };
        }
        function make_fixed_default(compressor, node, save) {
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    var save = fixed;
                    if (save) fixed = make_fixed_default(compressor, node, save);
                    fixed = save;
                }
                if (node instanceof AST_DestructuredArray) {
                    var save = fixed;
                    node.elements.forEach(function(node, index) {
                        if (save) fixed = make_fixed(save, function(value) {
                            return make_node(AST_Sub, node, {
                            });
                        });
                    });
                    if (node.rest) {
                        if (save) fixed = compressor.option("rests") && make_fixed(save, function(value) {
                        });
                    }
                    fixed = save;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save = fixed;
                    node.properties.forEach(function(node) {
                        if (save) fixed = make_fixed(save, function(value) {
                        });
                    });
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
        }
        function reduce_iife(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            var sequential = !is_async(fn) && !is_generator(fn);
            var hit = !sequential;
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
            var right = node.right;
            var ld = left instanceof AST_SymbolRef && left.definition();
            switch (node.operator) {
                if (left.equals(right) && !left.has_side_effects(compressor)) {
                    node.redundant = true;
                }
                if (ld && right instanceof AST_LambdaExpression) {
                    right.safe_ids = null;
                }
                ld.assignments++;
                var fixed = ld.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    ld.fixed = false;
                }
                var safe = safe_to_read(tw, ld);
                if (safe && !left.in_arg && safe_to_assign(tw, ld)) {
                    if (ld.single_use) ld.single_use = false;
                    left.fixed = ld.fixed = function() {
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [ ld.orig[0] ] : fixed.assigns.slice();
                    left.fixed.to_binary = replace_ref(left, fixed);
                } else {
                    ld.fixed = false;
                }
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
                    } else {
                            || d.orig.length == 1 && d.orig[0] instanceof AST_SymbolDefun) {
                            d.single_use = false;
                        }
                        tw.loop_ids[d.id] = tw.in_loop;
                        d.fixed = modified ? 0 : fixed;
                        sym.fixed = fixed;
                        sym.fixed.assigns = [ node ];
                    }
                });
            }
        });
        def(AST_Class, function(tw, descend, compressor) {
            var node = this;
            var props = node.properties.filter(function(prop) {
                if (prop.key instanceof AST_Node) {
                }
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
                tw.push(prop);
            });
        });
        def(AST_Do, function(tw) {
            var save_loop = tw.in_loop;
            tw.in_loop = this;
            if (has_loop_control(this, tw.parent())) {
                push(tw);
            }
            tw.in_loop = save_loop;
        });
        def(AST_ForEnumeration, function(tw, descend, compressor) {
            var node = this;
            var save_loop = tw.in_loop;
            tw.in_loop = node;
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
            tw.in_loop = save_loop;
        });
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            var fn = this;
            var def = fn.name.definition();
            var parent = tw.parent();
            if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) def.single_use = false;
            fn.inlined = false;
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
                };
                d.fixed.assigns = fixed && fixed.assigns ? fixed.assigns.slice() : [];
                if (node instanceof AST_UnaryPrefix) {
                    exp.fixed = d.fixed;
                } else {
                    exp.fixed = function() {
                    };
                    exp.fixed.assigns = fixed && fixed.assigns;
                    exp.fixed.to_prefix = replace_ref(exp, d.fixed);
                }
            } else {
                d.fixed = false;
            }
        });
    })(function(node, func) {
    function process_to_assign(ref) {
        var def = ref.definition();
        def.assignments++;
    }
    function make_node(ctor, orig, props) {
        if (props) {
            props.start = orig.start;
            props.end = orig.end;
        } else {
            props = orig;
        }
    }
    function make_sequence(orig, expressions) {
    }
    function make_node_from_constant(val, orig) {
    }
    function maintain_this_binding(parent, orig, val) {
    }
    function declarations_only(node) {
    }
    function is_declaration(stat, lexical) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            var candidates = [];
            var stat_index = statements.length;
            var scanner = new TreeTransformer(function(node, descend) {
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (candidate instanceof AST_VarDef) {
                        var def = candidate.name.definition();
                        if (def.references.length - def.replaced == 1 && !compressor.exposed(def)) {
                            def.replaced++;
                        }
                    }
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
                            if (rvalue === rhs_value) return List.skip;
                            return make_sequence(rhs_value, rhs_value.expressions.slice(0, -1));
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
                    def.replaced++;
                }
            });
            while (--stat_index >= 0) {
                var hit_stack = [];
                while (candidates.length > 0) {
                    hit_stack = candidates.pop();
                    var hit_index = 0;
                    var candidate = hit_stack[hit_stack.length - 1];
                    var assign_pos = -1;
                    var assign_used = false;
                    var verify_ref = false;
                    var remaining;
                    var value_def = null;
                    var stop_after = null;
                    var stop_if_hit = null;
                    var lhs = get_lhs(candidate);
                    var side_effects = lhs && lhs.has_side_effects(compressor);
                    var scan_lhs = lhs && (!side_effects || lhs instanceof AST_SymbolRef)
                            && !is_lhs_read_only(lhs, compressor);
                    var scan_rhs = foldable(candidate);
                    if (!scan_lhs && !scan_rhs) continue;
                    var compound = candidate instanceof AST_Assign && candidate.operator.slice(0, -1);
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
                    var enclosed = new Dictionary();
                    var well_defined = true;
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    var rhs_value = get_rvalue(candidate);
                    var rvalue = rhs_value;
                    if (!side_effects) {
                        if (!compound && rvalue instanceof AST_Sequence) rvalue = rvalue.tail_node();
                        side_effects = value_has_side_effects();
                    }
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
                        changed = true;
                    }
                    if (replaced) remove_candidate(candidate);
                }
            }

            function in_conditional(node, parent) {
                if (parent instanceof AST_Assign) return parent.left !== node && lazy_op[parent.operator.slice(0, -1)];
            }
            function extract_args() {
                for (var i = fn.argnames.length; --i >= 0;) {
                    if (sym instanceof AST_Destructured) {
                        }, sym, arg)) {
                            candidates.length = 0;
                        }
                    }
                }
            }
            function extract_candidates(expr, unused) {
                } else if (expr instanceof AST_DWLoop) {
                    if (!(expr.body instanceof AST_Block)) {
                        extract_candidates(expr.body);
                    }
                } else if (expr instanceof AST_Exit) {
                } else if (expr instanceof AST_For) {
                    if (!(expr.body instanceof AST_Block)) {
                    }
                } else if (expr instanceof AST_ForEnumeration) {
            }
            function mangleable_var(rhs) {
                rhs = rhs.tail_node();
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
            function remove_candidate(expr) {
                var end = hit_stack.length - 1;
                var last = hit_stack[end];
                if (last instanceof AST_VarDef || hit_stack[end - 1].body === last) end--;
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_Definitions) {
                        if (value_def) value_def.replaced++;
                        var defns = node.definitions;
                        var index = defns.indexOf(last);
                        var defn = last.clone();
                        defn.value = null;
                        if (!value) {
                            node.definitions[index] = defn;
                        }
                        if (index > 0) {
                            node = node.clone();
                            node.definitions = defns.slice(index);
                        }
                        node.definitions[0] = defn;
                    }
                });
                if (!(statements[stat_index] = statements[stat_index].transform(tt))) statements.splice(stat_index, 1);
            }
            function may_modify(sym) {
                var def = sym.definition();
                return !all(def.references, function(ref) {
                });
            }
            function side_effects_external(node, lhs) {
                if (lhs) {
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
    }
    function is_undefined(node, compressor) {
    }
    var lazy_op = makePredicate("&& || ??");
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    function to_class_expr(defcl, drop_name) {
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
        var var_defs = Object.create(null);
        if (self instanceof AST_Toplevel && compressor.top_retain) {
            self.variables.each(function(def) {
                if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                    in_use_ids[def.id] = true;
                }
            });
        }
        var assignments = new Dictionary();
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
                if (node instanceof AST_DefClass) {
                    var def = node.name.definition();
                    if (!drop && !(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                }
                if (node instanceof AST_LambdaDefinition) {
                    var def = node.name.definition();
                    if (!drop && !(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                }
                if (node instanceof AST_Definitions) {
                    node.definitions.forEach(function(defn) {
                        defn.name.mark_symbol(function(name) {
                            var def = name.definition();
                            var_defs[def.id] = (var_defs[def.id] || 0) + 1;
                            if (node instanceof AST_Var && def.orig[0] instanceof AST_SymbolCatch) {
                                var redef = def.redefined();
                                if (redef) var_defs[redef.id] = (var_defs[redef.id] || 0) + 1;
                            }
                                || !(node instanceof AST_Var || is_safe_lexical(def)))) {
                                in_use_ids[def.id] = true;
                            }
                        }, tw);
                    });
                }
                if (node instanceof AST_SymbolFunarg) {
                    var def = node.definition();
                    var_defs[def.id] = (var_defs[def.id] || 0) + 1;
                }
                if (node instanceof AST_SymbolImport) {
                    var def = node.definition();
                    if (!(def.id in in_use_ids) && (!drop_vars || !is_safe_lexical(def))) {
                        in_use_ids[def.id] = true;
                    }
                }
            }
        });
        tw.directives = Object.create(compressor.directives);
        var drop_fn_name = compressor.option("keep_fnames") ? return_false : compressor.option("ie") ? function(def) {
        } : function(def) {
        tw = new TreeWalker(scan_ref_scoped);
        Object.keys(assign_in_use).forEach(function(id) {
            var in_use = (assignments.get(id) || []).filter(function(node) {
            });
            if (assigns.length == in_use.length) {
                assign_in_use[id] = in_use;
            } else {
        });
        var trimmer = new TreeTransformer(function(node) {
            if (node instanceof AST_Destructured && node.rest) node.rest = node.rest.transform(trimmer);
            if (node instanceof AST_DestructuredArray) {
                var trim = !node.rest;
                for (var i = node.elements.length; --i >= 0;) {
                    var element = node.elements[i].transform(trimmer);
                    if (element) {
                        node.elements[i] = element;
                        trim = false;
                    } else if (trim) {
                    } else {
                        node.elements[i] = make_node(AST_Hole, node.elements[i]);
                    }
                }
            }
            if (node instanceof AST_DestructuredObject) {
                var properties = [];
                node.properties = properties;
            }
        });
        var tt = new TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
            }
            if (node instanceof AST_Binary && node.operator == "instanceof") {
                var sym = node.right;
            }
            if (node instanceof AST_Call) {
                node.args = node.args.map(function(arg) {
                });
                node.expression = node.expression.transform(tt);
            }
            if (drop_funcs && node !== self && node instanceof AST_DefClass) {
                var def = node.name.definition();
                if (!(def.id in in_use_ids)) {
                    def.eliminated++;
                    var trimmed = to_class_expr(node, true);
                    trimmed = trimmed.drop_side_effect_free(compressor, true);
                }
            }
            if (node instanceof AST_ClassExpression && node.name && drop_fn_name(node.name.definition())) {
                node.name = null;
            }
            if (node instanceof AST_Lambda) {
                if (drop_funcs && node !== self && node instanceof AST_LambdaDefinition) {
                    var def = node.name.definition();
                    if (!(def.id in in_use_ids)) {
                        def.eliminated++;
                    }
                }
                if (node instanceof AST_LambdaExpression && node.name && drop_fn_name(node.name.definition())) {
                    node.name = null;
                }
                if (!(node instanceof AST_Accessor)) {
                    var args, spread, trim = compressor.drop_fargs(node, parent);
                    if (trim && parent instanceof AST_Call && parent.expression === node) {
                        args = parent.args;
                        for (spread = 0; spread < args.length; spread++) {
                        }
                    }
                    var argnames = node.argnames;
                    var rest = node.rest;
                    var after = false, before = false;
                    if (rest) {
                        before = true;
                        if (!args || spread < argnames.length || rest instanceof AST_SymbolFunarg) {
                            rest = rest.transform(trimmer);
                        } else {
                            var trimmed = trim_destructured(rest, make_node(AST_Array, parent, {
                            }), trim_decl, !node.uses_arguments, rest);
                            rest = trimmed.name;
                            args.length = argnames.length;
                        }
                        if (rest instanceof AST_Destructured && !rest.rest) {
                            if (rest instanceof AST_DestructuredArray) {
                                if (rest.elements.length == 0) rest = null;
                            } else if (rest.properties.length == 0) {
                                rest = null;
                            }
                        }
                        node.rest = rest;
                        if (rest) {
                            trim = false;
                            after = true;
                        }
                    }
                    var default_length = trim ? -1 : node.length();
                    var trim_value = args && !node.uses_arguments && parent !== compressor.parent();
                    for (var i = argnames.length; --i >= 0;) {
                        var sym = argnames[i];
                        if (sym instanceof AST_SymbolFunarg) {
                            var def = sym.definition();
                            if (def.id in in_use_ids) {
                                trim = false;
                                if (indexOf_assign(def, sym) < 0) sym.unused = null;
                            } else if (trim) {
                                def.eliminated++;
                                sym.unused = true;
                            } else {
                                sym.unused = true;
                            }
                        } else {
                            before = true;
                            var funarg;
                            if (!args || spread < i) {
                                funarg = sym.transform(trimmer);
                            } else {
                                var trimmed = trim_destructured(sym, args[i], trim_decl, trim_value, sym);
                                funarg = trimmed.name;
                                if (trimmed.value) args[i] = trimmed.value;
                            }
                            if (funarg) {
                                trim = false;
                                argnames[i] = funarg;
                                if (!after) after = !(funarg instanceof AST_SymbolFunarg);
                            } else if (trim) {
                            } else if (i > default_length) {
                                if (sym.name instanceof AST_SymbolFunarg) {
                                    sym.name.unused = true;
                                } else {
                                    after = true;
                                }
                                argnames[i] = sym.name;
                            } else {
                                argnames[i] = sym = sym.clone();
                                sym.value = make_node(AST_Number, sym, { value: 0 });
                                after = true;
                            }
                        }
                    }
                    if (before && !after && node.uses_arguments && !tt.has_directive("use strict")) {
                        node.rest = make_node(AST_DestructuredArray, node, { elements: [] });
                    }
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForEnumeration && parent.init === node)) {
                var body = [], head = [], tail = [];
                var side_effects = [];
                var duplicated = 0;
                var is_var = node instanceof AST_Var;
                node.definitions.forEach(function(def) {
                    if (def.value) def.value = def.value.transform(tt);
                    var value = def.value;
                    if (def.name instanceof AST_Destructured) {
                        var trimmed = trim_destructured(def.name, value, function(node) {
                        }, true);
                        if (trimmed.name) {
                            def = make_node(AST_VarDef, def, {
                                value: value = trimmed.value,
                            });
                        } else if (trimmed.value) {
                    }
                    var sym = def.name.definition();
                    var drop_sym = is_var ? can_drop_symbol(def.name) : is_safe_lexical(sym);
                    if (!drop_sym || !drop_vars || sym.id in in_use_ids) {
                        var index;
                        if (value && ((index = indexOf_assign(sym, def)) < 0 || self_assign(value.tail_node()))) {
                            def = def.clone();
                            value = value.drop_side_effect_free(compressor);
                            if (node instanceof AST_Const) {
                                def.value = value || make_node(AST_Number, def, { value: 0 });
                            } else {
                                def.value = null;
                            }
                            value = null;
                            if (index >= 0) assign_in_use[sym.id][index] = def;
                        }
                        if (!value && !(node instanceof AST_Let)) {
                            } else if (drop_sym && var_defs[sym.id] > 1) {
                                var_defs[sym.id]--;
                                sym.eliminated++;
                            } else {
                        } else if (compressor.option("functions")
                        } else {
                                && sym.orig.indexOf(def.name) > sym.eliminated) {
                                var_defs[sym.id]--;
                                duplicated++;
                            }
                        }
                    } else if (is_catch(def.name)) {
                        value = value && value.drop_side_effect_free(compressor);
                        if (var_defs[sym.id] > 1) {
                            var_defs[sym.id]--;
                            sym.eliminated++;
                        } else {
                            def.value = null;
                        }
                    } else {
                        value = value && value.drop_side_effect_free(compressor);
                        sym.eliminated++;
                    }
                    function self_assign(ref) {
                    }
                    function is_catch(node) {
                    }
                    function flush() {
                        if (side_effects.length > 0) {
                            if (tail.length == 0) {
                                body.push(make_node(AST_SimpleStatement, node, {
                                    body: make_sequence(node, side_effects),
                                }));
                            } else if (value) {
                                side_effects.push(value);
                                def.value = make_sequence(value, side_effects);
                            } else {
                                def.value = make_node(AST_UnaryPrefix, def, {
                                    operator: "void",
                                    expression: make_sequence(def, side_effects),
                                });
                            }
                            side_effects = [];
                        }
                    }
                });
                switch (head.length) {
                  case 0:
                    if (tail.length == 0) break;
                    if (tail.length == duplicated) {
                        [].unshift.apply(side_effects, tail.map(function(def) {
                            AST_Node.info("Dropping duplicated definition of variable {name} [{start}]", def.name);
                            var sym = def.name.definition();
                            var ref = make_node(AST_SymbolRef, def.name);
                            sym.references.push(ref);
                            var assign = make_node(AST_Assign, def, {
                                operator: "=",
                                left: ref,
                                right: def.value,
                            });
                            var index = indexOf_assign(sym, def);
                            if (index >= 0) assign_in_use[sym.id][index] = assign;
                            sym.assignments++;
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
                    var seq;
                    if (tail.length > 0 && (seq = tail[0].value) instanceof AST_Sequence) {
                        tail[0].value = seq.tail_node();
                        body.push(make_node(AST_SimpleStatement, node, {
                            body: make_sequence(seq, seq.expressions.slice(0, -1)),
                        }));
                    }
                    node.definitions = head.concat(tail);
                    body.push(node);
                }
            }
            if (node instanceof AST_Assign) {
                var trimmed = trim_destructured(node.left, node.right, function(node) {
                }, node.write_only === true);
            }
            if (node instanceof AST_LabeledStatement && node.body instanceof AST_For) {
                if (node.body instanceof AST_BlockStatement) {
                    var block = node.body;
                    node.body = block.body.pop();
                }
            }
        });
        tt.directives = Object.create(compressor.directives);
            && self.body[0].value == "use strict") {
            self.body.length = 0;
        }
        function track_assigns(def, node) {
            if (!def.fixed || !node.fixed) assign_in_use[def.id] = false;
        }
        function add_assigns(def, node) {
            if (!assign_in_use[def.id]) assign_in_use[def.id] = [];
        }
        function indexOf_assign(def, node) {
        }
        function unmark_lambda(def) {
            if (lambda_ids[def.id] > 1 && !(def.id in in_use_ids)) {
                in_use_ids[def.id] = true;
            }
        }
        function verify_safe_usage(def, read, modified) {
            if (read && modified) {
                in_use_ids[def.id] = read;
            } else {
        }
        function get_init_symbol(for_in) {
        }
        function scan_ref_scoped(node, descend, init) {
            if (node instanceof AST_SymbolRef && node.in_arg) var_defs[node.definition().id] = 0;
            var props = [], sym = assign_as_unused(node, props);
            if (sym) {
                var node_def = sym.definition();
            }
            if (node instanceof AST_Binary) {
                var sym = node.right;
                var id = sym.definition().id;
            }
            if (node instanceof AST_ForIn) {
                if (node.init instanceof AST_SymbolRef && scope === self) {
                    var id = node.init.definition().id;
                    if (!(id in for_ins)) for_ins[id] = node;
                }
                var sym = get_init_symbol(node);
            }
            if (node instanceof AST_SymbolRef) {
                var node_def = node.definition();
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
        function trim_decl(node) {
            if (node instanceof AST_SymbolFunarg) node.unused = true;
        }
        function trim_default(trimmer, node) {
            node.value = node.value.transform(tt);
            var name = node.name.transform(trimmer);
            if (!name) {
                var value = node.value.drop_side_effect_free(compressor);
                node = node.clone();
                node.name.unused = null;
                node.value = value;
            }
        }
        function trim_destructured(node, value, process, drop, root) {
            var trimmer = new TreeTransformer(function(node) {
                if (node instanceof AST_DefaultValue) {
                    if (!(compressor.option("default_values") && value && value.is_defined(compressor))) {
                        var save_drop = drop;
                        drop = false;
                        var trimmed = trim_default(trimmer, node);
                        drop = save_drop;
                        if (!trimmed && drop && value) value = value.drop_side_effect_free(compressor);
                    } else if (node === root) {
                        root = node = node.name;
                    } else {
                        node = node.name;
                    }
                }
                if (node instanceof AST_DestructuredArray) {
                    var save_drop = drop;
                    var save_value = value;
                    if (value instanceof AST_SymbolRef) {
                        drop = false;
                        value = value.fixed_value();
                    }
                    var native, values;
                    if (value instanceof AST_Array) {
                        values = value.elements;
                    } else {
                        values = false;
                    }
                    var elements = [], newValues = drop && [], pos = 0;
                    node.elements.forEach(function(element, index) {
                        value = values && values[index];
                        if (value instanceof AST_Hole) {
                            value = null;
                        } else if (value instanceof AST_Spread) {
                            if (drop) {
                                newValues.length = pos;
                                save_value.elements = newValues;
                            }
                            value = values = false;
                        }
                        element = element.transform(trimmer);
                        if (element) elements[pos] = element;
                        if (drop && value) newValues[pos] = value;
                        if (element || value || !drop || !values) pos++;
                    });
                    value = values && make_node(AST_Array, save_value, {
                    });
                    if (node.rest) {
                        var was_drop = drop;
                        drop = false;
                        node.rest = node.rest.transform(compressor.option("rests") ? trimmer : tt);
                        drop = was_drop;
                        if (node.rest) elements.length = pos;
                    }
                    if (drop) {
                        if (value && !node.rest) value = value.drop_side_effect_free(compressor);
                        if (value instanceof AST_Array) {
                            value = value.elements;
                        } else if (value instanceof AST_Sequence) {
                            value = value.expressions;
                        } else if (value) {
                            value = [ value ];
                        }
                        if (value && value.length) {
                            newValues.length = pos;
                        }
                    }
                    value = save_value;
                    drop = save_drop;
                    if (values && newValues) {
                        value = value.clone();
                        value.elements = newValues;
                    }
                    if (!native) {
                        elements.length = node.elements.length;
                    } else if (!node.rest) switch (elements.length) {
                      case 0:
                        if (node === root) break;
                        if (drop) value = value.drop_side_effect_free(compressor);
                        return null;
                      case 1:
                        if (!drop) break;
                        if (node === root) break;
                        var sym = elements[0];
                        if (sym.has_side_effects(compressor)) break;
                        if (value.has_side_effects(compressor) && sym.match_symbol(function(node) {
                            return node instanceof AST_PropAccess;
                        })) break;
                        value = make_node(AST_Sub, node, {
                            expression: value,
                            property: make_node(AST_Number, node, { value: 0 }),
                        });
                        return sym;
                    }
                    node.elements = elements;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save_drop = drop;
                    var save_value = value;
                    if (value instanceof AST_SymbolRef) {
                        drop = false;
                        value = value.fixed_value();
                    }
                    var prop_keys, prop_map, values;
                    if (value instanceof AST_Object) {
                        prop_keys = [];
                        prop_map = new Dictionary();
                        values = value.properties.map(function(prop, index) {
                            prop = prop.clone();
                            if (prop instanceof AST_Spread) {
                                prop_map = false;
                            } else {
                                var key = prop.key;
                                if (key instanceof AST_Node) key = key.evaluate(compressor, true);
                                if (key instanceof AST_Node) {
                                    prop_map = false;
                                } else if (prop_map && !(prop instanceof AST_ObjectSetter)) {
                                prop_keys[index] = key;
                            }
                        });
                    }
                    if (node.rest) {
                        value = false;
                        node.rest = node.rest.transform(compressor.option("rests") ? trimmer : tt);
                    }
                    var can_drop = new Dictionary();
                    var drop_keys = drop && new Dictionary();
                    var properties = [];
                    node.properties.map(function(prop) {
                        var key = prop.key;
                        if (key instanceof AST_Node) {
                            prop.key = key = key.transform(tt);
                            key = key.evaluate(compressor, true);
                        }
                        if (key instanceof AST_Node) {
                            drop_keys = false;
                        } else {
                    }).forEach(function(key, index) {
                        if (key instanceof AST_Node) {
                            drop = false;
                            value = false;
                        } else {
                            drop = drop_keys && can_drop.get(key);
                            var mapped = prop_map && prop_map.get(key);
                            if (mapped) {
                                value = mapped.value;
                                if (value instanceof AST_Accessor) value = false;
                            } else {
                                value = false;
                            }
                            if (value) mapped.value = value;
                        }
                    });
                    value = save_value;
                    drop = save_drop;
                    if (drop_keys && prop_keys) {
                        value = value.clone();
                        value.properties = List(values, function(prop, index) {
                            var trimmed = prop.value.drop_side_effect_free(compressor);
                            if (trimmed) {
                                prop.value = trimmed;
                            }
                        });
                    }
                    if (value && !node.rest) switch (properties.length) {
                      case 0:
                        if (node === root) break;
                        if (value.may_throw_on_access(compressor, true)) break;
                        if (drop) value = value.drop_side_effect_free(compressor);
                        return null;
                      case 1:
                        if (!drop) break;
                        if (node === root) break;
                        var prop = properties[0];
                        if (prop.key instanceof AST_Node) break;
                        if (prop.value.has_side_effects(compressor)) break;
                        if (value.has_side_effects(compressor) && prop.value.match_symbol(function(node) {
                            return node instanceof AST_PropAccess;
                        })) break;
                        value = make_node(AST_Sub, node, {
                            expression: value,
                            property: make_node_from_constant(prop.key, prop),
                        });
                        return prop.value;
                    }
                    node.properties = properties;
                }
                if (node instanceof AST_Hole) {
                    node = null;
                } else {
                    node = process(node);
                }
                if (!node && drop && value) value = value.drop_side_effect_free(compressor);
            });
            function retain_lhs(node) {
                if (node instanceof AST_Destructured) {
                    if (value === null) {
                        value = make_node(AST_Number, node, { value: 0 });
                    } else if (value) {
                        if (value.may_throw_on_access(compressor, true)) {
                            value = make_node(AST_Array, node, {
                            });
                        } else {
                    }
                }
                node.unused = null;
            }
        }
    });
    function has_loop_control(loop, parent, type) {
        if (!type) type = AST_LoopControl;
    }
    AST_Definitions.DEFMETHOD("to_assignments", function() {
        var assignments = this.definitions.reduce(function(a, defn) {
            var def = defn.name.definition();
            var value = defn.value;
            if (value) {
                if (value instanceof AST_Sequence) value = value.clone();
                var assign = make_node(AST_Assign, defn, {
                });
                var fixed = function() {
                };
                fixed.assigns = [ assign ];
                fixed.direct_access = def.direct_access;
                fixed.escaped = def.escaped;
                def.references.forEach(function(ref) {
                    } else {
                        ref.fixed = fixed;
                        if (def.fixed === ref.fixed) def.fixed = fixed;
                    }
                });
            }
            def.assignments++;
            def.eliminated++;
            def.single_use = false;
        }, []);
    });
    function is_safe_lexical(def) {
    }
    OPT(AST_Call, function(self, compressor) {
        var exp = self.expression;
        if (compressor.option("unsafe")) {
            if (is_undeclared_ref(exp)) switch (exp.name) {
                if (self.args.length == 1) {
                    var first = self.args[0];
                    if (first instanceof AST_Number) try {
                        var length = first.value;
                        var elements = Array(length);
                        for (var i = 0; i < length; i++) elements[i] = make_node(AST_Hole, self);
                    } catch (ex) {
                }
            } else if (exp instanceof AST_Dot) switch (exp.property) {
                if (exp.expression instanceof AST_Array && self.args.length < 2) EXIT: {
                    var elements = [];
                    for (var i = 0; i < exp.expression.elements.length; i++) {
                        var el = exp.expression.elements[i];
                        var value = el.evaluate(compressor);
                    }
                    if (separator == "") {
                        var first;
                        if (elements[0].is_string(compressor) || elements[1].is_string(compressor)) {
                            first = elements.shift();
                        } else {
                            first = make_node(AST_String, self, { value: "" });
                        }
                    }
                    var node = self.clone();
                    node.expression = node.expression.clone();
                    node.expression.expression = node.expression.expression.clone();
                    node.expression.expression.elements = elements;
                }
                if (self.args.length < 2) {
                    var node = make_node(AST_Binary, self, {
                    });
                    node.is_string = return_true;
                }
            } else if (compressor.option("side_effects")
        }
            && exp.name == "Function") {
            })) {
                try {
                    self.args = [
                    ];
                } catch (ex) {
            }
        }
        var fn = exp instanceof AST_SymbolRef ? exp.fixed_value() : exp;
        var parent = compressor.parent(), current = compressor.self();
        var is_func = fn instanceof AST_Lambda
        var stat = is_func && fn.first_statement();
        if (can_inline && stat instanceof AST_Return) {
            var value = stat.value;
        }
        if (is_func && !fn.contains_this()) {
            var def, value, var_assigned = false;
            if (can_inline
                && (exp === fn || !recursive_ref(compressor, def = exp.definition(), fn)
                    && fn.is_constant_expression(find_scope(compressor)))
                && (value = can_flatten_body(stat))) {
                var replacing = exp === fn || def.single_use && def.references.length - def.replaced == 1;
                if (can_substitute_directly()) {
                    var refs = [];
                    var save_inlined = fn.inlined;
                    if (exp !== fn) fn.inlined = true;
                    var exprs = [];
                    var node = make_sequence(self, exprs).optimize(compressor);
                    fn.inlined = save_inlined;
                    node = maintain_this_binding(parent, current, node);
                    if (replacing || best_of_expression(node, self) === node) {
                        refs.forEach(function(ref) {
                            ref.scope = exp === fn ? fn.parent_scope : exp.scope;
                            ref.reference();
                            var def = ref.definition();
                            if (replacing) def.replaced++;
                            def.single_use = false;
                        });
                    } else if (!node.has_side_effects(compressor)) {
                        self.drop_side_effect_free = function(compressor, first_in_statement) {
                        };
                    }
                }
                var arg_used, insert, in_loop, scope;
                if (replacing && can_inject_symbols()) {
                    fn._squeezed = true;
                    if (exp !== fn) fn.parent_scope = exp.scope;
                    var node = make_sequence(self, flatten_fn()).optimize(compressor);
                }
            }
        }
        function return_value(stat) {
        }
        function can_flatten_body(stat) {
            var len = fn.body.length;
            if (len < 2) {
                stat = return_value(stat);
            }
            stat = null;
            for (var i = 0; i < len; i++) {
                var line = fn.body[i];
                if (line instanceof AST_Var) {
                    if (var_assigned) {
                        if (!declarations_only(line)) stat = null;
                    } else if (!declarations_only(line)) {
                        stat = null;
                        var_assigned = true;
                    }
                } else if (line instanceof AST_AsyncDefun
                } else {
                    stat = line;
                }
            }
        }
        function can_substitute_directly() {
        }
        function can_inject_symbols() {
            var level = 0, child;
            scope = current;
            do {
                child = scope;
                scope = compressor.parent(level++);
                } else if (scope instanceof AST_DWLoop) {
                    in_loop = [];
                } else if (scope instanceof AST_For) {
                    in_loop = [];
                } else if (scope instanceof AST_ForEnumeration) {
                    in_loop = [];
                }
            } while (!(scope instanceof AST_Scope));
            insert = scope.body.indexOf(child) + 1;
            arg_used = new Dictionary();
        }
        function append_var(decls, expressions, name, value) {
            var def = name.definition();
            def.assignments++;
        }
        function flatten_args(decls, expressions) {
            var len = fn.argnames.length;
            for (var i = self.args.length; --i >= len;) {
            }
            var default_args = [];
            for (i = len; --i >= 0;) {
                var argname = fn.argnames[i];
                var name;
                if (argname instanceof AST_DefaultValue) {
                    name = argname.name;
                } else {
                    name = argname;
                }
                } else {
                    var def = name.definition();
                    def.eliminated++;
                }
            }
            for (i = default_args.length; --i >= 0;) {
                var node = default_args[i];
                if (node.name.unused !== undefined) {
                    expressions.push(node.value);
                } else {
                    var sym = make_node(AST_SymbolRef, node.name);
                    node.name.definition().references.push(sym);
                    expressions.push(make_node(AST_Assign, node, {
                        operator: "=",
                        left: sym,
                        right: node.value,
                    }));
                }
            }
        }
        function flatten_destructured(decls, expressions) {
            function process(ref, name) {
                var def = name.definition();
                def.assignments++;
                def.eliminated++;
            }
        }
        function flatten_vars(decls, expressions) {
            fn.body.filter(in_loop ? function(stat) {
                var name = make_node(AST_SymbolVar, flatten_var(stat.name));
                var def = name.definition();
                def.fixed = false;
                def.eliminated++;
            }).forEach(function(stat) {
        }
        function flatten_fn() {
        }
    });
    function to_conditional_assignment(compressor, def, value, node) {
        def.replaced++;
    }
    function extract_lhs(node, compressor) {
    }
    function repeatable(compressor, node) {
    }
    OPT(AST_Binary, function(self, compressor) {
        if (compressor.option("assignments") && lazy_op[self.operator]) {
            var lhs = extract_lhs(self.left, compressor);
                && lhs.equals(right.left)) {
                lhs = lhs.clone();
                var assign = make_node(AST_Assign, self, {
                });
                if (lhs.fixed) {
                    lhs.fixed = function() {
                    };
                    lhs.fixed.assigns = [ assign ];
                }
                var def = lhs.definition();
                def.replaced++;
            }
        }
        if (compressor.option("comparisons")) switch (self.operator) {
            var is_strict_comparison = true;
                repeatable(compressor, self.left) && self.left.equals(self.right)) {
                self.operator = self.operator.slice(0, 2);
            }
            if (!is_strict_comparison && is_undefined(self.left, compressor)) {
                self.left = make_node(AST_Null, self.left);
            }
                && self.right.operator == "typeof") {
                var expr = self.right.expression;
                    : !(expr instanceof AST_PropAccess && compressor.option("ie"))) {
                    self.right = expr;
                    self.left = make_node(AST_Undefined, self.left).optimize(compressor);
                    if (self.operator.length == 2) self.operator += "=";
                }
            }
            var left = self.left;
                || left.left instanceof AST_Null && is_undefined(self.right.left, compressor)) {
                var expr = left.right;
                if (expr instanceof AST_Assign && expr.operator == "=") expr = expr.left;
                left.operator = left.operator.slice(0, -1);
                left.left = make_node(AST_Null, self);
            }
        }
        var in_bool = false;
        if (compressor.option("booleans")) {
            var lhs = extract_lhs(self.left, compressor);
            in_bool = compressor.in_boolean_context();
        }
        if (in_bool) switch (self.operator) {
            var ev = self.left.evaluate(compressor, true);
            if (ev && typeof ev == "string" || (ev = self.right.evaluate(compressor, true)) && typeof ev == "string") {
                self.truthy = true;
            }
        }
        if (compressor.option("conditionals") && lazy_op[self.operator]) {
            if (self.left instanceof AST_Binary && self.operator == self.left.operator) {
                var before = make_node(AST_Binary, self, {
                    operator: self.operator,
                    left: self.left.right,
                    right: self.right,
                });
                var after = before.transform(compressor);
            }
        }
    });
})(function(node, optimizer) {
