(function(OPT) {
    (function(def) {
        function reset_def(tw, compressor, def) {
        }
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
            } else if (this.TYPE == "Call"
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
    })(function(node, func) {
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            var candidates = [];
            var scanner = new TreeTransformer(function(node, descend) {
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
                    candidate.write_only = false;
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
                        } else if (candidate instanceof AST_Assign) {
                            candidates.push(hit_stack);
                            force_single = true;
                            continue;
                        } else {
                            replaced = false;
                        }
                        if (replaced) {
                            hit_index = 0;
                            hit = funarg;
                            for (var i = stat_index; !abort && i < statements.length; i++) {
                                if (!statements[i].transform(multi_replacer)) statements.splice(i--, 1);
                            }
                            value_def.single_use = false;
                        }
                    }
                    if (replaced && !remove_candidate(candidate)) statements.splice(stat_index, 1);
                }
            }
            function should_stop(node, parent) {
                if (parent instanceof AST_For) return node !== parent.init;
                    return node.operator != "=" && lhs.equivalent_to(node.left);
                if (replace_all) return false;
                return node instanceof AST_SymbolRef
                    && !node.is_declared(compressor)
                    && !(parent instanceof AST_Assign && parent.left === node);
            }
        }
    }
})(function(node, optimizer) {
