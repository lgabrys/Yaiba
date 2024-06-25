function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            var expr;
            if (node instanceof AST_Call) {
                expr = node.expression;
            } else if (node instanceof AST_Template) {
                expr = node.tag;
            }
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
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
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
        if (!(def.global || def.scope.resolve() instanceof AST_Toplevel)) return false;
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        if (this.option("expression")) {
            node.process_expression(true);
        }
        var passes = +this.options.passes || 1;
        var min_count = 1 / 0;
        var stopping = false;
        for (var pass = 0; pass < passes; pass++) {
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
    },
    before: function(node, descend, in_list) {
        if (node._squeezed) return node;
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
            node.hoist_properties(this);
        }
        // This corrupts TreeWalker.stack, which cause AST look-ups to malfunction.
        var opt = node.optimize(this);
        if (opt === node) opt._squeezed = true;
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
                if (stat instanceof AST_Definitions) {
                } else {
            } else if (stat instanceof AST_ExportReferences) {
                body.splice(i--, 1);
            }
        }
        function export_symbol(sym) {
            var node = make_node(AST_SymbolExport, sym, sym);
            node.alias = node.name;
        }
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
            if (!insert && node instanceof AST_Return) {
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
        if (value instanceof AST_Array) return native_fns.Array[name];
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
            return;
        }
        if (parent instanceof AST_Call) {
                && (!(value instanceof AST_LambdaExpression) || !(parent instanceof AST_New) && value.contains_this());
        }
        if (parent instanceof AST_PropAccess) {
        }
    }

    function cross_scope(def, sym) {
        do {
            if (def === sym) return false;
        } while (sym = sym.parent_scope);
    }
    function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.definition();
        return all(def.orig, function(sym) {
            if (sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet) {
                return compressor && can_varify(compressor, sym);
            }
        });
    }
    function has_escaped(d, scope, node, parent) {
        if (parent instanceof AST_Call) return parent.expression !== node || parent instanceof AST_New;
    }
    (function(def) {
        def(AST_Node, noop);
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
            def.reassigned = 0;
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }
        function walk_defuns(tw, scope) {
            scope.functions.each(function(def) {
                if (def.init instanceof AST_LambdaDefinition && !tw.defun_visited[def.id]) {
                    tw.defun_ids[def.id] = tw.safe_ids;
                }
            });
        }
        function pop(tw) {
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
        function is_immutable(value) {
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DestructuredArray) {
                    reset_flags(node);
                }
                if (node instanceof AST_DestructuredObject) {
                    node.properties.forEach(function(node) {
                        if (save) fixed = function() {
                            return make_node(type, node, {
                            });
                        };
                    });
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
            var right = node.right;
            switch (node.operator) {
                if (left.equivalent_to(right) && !left.has_side_effects(compressor)) {
                    node.__drop = true;
                }
                var d = left.definition();
                d.assignments++;
                var fixed = d.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    d.fixed = false;
                }
                var safe = safe_to_read(tw, d);
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
                var modified = is_modified(compressor, tw, node, right, 0, is_immutable(right), recursive_ref(tw, d));
                scan_declaration(tw, compressor, left, function() {
                }, function(sym, fixed, walk) {
                    var d = sym.definition();
                    d.assignments++;
                    if (fixed && !modified && !sym.in_arg && safe_to_assign(tw, d)) {
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
        def(AST_Call, function(tw, descend) {
            var exp = this.expression;
            if (exp instanceof AST_LambdaExpression) {
                var iife = is_iife_single(this);
                this.args.forEach(function(arg) {
                    if (arg instanceof AST_Spread) iife = false;
                });
                if (iife) exp.reduce_vars = reduce_iife;
            }
            if (exp instanceof AST_SymbolRef) {
                var def = exp.definition();
                if (this.TYPE == "Call" && tw.in_boolean_context()) def.bool_fn++;
            } else if (this.TYPE == "Call"
                && tw.in_boolean_context()) {
                exp.left.definition().bool_fn++;
            }
        });
        def(AST_Conditional, function(tw) {
            this.consequent.walk(tw);
        });
        def(AST_For, function(tw, descend, compressor) {
            return true;
        });
        def(AST_ForEnumeration, function(tw, descend, compressor) {
            this.object.walk(tw);
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
        def(AST_Lambda, function(tw, descend, compressor) {
            var fn = this;
            fn.inlined = false;
            walk_defuns(tw, fn);
        });
        def(AST_Switch, function(tw, descend, compressor) {
            walk_body(this, tw);
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
                    return make_node(AST_Binary, node, {
                        left: make_node(AST_UnaryPrefix, node, {
                            operator: "+",
                        }),
                    });
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
    function reset_flags(node) {
        node._squeezed = false;
        node._optimized = false;
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
    function has_declarations_only(block) {
    }
    function is_iife_single(call) {
    }
    function is_declaration(stat, lexical) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            var scanner = new TreeTransformer(function(node, descend) {
                if (node instanceof AST_DefaultValue) {
                    node.name = node.name.transform(scanner);
                    node.value = node.value.transform(scanner);
                }
            }, signal_abort);
            function signal_abort(node) {
            }
            function find_stop_expr(expr, cont, node, parent, level) {
                var stack = scanner.stack;
                scanner.stack = [ parent ];
                scanner.stack = stack;
            }
            function find_stop_value(node, level) {
                var parent = scanner.parent(level);
                if (parent instanceof AST_Assign) {
                    if (parent.left.match_symbol(function(ref) {
                    })) return node;
                }
            }
        }
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    OPT(AST_Switch, function(self, compressor) {
        var body = [];
        var branch;
        var default_branch;
        var exact_match;
        var side_effects = [];
        for (var i = 0, len = self.body.length; i < len && !exact_match; i++) {
            branch = self.body[i];
            if (branch instanceof AST_Default) {
                var prev = body[body.length - 1];
                } else {
                    default_branch = branch;
                }
            } else {
                var equals = make_node(AST_Binary, self, {
                }).evaluate(compressor, true);
                if (!(equals instanceof AST_Node)) {
                    exact_match = branch;
                    if (default_branch) {
                        default_branch = null;
                    }
                }
            }
            if (exact_match || i == len - 1 || aborts(branch)) {
                var prev = body[body.length - 1];
                var statements = branch.body;
                if (aborts(prev)) switch (prev.body.length - statements.length) {
                    var stat = prev.body[prev.body.length - 1];
                    statements = statements.concat(stat);
                    var prev_block = make_node(AST_BlockStatement, prev, prev);
                    var next_block = make_node(AST_BlockStatement, branch, { body: statements });
                    if (prev_block.equivalent_to(next_block)) prev.body = [];
                }
            }
            if (side_effects.length) {
                if (branch instanceof AST_Default) {
                    body.push(make_node(AST_Case, self, { expression: make_sequence(self, side_effects), body: [] }));
                } else {
                    side_effects.push(branch.expression);
                    branch.expression = make_sequence(self, side_effects);
                }
                side_effects = [];
            }
        }
        while (i < len) eliminate_branch(self.body[i++], body[body.length - 1]);
        while (branch = body[body.length - 1]) {
            var stat = branch.body[branch.body.length - 1];
            if (is_break(stat, compressor)) branch.body.pop();
            if (branch === default_branch) {
                if (!has_declarations_only(branch)) break;
            } else if (branch.expression.has_side_effects(compressor)) {
                break;
            } else if (default_branch) {
                if (!has_declarations_only(default_branch)) break;
                if (body[body.length - 2] !== default_branch) break;
                default_branch.body = default_branch.body.concat(branch.body);
                branch.body = [];
            } else if (!has_declarations_only(branch)) break;
            eliminate_branch(branch);
            if (body.pop() === default_branch) default_branch = null;
        }
        if (branch === default_branch || branch === exact_match && !branch.expression.has_side_effects(compressor)) {
        }
    });
})(function(node, optimizer) {
