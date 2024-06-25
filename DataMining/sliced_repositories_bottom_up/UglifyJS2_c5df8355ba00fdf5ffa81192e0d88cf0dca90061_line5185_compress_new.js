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
    } else if (top_retain) {
        if (typeof top_retain == "string") {
            top_retain = top_retain.split(/,/);
        }
        this.top_retain = function(def) {
        };
    }
    var toplevel = this.options["toplevel"];
    } : {
        vars: toplevel
    };
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    compress: function(node) {
        node = node.resolve_defines(this);
        var passes = +this.options.passes || 1;
        var min_count = 1 / 0;
        var stopping = false;
        var mangle = { ie8: this.option("ie8") };
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
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
        }
        var opt = node.optimize(this);
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
            descend(opt, this);
        }
        if (opt === node) opt._squeezed = true;
    }
});
(function(OPT) {
    OPT(AST_Node, function(self, compressor) {
    });

    AST_Scope.DEFMETHOD("process_expression", function(insert, transform) {
        var self = this;
        var tt = new TreeTransformer(function(node) {
            if (insert && node instanceof AST_SimpleStatement) {
            }
            if (node instanceof AST_Lambda && node !== self) {
                return node;
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
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
        }
        if (parent instanceof AST_PropAccess) {
            if (parent.expression !== node) return;
        }
    }
    function is_arguments(def) {
        if (def.name != "arguments") return false;
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
            if (def.fixed instanceof AST_Defun && !all(def.references, function(ref) {
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
                    mark(tw, def);
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
        function mark(tw, def) {
            tw.safe_ids[def.id] = {};
        }
        function safe_to_read(tw, def) {
            if (safe) {
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
        function mark_escaped(tw, d, scope, node, value, level, depth) {
            var parent = tw.parent(level);
            if (has_escaped(d, node, parent)) {
                if (depth > 1 && !(value && value.is_constant_expression(scope))) depth = 1;
                if (!d.escaped.depth || d.escaped.depth > depth) d.escaped.depth = depth;
            } else if (value_in_use(node, parent)) {
            } else if (parent instanceof AST_ObjectKeyVal && parent.value === node) {
                var obj = tw.parent(level + 1);
                mark_escaped(tw, d, scope, obj, obj, level + 2, depth);
            } else if (parent instanceof AST_PropAccess && parent.expression === node) {
                value = read_property(value, parent);
            }
            if (parent instanceof AST_SimpleStatement) return;
            d.direct_access = true;
        }
        function mark_assignment_to_arguments(node) {
            var expr = node.expression;
        }
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var eq = node.operator == "=";
            var sym = node.left;
            if (eq && sym.equivalent_to(node.right) && !sym.has_side_effects(compressor)) {
                node.__drop = true;
            }
            var d = sym.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (is_modified(compressor, tw, node, value, 0)) {
                d.fixed = false;
            }
            var safe = eq || safe_to_read(tw, d);
            if (safe && safe_to_assign(tw, d)) {
                if (eq) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    sym.fixed = d.fixed = function() {
                    };
                } else {
                    if (d.single_use) d.single_use = false;
                    sym.fixed = d.fixed = function() {
                    };
                }
                sym.fixed.assigns = eq || !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
            } else {
                d.fixed = false;
            }
        });
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
        def(AST_Unary, function(tw, descend) {
            var node = this;
            var exp = node.expression;
            var d = exp.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (safe_to_read(tw, d) && safe_to_assign(tw, d)) {
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
    })(function(node, func) {
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    }
    function make_sequence(orig, expressions) {
        return make_node(AST_Sequence, orig, {
            expressions: expressions.reduce(merge_sequence, [])
        });
    }
    function make_node_from_constant(val, orig) {
        switch (typeof val) {
          case "string":
        }
    }
    function merge_sequence(array, node) {
    }
    function is_empty(thing) {
    }
    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
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
            function is_last_node(node, parent) {
                if (node instanceof AST_Exit) {
                    if (in_try) {
                        if (in_try.bcatch && node instanceof AST_Throw) return true;
                    }
                }
            }
        }
    }
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var tt = new TreeTransformer(function(node, descend, in_list) {
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                var body = [], head = [], tail = [];
                switch (head.length) {
                  case 0:
                    if (tail.length == 0) break;
                    if (tail.length == duplicated) {
                        [].unshift.apply(side_effects, tail.map(function(def) {
                            AST_Node.warn("Dropping duplicated definition of variable {name} [{file}:{line},{col}]", template(def.name));
                            var sym = def.name.definition();
                            var ref = make_node(AST_SymbolRef, def.name, def.name);
                            sym.references.push(ref);
                            var assign = make_node(AST_Assign, def, {
                                operator: "=",
                                left: ref,
                                right: def.value
                            });
                            var index = indexOf_assign(sym, def);
                            if (index >= 0) assign_in_use[sym.id][index] = assign;
                            sym.eliminated++;
                            return assign;
                        }));
                        break;
                    }
                  case 1:
                    if (tail.length == 0) {
                        var id = head[0].name.definition().id;
                        if (id in for_ins) {
                            node.definitions = head;
                            for_ins[id].init = node;
                            break;
                        }
                    }
                  default:
                    node.definitions = head.concat(tail);
                    body.push(node);
                }
            }
            if (node instanceof AST_LabeledStatement && node.body instanceof AST_For) {
                if (node.body instanceof AST_BlockStatement) {
                    var block = node.body;
                    node.body = block.body.pop();
                }
            }
        }, function(node, in_list) {
            } else if (node instanceof AST_For) {
                var block;
                if (node.init instanceof AST_BlockStatement) {
                    block = node.init;
                    node.init = block.body.pop();
                }
                if (node.init instanceof AST_Defun) {
                    if (!block) {
                        block = make_node(AST_BlockStatement, node, {
                        });
                    }
                    node.init = null;
                } else if (node.init instanceof AST_SimpleStatement) {
                    node.init = node.init.body;
                } else if (is_empty(node.init)) {
                    node.init = null;
                }
            } else if (node instanceof AST_ForIn) {
                var sym = node.init;
                if (sym instanceof AST_Definitions) {
                    sym = sym.definitions[0].name;
                } else while (sym instanceof AST_PropAccess) {
                    sym = sym.expression.tail_node();
                }
                var def = sym.definition();
                if (def.scope !== self && self.find_variable(sym) === def) return;
            } else if (node instanceof AST_Sequence) {
        });
    });
})(function(node, optimizer) {
