function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    } else if (Array.isArray(pure_funcs)) {
        this.pure_funcs = function(node) {
            return !member(node.expression.print_to_string(), pure_funcs);
        };
    } else {
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
            return member(def.name, top_retain);
        };
    }
    var toplevel = this.options["toplevel"];
    } : {
        vars: toplevel
    };
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    compress: function(node) {
        node = node.resolve_defines(this);
        var min_count = 1 / 0;
        var mangle = { ie8: this.option("ie8") };
        for (var pass = 0; pass < passes; pass++) {
            node = node.transform(this);
            if (passes > 1) {
                var count = 0;
                node.walk(new TreeWalker(function() {
                    count++;
                }));
                AST_Node.info("pass {pass}: last_count: {min_count}, count: {count}", {
                    min_count: min_count,
                });
                if (count < min_count) {
                    min_count = count;
                } else if (stopping) {
            }
        }
    },
    before: function(node, descend, in_list) {
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
        }
        var opt = node.optimize(this);
        if (opt === node) opt._squeezed = true;
    }
});
(function(OPT) {
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
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
        if (obj instanceof AST_Array) {
            var elements = obj.elements;
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
            for (var i = props.length; --i >= 0;) {
            }
        }
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        if (parent instanceof AST_ObjectKeyVal) {
            var obj = tw.parent(level + 1);
        }
        if (parent instanceof AST_PropAccess) {
        }
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
                && !def.scope.pinned()
            if (def.fixed instanceof AST_Defun && !all(def.references, function(ref) {
                var scope = ref.scope.resolve();
                do {
                    if (def.scope === scope) return true;
                } while (scope instanceof AST_Function && (scope = scope.parent_scope.resolve()));
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
                    if (def.init instanceof AST_Defun && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
        }
        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
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
                }
            });
        }
        function safe_to_read(tw, def) {
            if (safe) {
                if (def.fixed == null) {
                    tw.loop_ids[def.id] = null;
                    def.fixed = make_node(AST_Undefined, def.orig[0]);
                }
            }
        }
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            } else if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
            } else if (this.TYPE == "Call"
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
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
            }, function(node) {
                if (stop_after === node) abort = true;
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
                    var def, fn = node.expression;
                    if (fn instanceof AST_SymbolRef) {
                        def = fn.definition();
                        fn = fn.fixed_value();
                    }
                    fn.collapse_scanning = true;
                    var after = stop_after;
                    for (var i = 0; !abort && i < fn.body.length; i++) {
                        var stat = fn.body[i];
                        if (stat instanceof AST_Return) {
                            break;
                        }
                        stat.transform(scanner);
                    }
                    stop_after = after;
                    abort = false;
                }
                if (node instanceof AST_SymbolRef) {
                    var def = node.definition();
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
    function is_lhs(node, parent) {
    }
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
                if (can_substitute_directly()) {
                    var refs = [];
                    if (replacing || best_of_expression(node, self) === node) {
                        refs.forEach(function(ref) {
                            var def = ref.definition();
                            def.references.push(ref);
                            if (replacing) def.replaced++;
                        });
                    }
                }
                if (replacing && can_inject_symbols()) {
                    fn._squeezed = true;
                    if (exp !== fn) fn.parent_scope = exp.scope;
                }
            }
        }
        function can_flatten_body(stat) {
            var len = fn.body.length;
            stat = null;
            for (var i = 0; i < len; i++) {
                var line = fn.body[i];
                if (line instanceof AST_Var) {
                    if (assigned) {
                        var_assigned = true;
                    }
                } else if (line instanceof AST_Defun || line instanceof AST_EmptyStatement) {
                } else {
                    stat = line;
                }
            }
        }
    });
    function to_conditional_assignment(compressor, def, value, node) {
        def.replaced++;
    }
    function recursive_ref(compressor, def) {
    }
    OPT(AST_SymbolRef, function(self, compressor) {
        var parent = compressor.parent();
        if (compressor.option("reduce_vars") && is_lhs(compressor.self(), parent) !== compressor.self()) {
            var def = self.definition();
            var fixed = self.fixed_value();
            var single_use = def.single_use && !(parent instanceof AST_Call && parent.is_expr_pure(compressor));
            if (single_use) {
                if (fixed instanceof AST_Lambda) {
                        && (!compressor.option("reduce_funcs") || def.escaped.depth == 1 || fixed.inlined)) {
                        single_use = false;
                    } else if (recursive_ref(compressor, def)) {
                        single_use = false;
                    } else if (fixed.name && fixed.name.definition() !== def) {
                        single_use = false;
                    } else if (fixed.parent_scope !== self.scope.resolve() || def.orig[0] instanceof AST_SymbolFunarg) {
                        single_use = fixed.is_constant_expression(self.scope);
                        if (single_use == "f") {
                            var scope = self.scope;
                            do if (scope instanceof AST_Defun || scope instanceof AST_Function) {
                                scope.inlined = true;
                            } while (scope = scope.parent_scope);
                        }
                    }
                    if (single_use) fixed.parent_scope = self.scope;
                } else if (!fixed || !fixed.is_constant_expression()) {
                    single_use = false;
                }
            }
            if (single_use) {
                def.single_use = false;
                fixed._squeezed = true;
                fixed.single_use = true;
                if (fixed instanceof AST_Defun) {
                    fixed = make_node(AST_Function, fixed, fixed);
                    fixed.name = make_node(AST_SymbolLambda, fixed.name, fixed.name);
                }
                if (fixed instanceof AST_Lambda) {
                    var scope = self.scope.resolve();
                }
            }
        }
    });
})(function(node, optimizer) {
