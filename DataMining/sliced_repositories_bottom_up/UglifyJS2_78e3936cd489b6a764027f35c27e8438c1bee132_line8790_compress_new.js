function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
        };
    } else {
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
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    compress: function(node) {
        node = node.resolve_defines(this);
        node.hoist_exports(this);
        var passes = +this.options.passes || 1;
        for (var pass = 0; pass < passes; pass++) {
            if (pass > 0 || this.option("reduce_vars"))
            node = node.transform(this);
        }
    },
    before: function(node, descend, in_list) {
        // would call AST_Node.transform() if a different instance of AST_Node is
        // Migrate and defer all children's AST_Node.transform() to below, which
        descend(node, this);
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
            } else if (stat instanceof AST_ExportReferences) {
                body.splice(i--, 1);
            }
        }
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
            }
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
        self.transform(tt);
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
        if (name == "valueOf") return false;
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
        }
        if (parent instanceof AST_Binary) {
        }
        if (parent instanceof AST_ObjectKeyVal) {
            if (parent.value !== node) return;
        }
    }
    function is_lambda(node) {
        return node instanceof AST_Class || node instanceof AST_Lambda;
    }
    function cross_scope(def, sym) {
        do {
            if (sym instanceof AST_Scope) return true;
        } while (sym = sym.parent_scope);
    }
    function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.definition();
        return all(def.orig, function(sym) {
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
            if (def.fixed instanceof AST_LambdaDefinition && !all(def.references, function(ref) {
                var scope = ref.scope.resolve();
                do {
                } while (scope instanceof AST_LambdaExpression && (scope = scope.parent_scope.resolve()));
            })) {
                tw.defun_ids[def.id] = false;
            }
            def.reassigned = 0;
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
        function pop(tw) {
            tw.safe_ids = Object.getPrototypeOf(tw.safe_ids);
        }
        function safe_to_read(tw, def) {
            var safe = tw.safe_ids[def.id];
            if (safe) {
                if (!HOP(tw.safe_ids, def.id)) safe.read = safe.read && safe.read !== tw.safe_ids ? true : tw.safe_ids;
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                    return true;
                }
            }
        }

        function safe_to_assign(tw, def, declare) {
            if (!(declare || all(def.orig, function(sym) {
            }))) return false;
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
                delete def.safe_ids;
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
                    if (node.rest) {
                        if (save) fixed = compressor.option("rests") && function() {
                            var value = save();
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
            switch (node.operator) {
                if (left.equivalent_to(node.right) && !left.has_side_effects(compressor)) {
                    node.__drop = true;
                    return true;
                }
                var d = left.definition();
                d.assignments++;
                var fixed = d.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    d.fixed = false;
                }
                if (safe && !left.in_arg && safe_to_assign(tw, d)) {
                    if (d.single_use) d.single_use = false;
                    left.fixed = d.fixed = function() {
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
                } else {
                    d.fixed = false;
                }
            }
            function walk_assign() {
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
            }
        });
        def(AST_Binary, function(tw) {
            if (!lazy_op[this.operator]) return;
        });
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (exp instanceof AST_LambdaExpression) {
                var iife = is_iife_single(this);
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
            tw.in_loop = saved_loop;
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
        def(AST_If, function(tw) {
            if (this.alternative) {
            }
        });
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            var fn = this;
            var def = fn.name.definition();
            var parent = tw.parent();
            if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) def.single_use = false;
            tw.defun_visited[def.id] = true;
            fn.inlined = false;
            pop(tw);
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
                }
            } else {
                d.fixed = false;
            }
        });
        def(AST_VarDef, function(tw, descend, compressor) {
            var node = this;
            if (node.value) {
            } else if (!(tw.parent() instanceof AST_Let)) {
            scan_declaration(tw, compressor, node.name, function() {
            }, function(name, fixed) {
                var d = name.definition();
                if (fixed && safe_to_assign(tw, d, true)) {
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
    })(function(node, func) {
    function is_lhs_read_only(lhs, compressor) {
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                lhs = lhs.fixed_value();
            }
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
    }
    function is_iife_single(call) {
    }
    function is_undeclared_ref(node) {
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
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (!can_replace || stop_if_hit && (hit_rhs || !lhs_local || !replace_all)) {
                        if (!hit_rhs && !value_def) abort = true;
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
            }, signal_abort);
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
                        if (funarg && is_async(scope)) continue;
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
                    var check_destructured = in_try || !lhs_local ? function(node) {
                        return node instanceof AST_Destructured;
                    } : return_false;
                    var replace_all = replace_all_symbols(candidate);
                    var hit = funarg;
                    var abort = false;
                    var replaced = 0;
                    var assign_used = false;
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
                        var def = lhs.definition();
                        var referenced = def.references.length - def.replaced;
                        if (candidate instanceof AST_Assign) referenced--;
                        if (!replaced || referenced > replaced) {
                            candidates.push(hit_stack);
                            force_single = true;
                            continue;
                        }
                        abort = false;
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
                    if (replaced && !remove_candidate(candidate)) statements.splice(stat_index, 1);
                }
            }
            function signal_abort(node) {
                if (stop_after === node) abort = true;
                if (stop_if_hit === node) stop_if_hit = null;
            }
            function handle_custom_scan_order(node, tt) {
                }))) {
                    abort = true;
                }
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
            function should_stop(node, parent) {
                if (node instanceof AST_SymbolRef) {
                    scan_rhs = false;
                }
            }
            function in_conditional(node, parent) {
            }
            function is_last_node(node, parent) {
                if (node instanceof AST_Call) {
                    var replace = can_replace;
                    can_replace = false;
                    var after = stop_after;
                    var if_hit = stop_if_hit;
                    })) {
                        abort = true;
                    } else if (is_arrow(fn) && fn.value) {
                    stop_if_hit = if_hit;
                    stop_after = after;
                    can_replace = replace;
                    abort = false;
                }
            }
            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_LambdaExpression
                    && (iife = compressor.parent()) instanceof AST_Call
                    })) {
                    args = iife.args.slice();
                    var len = args.length;
                    for (var i = fn.argnames.length; --i >= 0;) {
                        var sym = fn.argnames[i];
                        var value;
                        if (sym instanceof AST_DefaultValue) {
                            value = sym.value;
                            sym = sym.name;
                            args[len + i] = value;
                        }
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
            function find_stop_unused(node, level) {
                var parent = scanner.parent(level);
                function check_assignment(lhs) {
                    if (lhs !== node && lhs instanceof AST_Destructured) {
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
            function get_rvalue(expr) {
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
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    hit_index++;
                    hit = true;
                    if (node instanceof AST_VarDef) {
                        if (value_def) value_def.replaced++;
                        node = node.clone();
                        node.value = null;
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
                if (node instanceof AST_Assign) return side_effects_external(node.left, true);
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
                    } else if (stat instanceof AST_Var) {
                        if (exprs) {
                            CHANGED = true;
                        } else {
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
                        if (exprs) {
                            CHANGED = true;
                        }
                    }
                } else if (stat instanceof AST_ForEnumeration) {
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
    (function(def) {
        def(AST_SymbolRef, function() {
            delete this.is_truthy;
        });
    })(function(node, func) {
    (function(def) {
        def(AST_Array, return_false);
    })(function(node, func) {
    var lazy_op = makePredicate("&& || ??");
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
                    var separator = self.args[0];
                    if (separator) {
                        separator = separator.evaluate(compressor);
                    }
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
                }
            }
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
        var is_func = fn instanceof AST_Lambda
        var stat = is_func && fn.first_statement();
        var can_drop = is_func && all(fn.argnames, function(argname, index) {
            if (argname instanceof AST_DefaultValue) {
                argname = argname.name;
            }
        }) && !(fn.rest instanceof AST_Destructured && has_arg_refs(fn.rest));
        var can_inline = can_drop && compressor.option("inline") && !self.is_expr_pure(compressor);
        if (can_inline && stat instanceof AST_Return) {
            var value = stat.value;
            if (exp === fn && !fn.name && (!value || value.is_constant_expression()) && safe_from_await_yield(fn)) {
            }
        }
    });
})(function(node, optimizer) {
