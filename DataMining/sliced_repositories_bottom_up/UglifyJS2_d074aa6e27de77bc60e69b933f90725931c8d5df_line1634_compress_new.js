function Compressor(options, false_by_default) {
    } else if (top_retain) {
        this.top_retain = function(def) {
        };
    }
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
}
Compressor.prototype = new TreeTransformer;
(function(OPT) {
    (function(def) {
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
    })(function(node, func) {
    function is_lhs_read_only(lhs) {
        if (lhs instanceof AST_PropAccess) {
            lhs = lhs.expression;
            if (lhs instanceof AST_SymbolRef) {
                lhs = lhs.fixed_value();
            }
        }
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
                if (node instanceof AST_Catch || node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                } else if (node instanceof AST_Try) {
                    in_try = true;
                }
            } while (node = compressor.parent(level++));
        }
        function collapse(statements, compressor) {
            var args;
            var candidates = [];
            var stat_index = statements.length;
            var scanner = new TreeTransformer(function(node) {
                if (!hit) {
                    hit_index++;
                    hit = true;
                    stop_after = find_stop(node, 0);
                    if (stop_after === node) abort = true;
                }
                var parent = scanner.parent();
                if (should_stop(node, parent)) {
                    abort = true;
                }
                if (!stop_if_hit && in_conditional(node, parent)) {
                    stop_if_hit = parent;
                }
                var hit_lhs, hit_rhs;
                if (can_replace
                    && (scan_lhs && (hit_lhs = lhs.equivalent_to(node))
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    if (stop_if_hit && (hit_rhs || !lhs_local || !replace_all)) {
                        abort = true;
                    }
                    if (is_lhs(node, parent)) {
                        if (value_def) replaced++;
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
                    hit_index++;
                    hit = true;
                }
                    && node.name == def.name) {
                    if (!--replaced) abort = true;
                    def.replaced++;
                    value_def.replaced--;
                }
            });
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
                    var rhs = get_rhs(candidate);
                    var side_effects = lhs && lhs.has_side_effects(compressor);
                    var scan_lhs = lhs && !side_effects && !is_lhs_read_only(lhs);
                    var scan_rhs = rhs && foldable(rhs);
                    if (!scan_lhs && !scan_rhs) continue;
                    // Locate symbols which may execute code outside of scanning range
                    var lvalues = get_lvalues(candidate);
                    var lhs_local = is_lhs_local(lhs);
                    if (!side_effects) side_effects = value_has_side_effects(candidate);
                    var replace_all = replace_all_symbols();
                    var may_throw = candidate.may_throw(compressor) ? in_try ? function(node) {
                        return node.has_side_effects(compressor);
                    } : side_effects_external : return_false;
                    var funarg = candidate.name instanceof AST_SymbolFunarg;
                    var hit = funarg;
                    var abort = false, replaced = 0, can_replace = !args || !hit;
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
                        var def = candidate.name.definition();
                        if (abort && def.references.length - def.replaced > replaced) replaced = false;
                        else {
                            abort = false;
                            hit_index = 0;
                            hit = funarg;
                            for (var i = stat_index; !abort && i < statements.length; i++) {
                                statements[i].transform(multi_replacer);
                            }
                            value_def.single_use = false;
                        }
                    }
                    if (replaced && !remove_candidate(candidate)) statements.splice(stat_index, 1);
                }
            }
            function handle_custom_scan_order(node) {
                if (node instanceof AST_Switch) {
                    for (var i = 0, len = node.body.length; !abort && i < len; i++) {
                        if (branch instanceof AST_Case) {
                            if (!hit) {
                                hit_index++;
                            }
                        }
                    }
                    abort = true;
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
            function find_stop(node, level, write_only) {
            }
            function mangleable_var(var_def) {
                var value = var_def.value;
                var def = value.definition();
                return value_def = def;
            }
            function get_lhs(expr) {
            }
            function get_rhs(expr) {
            }
            function foldable(expr) {
            }
            function get_lvalues(expr) {
            }
            function remove_candidate(expr) {
            }
            function is_lhs_local(lhs) {
            }
            function value_has_side_effects(expr) {
            }
            function replace_all_symbols() {
                if (value_def) return true;
                if (lhs instanceof AST_SymbolRef) {
                    var def = lhs.definition();
                }
            }
            function symbol_in_lvalues(sym, parent) {
                var lvalue = lvalues[sym.name];
                if (!lvalue) return;
                if (lvalue !== lhs) return !(parent instanceof AST_Call && parent.expression === sym);
                scan_rhs = false;
            }
        }
    }
})(function(node, optimizer) {
