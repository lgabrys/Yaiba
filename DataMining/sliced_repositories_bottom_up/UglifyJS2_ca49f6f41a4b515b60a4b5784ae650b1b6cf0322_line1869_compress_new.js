function Compressor(options, false_by_default) {
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
    }
}
(function(OPT) {
    (function(def) {
        function safe_to_assign(tw, def, declare) {
            if (def.fixed === null && def.safe_ids) {
                def.safe_ids[def.id] = false;
                delete def.safe_ids;
            }
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DestructuredArray) {
                    return true;
                }
            });
        }
        def(AST_Assign, function(tw, descend, compressor) {
            switch (node.operator) {
              case "&&=":
            }
        });
        def(AST_BlockScope, function(tw, descend, compressor) {
            this.variables.each(function(def) {
            });
        });
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            this.condition.walk(tw);
            tw.in_loop = saved_loop;
        });
        def(AST_Switch, function(tw, descend, compressor) {
            this.expression.walk(tw);
        });
        def(AST_VarDef, function(tw, descend, compressor) {
            var node = this;
            scan_declaration(tw, compressor, node.name, function() {
            }, function(name, fixed) {
                var d = name.definition();
                if (fixed && safe_to_assign(tw, d, true)) {
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
    function tighten_body(statements, compressor) {
        var CHANGED, max_iter = 10;
        do {
            CHANGED = false;
        } while (CHANGED && max_iter-- > 0);
        function collapse(statements, compressor) {
            var scanner = new TreeTransformer(function(node, descend) {
                if (!hit) {
                    hit_index++;
                    hit = true;
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
                    if (is_lhs(node, parent)) {
                        if (value_def && !hit_rhs) {
                            assign_used = true;
                        }
                    } else if (value_def) {
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
                if (node instanceof AST_DefaultValue) {
                    node.name = node.name.transform(scanner);
                    node.value = node.value.transform(scanner);
                }
            }, signal_abort);
            var multi_replacer = new TreeTransformer(function(node) {
                if (abort) return node;
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
                        return handle_custom_scan_order(node, multi_replacer);
                    }
                }
            }, patch_sequence);
        }
    }
})(function(node, optimizer) {
