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
    function in_async_generator(scope) {
    }
    function find_try(compressor, level, node, scope, may_throw, sync) {
        for (var parent; parent = compressor.parent(level++); node = parent) {
        }
    }
    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                lhs = lhs.fixed_value();
            }
        }
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
    function is_declaration(stat, lexical) {
    }
    function tighten_body(statements, compressor) {
        var in_lambda = last_of(compressor, function(node) {
        });
        var block_scope, iife_in_try, in_iife_single, in_loop, in_try, scope;
        function last_of(compressor, predicate) {
        }
        function find_loop_scope_try() {
            var node = compressor.self(), level = 0;
            do {
                if (!block_scope && node.variables) block_scope = node;
                if (node instanceof AST_Catch) {
                    if (compressor.parent(level).bfinally) {
                        if (!in_try) in_try = {};
                        in_try.bfinally = true;
                    }
                    level++;
                } else if (node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                } else if (node instanceof AST_Try) {
                    if (!in_try) in_try = {};
                    if (node.bcatch) in_try.bcatch = true;
                    if (node.bfinally) in_try.bfinally = true;
                }
            } while (node = compressor.parent(level++));
        }
        function collapse(statements, compressor) {
            var args;
            var candidates = [];
            var changed = false;
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
                if (!stop_if_hit && in_conditional(node, parent)) {
                    stop_if_hit = parent;
                }
                    && node instanceof AST_Assign && node.operator != "=" && node.left.equals(lhs)) {
                    replaced++;
                    changed = true;
                    can_replace = false;
                    lvalues = get_lvalues(lhs);
                    } else {
                        abort = true;
                        });
                    }
                }
                if (should_stop(node, parent)) {
                    abort = true;
                }
                var hit_rhs;
                if (!(node instanceof AST_SymbolDeclaration)
                    && (scan_lhs && lhs.equals(node)
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (!can_replace || stop_if_hit && (hit_rhs || !lhs_local || !replace_all)) {
                        if (!hit_rhs && !value_def) abort = true;
                    }
                    if (is_lhs(node, parent)) {
                        if (value_def && !hit_rhs) assign_used = true;
                    }
                    if (!hit_rhs && verify_ref && node.fixed !== lhs.fixed) {
                        abort = true;
                    }
                    if (value_def) {
                        if (stop_if_hit && assign_pos == 0) assign_pos = remaining - replaced;
                        if (!hit_rhs) replaced++;
                    }
                    replaced++;
                    changed = abort = true;
                    if (candidate instanceof AST_VarDef) {
                        var def = candidate.name.definition();
                        if (def.references.length - def.replaced == 1 && !compressor.exposed(def)) {
                            def.replaced++;
                        }
                    }
                }
                if (should_stop_ref(node, parent)) {
                    abort = true;
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
                if (node instanceof AST_Destructured) {
                    var replace = can_replace;
                    can_replace = false;
                    can_replace = replace;
                }
                if (node instanceof AST_DefaultValue) {
                    node.name = node.name.transform(scanner);
                    var replace = can_replace;
                    can_replace = false;
                    node.value = node.value.transform(scanner);
                    can_replace = replace;
                }
                    }))) {
                    var replace = can_replace;
                    can_replace = false;
                    can_replace = replace;
                }
            }, signal_abort);
            var multi_replacer = new TreeTransformer(function(node) {
                if (!hit) {
                    hit_index++;
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
                    if (!--replaced) abort = true;
                    if (replaced == assign_pos) {
                        abort = true;
                    }
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
            function signal_abort(node) {
                if (stop_after === node) abort = true;
                if (stop_if_hit === node) stop_if_hit = null;
            }
            function handle_custom_scan_order(node, tt) {
                if (node instanceof AST_ForEnumeration) {
                    abort = true;
                }
                if (node instanceof AST_Switch) {
                    for (var i = 0; !abort && i < node.body.length; i++) {
                        if (branch instanceof AST_Case) {
                            if (!hit) {
                                hit_index++;
                            }
                            scan_rhs = false;
                        }
                    }
                    abort = true;
                }
            }
            function should_stop_ref(node, parent) {
                scan_rhs = false;
            }

            function in_conditional(node, parent) {
                if (parent instanceof AST_Assign) return parent.left !== node && lazy_op[parent.operator.slice(0, -1)];
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
                    for (var i = 0; !abort && i < fn.argnames.length; i++) {
                        if (arg_may_throw(reject, fn.argnames[i], node.args[i])) abort = true;
                    }
                    if (!abort) {
                        if (fn.rest && arg_may_throw(reject, fn.rest, make_node(AST_Array, node, {
                            elements: node.args.slice(i),
                        }))) {
                            abort = true;
                        } else if (is_arrow(fn) && fn.value) {
                        } else for (var i = 0; !abort && i < fn.body.length; i++) {
                            }
                        }
                    }
                    stop_if_hit = if_hit;
                    stop_after = after;
                    can_replace = replace;
                    fn.collapse_scanning = false;
                    abort = false;
                }
                if (node instanceof AST_SymbolRef) {
                    var def = node.definition();
                }
                function reject(node) {
                }
            }
            function arg_may_throw(reject, node, value) {
            }
            function extract_args() {
                var iife = compressor.parent(), fn = compressor.self();
                if (in_iife_single === undefined) {
                        })) {
                        in_iife_single = false;
                    }
                    in_iife_single = true;
                }
                var fn_strict = fn.in_strict_mode(compressor)
                if (is_async(fn)) {
                    iife_in_try = true;
                } else {
                    if (iife_in_try === undefined) iife_in_try = find_try(compressor, 1, iife, null, true, true);
                }
                var arg_scope = null;
                var tw = new TreeWalker(function(node, descend) {
                    if (has_await(node) || node instanceof AST_Yield) {
                        arg = null;
                    }
                    if (node instanceof AST_ObjectIdentity) {
                        if (fn_strict || !arg_scope) arg = null;
                    }
                    if (node instanceof AST_SymbolRef) {
                            || (def = fn.variables.get(node.name)) && def !== node.definition()) {
                            arg = null;
                        }
                    }
                    if (node instanceof AST_Scope && !is_arrow(node)) {
                        var save_scope = arg_scope;
                        arg_scope = node;
                        arg_scope = save_scope;
                    }
                });
                args = iife.args.slice();
                var len = args.length;
                for (var i = fn.argnames.length; --i >= 0;) {
                    var sym = fn.argnames[i];
                    var arg = args[i];
                    var value = null;
                    if (sym instanceof AST_DefaultValue) {
                        value = sym.value;
                        sym = sym.name;
                        args[len + i] = value;
                    }
                    if (sym instanceof AST_Destructured) {
                        }, sym, arg)) {
                            candidates.length = 0;
                        }
                        args[len + i] = fn.argnames[i];
                    }
                    if (value) arg = is_undefined(arg) ? value : null;
                    if (!arg && !value) {
                        arg = make_node(AST_Undefined, sym).transform(compressor);
                    } else if (arg instanceof AST_Lambda && arg.pinned()) {
                        arg = null;
                    } else if (arg) {
                }
            }
            function extract_candidates(expr, unused) {
                if (expr instanceof AST_Array) {
                    expr.elements.forEach(function(node) {
                        extract_candidates(node, unused);
                    });
                } else if (expr instanceof AST_Assign) {
                    var lhs = expr.left;
                    if (!(lhs instanceof AST_Destructured)) candidates.push(hit_stack.slice());
                    extract_candidates(lhs);
                    extract_candidates(expr.right);
                    if (lhs instanceof AST_SymbolRef && expr.operator == "=") {
                        assignments.set(lhs.name, (assignments.get(lhs.name) || 0) + 1);
                    }
                } else if (expr instanceof AST_Await) {
                    extract_candidates(expr.expression, unused);
                } else if (expr instanceof AST_Binary) {
                    var lazy = lazy_op[expr.operator];
                    if (unused
                        && lazy
                        && expr.operator != "??"
                        && expr.right instanceof AST_Assign
                        && expr.right.operator == "="
                        && !(expr.right.left instanceof AST_Destructured)) {
                        candidates.push(hit_stack.slice());
                    }
                    extract_candidates(expr.left, !lazy && unused);
                    extract_candidates(expr.right, unused);
                } else if (expr instanceof AST_Call) {
                    extract_candidates(expr.expression);
                    expr.args.forEach(extract_candidates);
                } else if (expr instanceof AST_Case) {
                    extract_candidates(expr.expression);
                } else if (expr instanceof AST_Conditional) {
                    extract_candidates(expr.condition);
                    extract_candidates(expr.consequent, unused);
                    extract_candidates(expr.alternative, unused);
                } else if (expr instanceof AST_Definitions) {
                    expr.definitions.forEach(extract_candidates);
                } else if (expr instanceof AST_Dot) {
                    extract_candidates(expr.expression);
                } else if (expr instanceof AST_DWLoop) {
                    extract_candidates(expr.condition);
                    if (!(expr.body instanceof AST_Block)) {
                        extract_candidates(expr.body);
                    }
                } else if (expr instanceof AST_Exit) {
                    if (expr.value) extract_candidates(expr.value);
                } else if (expr instanceof AST_For) {
                    if (!(expr.body instanceof AST_Block)) {
                    }
                } else if (expr instanceof AST_ForEnumeration) {
            }
            function find_stop(node, level) {
            }
            function find_stop_expr(expr, cont, node, parent, level) {
                var replace = can_replace;
                can_replace = false;
                var after = stop_after;
                var if_hit = stop_if_hit;
                var stack = scanner.stack;
                scanner.stack = [ parent ];
                scanner.stack = stack;
                stop_if_hit = if_hit;
                stop_after = after;
                can_replace = replace;
                if (abort) {
                    abort = false;
                }
            }
            function find_stop_value(node, level) {
            }
            function mangleable_var(rhs) {
                if (force_single) {
                    force_single = false;
                }
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
            function remaining_refs(def) {
            }
            function get_lhs(expr) {
                if (expr instanceof AST_Assign) {
                    var lhs = expr.left;
                    var def = lhs.definition();
                    remaining = remaining_refs(def);
                    if (def.fixed && lhs.fixed) {
                        var matches = def.references.filter(function(ref) {
                        }).length - 1;
                        if (matches < remaining) {
                            remaining = matches;
                            assign_pos = 0;
                            verify_ref = true;
                        }
                    }
                }
                if (expr instanceof AST_VarDef) {
                    var lhs = expr.name;
                    var def = lhs.definition();
                    remaining = remaining_refs(def);
                    if (def.fixed) remaining = Math.min(remaining, def.references.filter(function(ref) {
                    }).length);
                }
            }
            function get_rvalue(expr) {
            }
            function foldable(expr) {
                while (expr instanceof AST_Assign && expr.operator == "=") {
                    expr = expr.right;
                }
            }
            function get_lvalues(expr) {
                if (expr instanceof AST_VarDef) {
                    if (!expr.name.definition().fixed) well_defined = false;
                }
                var tw = new TreeWalker(function(node) {
                    if (node instanceof AST_SymbolRef) {
                        if (!value) {
                                && (has_escaped(def, node.scope, node, tw.parent()) || !same_scope(def))) {
                                well_defined = false;
                            }
                        }
                    } else if (node instanceof AST_ObjectIdentity) {
                    } else if (find_arguments && node instanceof AST_Sub) {
                        scope.each_argname(function(argname) {
                            if (!compressor.option("reduce_vars") || argname.definition().assignments) {
                                if (!argname.definition().fixed) well_defined = false;
                            }
                        });
                    }
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
                var value = rvalue === rhs_value ? null : make_sequence(rhs_value, rhs_value.expressions.slice(0, -1));
                var index = expr.name_index;
                if (index >= 0) {
                    var args, argname = scope.argnames[index];
                    if (argname instanceof AST_DefaultValue) {
                        scope.argnames[index] = argname = argname.clone();
                        argname.value = value || make_node(AST_Number, argname, { value: 0 });
                    } else if ((args = compressor.parent().args)[index]) {
                        scope.argnames[index] = argname.clone();
                        args[index] = value || make_node(AST_Number, args[index], { value: 0 }
                    }
                }
                var end = hit_stack.length - 1;
                var last = hit_stack[end];
                if (last instanceof AST_VarDef || hit_stack[end - 1].body === last) end--;
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    hit_index++;
                    hit = true;
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
                abort = false;
                hit = false;
                hit_index = 0;
                if (!(statements[stat_index] = statements[stat_index].transform(tt))) statements.splice(stat_index, 1);
            }
            function is_lhs_local(lhs) {
            }
            function value_has_side_effects() {
            }
            function replace_all_symbols(expr) {
                verify_ref = true;
            }
            function symbol_in_lvalues(sym, parent) {
                scan_rhs = false;
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
        function handle_if_return(statements, compressor) {
            var drop_return_void = !(in_try && in_try.bfinally && in_async_generator(in_lambda));
        }
    }
})(function(node, optimizer) {
