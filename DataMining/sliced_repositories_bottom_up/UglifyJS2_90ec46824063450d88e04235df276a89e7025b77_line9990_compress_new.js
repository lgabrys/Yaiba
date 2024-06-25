function Compressor(options, false_by_default) {
    } else {
    }
    var top_retain = this.options["top_retain"];
    } else if (typeof top_retain == "function") {
        this.top_retain = top_retain;
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
        return !all(def.orig, function(sym) {
        });
    },
    compress: function(node) {
        node = node.resolve_defines(this);
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
        if (this.option("expression")) {
            node.process_expression(false);
        }
    },
    before: function(node, descend, in_list) {
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
            node.process_boolean_returns(this);
        }
        // would call AST_Node.transform() if a different instance of AST_Node is
        // Existing code relies on how AST_Node.optimize() worked, and omitting the
        var opt = node.optimize(this);
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
        }
        if (opt === node) opt._squeezed = true;
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
    });
    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var tt = new TreeTransformer(function(node) {
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

    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (parent instanceof AST_ObjectKeyVal) {
        }
    }
    function is_arguments(def) {
        return def.name == "arguments" && def.scope.uses_arguments;
    }
    function cross_scope(def, sym) {
        do {
            if (def === sym) return false;
        } while (sym = sym.parent_scope);
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
            if (is_defun(def.fixed) && !all(def.references, function(ref) {
                var scope = ref.scope.resolve();
                do {
                    if (def.scope === scope) return true;
                } while (is_function(scope) && (scope = scope.parent_scope.resolve()));
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
        }
        function mark_defun(tw, def) {
            if (def.id in tw.defun_ids) {
                var marker = tw.defun_ids[def.id];
                if (!marker) return;
                var visited = tw.defun_visited[def.id];
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
        function push(tw) {
            tw.safe_ids = Object.create(tw.safe_ids);
        }
        function push_ref(def, ref) {
            if (def.last_ref !== false) def.last_ref = ref;
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
        function value_in_use(node, parent) {
            if (parent instanceof AST_Conditional) return parent.condition !== node;
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    push(tw);
                    var save = fixed;
                    if (save) fixed = function() {
                    };
                    fixed = save;
                }
                if (node instanceof AST_DestructuredArray) {
                    var save = fixed;
                    if (node.rest) {
                        if (save) fixed = compressor.option("rests") && function() {
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
        def(AST_Do, function(tw) {
            var saved_loop = tw.in_loop;
            tw.in_loop = this;
            tw.in_loop = saved_loop;
        });
    })(function(node, func) {
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (is_function(fn)
                    && (iife = compressor.parent()) instanceof AST_Call
                    })) {
                    var has_await = is_async(fn) ? function(node) {
                    } : function(node) {
                    };
                }
            }
        }
        function handle_if_return(statements, compressor) {
            for (var i = statements.length; --i >= 0;) {
                var stat = statements[i];
                var j = next_index(i);
                var next = statements[j];
                if (in_lambda && !next && stat instanceof AST_Return) {
                    if (tail instanceof AST_UnaryPrefix && tail.operator == "void") {
                        statements[i] = make_node(AST_SimpleStatement, stat, {
                        });
                    }
                }
                if (stat instanceof AST_If) {
                    if (can_merge_flow(ab)) {
                        stat = stat.clone();
                        stat.condition = stat.condition.negate(compressor);
                        stat.body = make_node(AST_BlockStatement, stat, {
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat, {
                        });
                        statements[i] = stat;
                        statements[i] = stat.transform(compressor);
                    }
                    if (ab && !stat.alternative && stat.body instanceof AST_BlockStatement && next instanceof AST_Jump) {
                        var negated = stat.condition.negate(compressor);
                        if (negated.print_to_string().length <= stat.condition.print_to_string().length) {
                            stat = stat.clone();
                            stat.condition = negated;
                            statements[j] = stat.body;
                            stat.body = next;
                            statements[i] = stat;
                            statements[i] = stat.transform(compressor);
                        }
                    }
                    if (can_merge_flow(alt)) {
                        stat = stat.clone();
                        stat.body = make_node(AST_BlockStatement, stat.body, {
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
                        });
                        statements[i] = stat;
                        statements[i] = stat.transform(compressor);
                    }
                }
                if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                        && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
                        statements[i] = make_node(AST_SimpleStatement, stat.condition, {
                        });
                    }
                    if (!stat.alternative && next instanceof AST_Return) {
                        stat = stat.clone();
                        stat.alternative = next;
                    }
                    if (!stat.alternative && !next && in_lambda && (in_bool || value && multiple_if_returns)) {
                        stat = stat.clone();
                        stat.alternative = make_node(AST_Return, stat, {
                        });
                    }
                        && next_index(j) == statements.length && next instanceof AST_SimpleStatement) {
                        stat = stat.clone();
                        stat.alternative = make_node(AST_BlockStatement, next, {
                            body: [
                                make_node(AST_Return, next, {
                                })
                            ]
                        });
                    }
                }
            }
            function has_multiple_if_returns(statements) {
            }
            function extract_functions() {
                statements.length = i + 1;
            }
            function next_index(i) {
            }
        }
    }
    function is_undefined(node, compressor) {
    }

    (function(def) {
        def(AST_Binary, function(compressor) {
            if (this.operator != "+") return false;
        });
    })(function(node, func) {
    var lazy_op = makePredicate("&& ||");
    function best_of(compressor, ast1, ast2, threshold) {
    }
    function try_evaluate(compressor, node) {
    }
    function repeatable(compressor, node) {
    }
    OPT(AST_Binary, function(self, compressor) {
        function reversible() {
        }
        function reverse(op) {
            if (reversible()) {
                if (op) self.operator = op;
                var tmp = self.left;
                self.left = self.right;
                self.right = tmp;
            }
        }
        function swap_chain() {
            var rhs = self.right;
            self.left = make_node(AST_Binary, self, {
            });
            self.right = rhs.right;
            self.left = self.left.transform(compressor);
        }
        if (compressor.option("assignments") && lazy_op[self.operator]) {
            var assign = self.right;
                && self.left.equivalent_to(assign.left)) {
                self.right = assign.right;
                assign.right = self;
            }
        }
        if (compressor.option("comparisons")) switch (self.operator) {
            var is_strict_comparison = true;
                repeatable(compressor, self.left) && self.left.equivalent_to(self.right)) {
                self.operator = self.operator.slice(0, 2);
            }
            if (!is_strict_comparison && is_undefined(self.left, compressor)) {
                self.left = make_node(AST_Null, self.left);
            }
                && self.right.operator == "typeof") {
                var expr = self.right.expression;
                    : !(expr instanceof AST_PropAccess && compressor.option("ie8"))) {
                    self.right = expr;
                    self.left = make_node(AST_Undefined, self.left).optimize(compressor);
                    if (self.operator.length == 2) self.operator += "=";
                }
            }
            var lhs = self.left;
            if (lhs.operator == self.operator) {
                lhs = lhs.right;
            }
        }
        var in_bool = compressor.option("booleans") && compressor.in_boolean_context();
        if (in_bool) switch (self.operator) {
            var rr = self.right.evaluate(compressor);
        }
        if (compressor.option("strings") && self.operator == "+") {
                && self.right.is_string(compressor)) {
                self.left = self.left.right;
            }
        }
        if (compressor.option("evaluate")) {
            switch (self.operator) {
                var rr = self.right.evaluate(compressor);
                if (!rr) {
                    if (in_bool) {
                    } else self.falsy = true;
                } else if (!(rr instanceof AST_Node)) {
                var rr = self.right.evaluate(compressor);
                } else if (!(rr instanceof AST_Node)) {
                    if (in_bool) {
                    } else self.truthy = true;
                }
                    && self.right.is_string(compressor)) {
                    self = make_node(AST_Binary, self, {
                    });
                }
                    && self.left.is_string(compressor)) {
                    self = make_node(AST_Binary, self, {
                    });
                }
                    && self.left.is_number(compressor)) {
                    self = make_node(AST_Binary, self, {
                    });
                }
                    && self.right.is_number(compressor)) {
                    self = make_node(AST_Binary, self, {
                    });
                }
                    && (self.left.left.is_boolean(compressor) || self.left.left.is_number(compressor))) {
                    self = make_node(AST_Binary, self, {
                    });
                }
                    && self.right.expression.is_number(compressor)) {
                    self = make_node(AST_Binary, self, {
                    });
                }
                if (self.operator != "+") [ "left", "right" ].forEach(function(operand) {
                    var node = self[operand];
                    if (node instanceof AST_UnaryPrefix && node.operator == "+") {
                        var exp = node.expression;
                        if (exp.is_boolean(compressor) || exp.is_number(compressor) || exp.is_string(compressor)) {
                            self[operand] = exp;
                        }
                    }
                });
                        && PRECEDENCE[self.left.operator] >= PRECEDENCE[self.operator])) {
                    var reversed = make_node(AST_Binary, self, {
                    });
                        && !(self.left instanceof AST_Constant)) {
                        self = best_of(compressor, reversed, self);
                    } else {
                        self = best_of(compressor, self, reversed);
                    }
                }
                    && !is_modify_array(self.right.right)) {
                    self = make_node(AST_Binary, self, {
                    });
                        && !self.right.is_number(compressor)) {
                        self.right = make_node(AST_UnaryPrefix, self.right, {
                        });
                    }
                }
                    && self.left.is_number(compressor)) {
                    if (self.left.left instanceof AST_Constant) {
                        var lhs = make_binary(self.left, self.operator, self.left.left, self.right, self.left.left.start, self.right.end);
                        self = make_binary(self, self.left.operator, try_evaluate(compressor, lhs), self.left.right);
                    } else if (self.left.right instanceof AST_Constant) {
                        var op = align(self.left.operator, self.operator);
                        var rhs = try_evaluate(compressor, make_binary(self.left, op, self.left.right, self.right));
                                && self.left.left.is_negative_zero())) {
                            self = make_binary(self, self.left.operator, self.left.left, rhs);
                        }
                    }
                }
            }
        }
        function is_modify_array(node) {
        }
        function align(ref, op) {
        }
        function make_binary(orig, op, left, right, start, end) {
            if (op == "+") {
                if (!left.is_boolean(compressor) && !left.is_number(compressor)) {
                    left = make_node(AST_UnaryPrefix, left, {
                    });
                }
                if (!right.is_boolean(compressor) && !right.is_number(compressor)) {
                    right = make_node(AST_UnaryPrefix, right, {
                    });
                }
            }
        }
    });
    OPT(AST_Assign, function(self, compressor) {
        if (compressor.option("dead_code")) {
            })) {
                var parent;
                if (self.operator == "=" && self.left.equivalent_to(self.right)
                    && !((parent = compressor.parent()) instanceof AST_UnaryPrefix && parent.operator == "delete")) {
                }
                parent = compressor.self();
            }
        }
    });
})(function(node, optimizer) {
