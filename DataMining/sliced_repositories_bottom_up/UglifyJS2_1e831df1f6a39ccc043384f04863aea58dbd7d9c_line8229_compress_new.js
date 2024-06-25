function Compressor(options, false_by_default) {
    } else {
    }
    var top_retain = this.options["top_retain"];
    } else if (typeof top_retain == "function") {
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
    }
}
(function(OPT) {
    (function(def) {
        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }
        function push_ref(def, ref) {
            if (def.last_ref !== false) def.last_ref = ref;
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    push(tw);
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
            fn.argnames.forEach(function(arg, i) {
                scan_declaration(tw, compressor, arg, function() {
                }, function(node, fixed) {
                    var d = node.definition();
                    if (fixed && safe && d.fixed === undefined) {
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
        def(AST_For, function(tw, descend, compressor) {
            this.variables.each(function(def) {
            });
        });
    })(function(node, func) {
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            var candidates = [];
            var scanner = new TreeTransformer(function(node, descend) {
                        || scan_rhs && (hit_rhs = scan_rhs(node, this)))) {
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
            }, signal_abort);
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
            function extract_args() {
                var iife, fn = compressor.self();
                if (is_function(fn)
                    && (iife = compressor.parent()) instanceof AST_Call
                    })) {
                    for (var i = fn.argnames.length; --i >= 0;) {
                        var sym = fn.argnames[i];
                        if (sym instanceof AST_DefaultValue) {
                            sym = sym.name;
                        }
                        if (sym instanceof AST_Destructured) {
                            if (!sym.match_symbol(return_false)) continue;
                            candidates.length = 0;
                            break;
                        }
                    }
                }
            }
            function mangleable_var(value) {
                var def = value.definition();
                return value_def = def;
            }
            function get_lhs(expr) {
            }
            function remove_candidate(expr) {
                var tt = new TreeTransformer(function(node, descend, in_list) {
                    if (node instanceof AST_VarDef) {
                        if (value_def) value_def.replaced++;
                    }
                }, patch_sequence);
            }
        }
        function handle_if_return(statements, compressor) {
            function last_of(predicate) {
                do {
                    do {
                    } while (block instanceof AST_If && (stat = block));
                } while ((block instanceof AST_BlockStatement || block instanceof AST_Scope)
            }
            function match_target(target) {
                return last_of(function(node) {
                    return node === target;
                });
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
    (function(def) {
        var fn = makePredicate([
            "lastIndexOf",
            "setTime",
        ]);
    })(function(node, func) {
    function fn_name_unused(fn, compressor) {
        var def = fn.name.definition();
        return all(def.references, function(sym) {
        });
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
        var is_func = fn instanceof AST_Lambda && (!is_async(fn)
            || compressor.option("awaits") && compressor.parent(
        var stat = is_func && fn.first_statement();
        var has_default = 0, has_destructured = false;
        var can_drop = is_func && all(fn.argnames, function(argname, index) {
            if (has_default == 1 && self.args[index] instanceof AST_Spread) has_default = 2;
            if (argname instanceof AST_DefaultValue) {
                if (!has_default) has_default = 1;
                var arg = has_default == 1 && self.args[index];
                if (arg && !is_undefined(arg)) has_default = 2;
                argname = argname.name;
            }
            if (argname instanceof AST_Destructured) {
                has_destructured = true;
            }
        });
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
                            if (replacing) {
                                def.replaced++;
                            } else {
                                def.single_use = false;
                            }
                        });
                    }
                }
                if (replacing && can_inject_symbols()) {
                    fn._squeezed = true;
                    if (exp !== fn) fn.parent_scope = exp.scope;
                }
            }
            if (compressor.option("side_effects")
                && (fn === exp ? fn_name_unused(fn, compressor) : !has_default && !has_destructured)
                && !(is_arrow(fn) && fn.value)) {
        }
    });
})(function(node, optimizer) {
