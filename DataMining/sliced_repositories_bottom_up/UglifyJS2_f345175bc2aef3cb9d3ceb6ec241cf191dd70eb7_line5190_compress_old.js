function Compressor(options, false_by_default) {
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
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
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    exposed: function(def) {
    },
    compress: function(node) {
        var passes = +this.options.passes || 1;
        for (var pass = 0; pass < passes; pass++) {
        }
    },
    before: function(node, descend, in_list) {
        // would call AST_Node.transform() if a different instance of AST_Node is
        // Migrate and defer all children's AST_Node.transform() to below, which
        // following replacement call would result in degraded efficiency of both
    }
});
(function(OPT) {
    AST_Node.DEFMETHOD("equivalent_to", function(node) {
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
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
        if (value instanceof AST_Object) return native_fns.Object[name];
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        var lhs = is_lhs(node, parent);
        if (parent instanceof AST_ForIn) return parent.init === node;
    }
    function is_arguments(def) {
        if (!def.scope.uses_arguments) return false;
    }
    function can_drop_symbol(ref, keep_lambda) {
        var orig = ref.definition().orig;
        return all(orig, function(sym) {
            return !(sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet
                || keep_lambda && sym instanceof AST_SymbolLambda);
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
                && def.init;
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
                    if (is_defun(def.init) && !(def.id in tw.defun_ids)) {
                        tw.defun_ids[def.id] = false;
                    }
                });
            };
            if (compressor.option("ie8")) scope.variables.each(function(def) {
                var d = def.orig[0].definition();
                if (d !== def) d.fixed = false;
            });
        }
        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
                var visited = tw.defun_visited[def.id];
                } else if (visited) {
                    def.init.enclosed.forEach(function(d) {
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
        }
        function has_escaped(d, node, parent) {
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
            if (parent instanceof AST_Call && parent.expression === node) return;
            d.direct_access = true;
        }
        function mark_assignment_to_arguments(node) {
            var expr = node.expression;
            var def = expr.definition();
            def.reassigned = true;
        }
        function scan_declaration(tw, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                visit(node, fixed, function() {
                    var save_len = tw.stack.length;
                    tw.stack.length = save_len;
                });
            });
        }
        def(AST_Do, function(tw) {
            return true;
        });
    })(function(node, func) {
    function loop_body(x) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (is_function(fn)
                    && (iife = compressor.parent()) instanceof AST_Call
                    && all(iife.args, function(arg) {
                        return !(arg instanceof AST_Spread);
                    })) {
                    var fn_strict = compressor.has_directive("use strict");
                    if (fn_strict && !member(fn_strict, fn.body)) fn_strict = false;
                }
            }
        }
        function eliminate_dead_code(statements, compressor) {
            var self = compressor.self();
            for (var i = 0, n = 0, len = statements.length; i < len; i++) {
                var stat = statements[i];
                if (stat instanceof AST_LoopControl) {
                    var lct = compressor.loopcontrol_target(stat);
                            && loop_body(lct) === self) {
                    } else {
                        statements[n++] = stat;
                    }
                } else {
                    statements[n++] = stat;
                }
            }
            statements.length = n;
        }
    }
    (function(def) {
        def(AST_Call, function(compressor) {
        });
        def(AST_String, return_true);
    })(function(node, func) {
    function is_lhs(node, parent) {
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    AST_Scope.DEFMETHOD("merge_variables", function(compressor) {
        var self = this, segment = {}, root;
        var references = Object.create(null);
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Assign) {
                if (lhs instanceof AST_Destructured) {
                    var marker = new TreeWalker(function(node) {
                    });
                }
            }
            if (node instanceof AST_Do) {
                segment.block = node;
                segment.loop = true;
                var save = segment;
                if (segment.inserted === node) segment = save;
            }
            if (node instanceof AST_For) {
                segment.block = node;
                segment.loop = true;
            }
            if (node instanceof AST_ForIn) {
                segment.block = node;
                segment.loop = true;
            }
            if (node instanceof AST_LabeledStatement) {
                segment.block = node;
                var save = segment;
                if (segment.inserted === node) segment = save;
            }
            if (node instanceof AST_Scope) {
                segment.block = node;
                if (node === self) root = segment;
                if (node instanceof AST_Lambda) {
                    if (node.name) references[node.name.definition().id] = false;
                    var marker = node.uses_arguments && !tw.has_directive("use strict") ? function(node) {
                        if (node instanceof AST_SymbolFunarg) references[node.definition().id] = false;
                    } : function(node) {
                    var scanner = new TreeWalker(function(ref) {
                        if (ref instanceof AST_SymbolDeclaration) references[ref.definition().id] = false;
                        var def = ref.definition();
                        var ldef = node.variables.get(ref.name);
                            || node.parent_scope.find_variable(ref.name) === def)) {
                            references[def.id] = false;
                            references[ldef.id] = false;
                        } else {
                            var save = segment;
                            segment = save;
                        }
                    });
                }
            }
            if (node instanceof AST_Switch) {
                var save = segment;
                segment = save;
                node.body.forEach(function(branch) {
                    segment.block = node;
                    var save = segment;
                    if (segment.inserted === node) segment = save;
                });
            }
            if (node instanceof AST_Try) {
                segment.block = node;
                if (node.bcatch) {
                    if (node.bcatch.argname) node.bcatch.argname.mark_symbol(function(node) {
                        if (node instanceof AST_SymbolCatch) {
                            var def = node.definition();
                            references[def.id] = false;
                            if (def = def.redefined()) references[def.id] = false;
                        }
                    }, tw);
                    if (node.bfinally) segment.block = node.bcatch;
                }
            }
            if (node instanceof AST_VarDef) {
                node.name.mark_symbol(node.value ? function(node) {
                    } else {
                        references[node.definition().id] = false;
                    }
                } : function(node) {
                    var id = node.definition().id;
                    if (!(node instanceof AST_SymbolVar)) {
                        references[id] = false;
                    } else if (!(id in references)) {
                }, tw);
            }
            if (node instanceof AST_While) {
                segment.block = node;
                segment.loop = true;
            }
        });
        tw.directives = Object.create(compressor.directives);
        function push() {
            segment = Object.create(segment);
        }
        function pop() {
            segment = Object.getPrototypeOf(segment);
        }
        function mark(sym, read, write) {
            var def = sym.definition(), ldef;
            if (def.id in references) {
                var refs = references[def.id];
                if (!refs) return;
                if (refs.start.block !== segment.block) return references[def.id] = false;
                refs.push(sym);
                refs.end = segment;
            } else if ((ldef = self.variables.get(def.name)) !== def) {
                if (ldef && root === segment) references[ldef.id] = false;
                return references[def.id] = false;
            } else if (compressor.exposed(def) || sym.name == "arguments") {
                return references[def.id] = false;
            }
        }
    });
})(function(node, optimizer) {
