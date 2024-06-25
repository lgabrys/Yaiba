function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
        this.pure_funcs = pure_funcs;
    } else if (typeof pure_funcs == "string") {
    } else {
        this.pure_funcs = return_true;
    }
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
            return member(def.name, top_retain);
        };
    }
    } : {
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
        for (var pass = 0; pass < passes; pass++) {
            if (pass > 0 || this.option("reduce_vars"))
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
                    break;
                } else {
                    stopping = true;
                }
            }
        }
    },
    before: function(node, descend, in_list) {
        // produced after OPT().
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
                        operator: "void",
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
            return node;
        });
    });
    function read_property(obj, node) {
        var key = node.getProperty();
        if (obj instanceof AST_Array) {
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
            key = "" + key;
        }
    }
    function is_read_only_fn(value, name) {
        if (value instanceof AST_String) return native_fns.String[name];
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (!immutable
            && parent instanceof AST_Call
                || !(parent instanceof AST_New) && value.contains_this())) {
    }

    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.scope.pinned()
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
        function mark(tw, def) {
            tw.safe_ids[def.id] = {};
        }
        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var eq = node.operator == "=";
            var sym = node.left;
            if (eq && sym.equivalent_to(node.right) && !sym.has_side_effects(compressor)) {
                walk_prop(sym);
                node.__drop = true;
            }
            var d = sym.definition();
            d.assignments++;
            var fixed = d.fixed;
            if (is_modified(compressor, tw, node, value, 0)) {
                d.fixed = false;
            }
            if (safe && safe_to_assign(tw, d)) {
                if (eq) {
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
            function walk_prop(node) {
                } else if (node instanceof AST_SymbolRef) {
                    var d = node.definition();
                    node.fixed = d.fixed;
                } else {
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
    function is_empty(thing) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function extract_args() {
                var iife, fn = compressor.self();
                if (fn instanceof AST_Function
                    && (iife = compressor.parent()) instanceof AST_Call
                    && iife.expression === fn) {
                    var fn_strict = compressor.has_directive("use strict");
                    if (fn_strict && !member(fn_strict, fn.body)) fn_strict = false;
                    var len = fn.argnames.length;
                    for (var i = len; --i >= 0;) {
                        var sym = fn.argnames[i];
                        var arg = iife.args[i];
                        if (!arg) {
                            arg = make_node(AST_Undefined, sym).transform(compressor);
                        } else if (arg instanceof AST_Lambda && arg.pinned()) {
                            arg = null;
                        } else {
                            arg.walk(new TreeWalker(function(node) {
                                if (!arg) return true;
                                if (node instanceof AST_SymbolRef && fn.variables.has(node.name)) {
                                    arg = null;
                                }
                                if (node instanceof AST_This && (fn_strict || !this.find_parent(AST_Scope))) {
                                    arg = null;
                                }
                            }));
                        }
                    }
                }
            }
        }
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var tt = new TreeTransformer(function(node, descend, in_list) {
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                var body = [], head = [], tail = [];
                } else if (head.length > 0 || tail.length > 0) {
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
            if (node instanceof AST_For) {
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
                if (def.scope !== self && member(def, self.enclosed)) return;
            } else if (node instanceof AST_Sequence) {
        });
    });
})(function(node, optimizer) {
