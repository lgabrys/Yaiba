function Compressor(options, false_by_default) {
    var pure_funcs = this.options["pure_funcs"];
    if (typeof pure_funcs == "function") {
        this.pure_funcs = pure_funcs;
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            return pure_funcs !== node.expression.print_to_string();
        };
    } else if (Array.isArray(pure_funcs)) {
    } else {
        this.pure_funcs = return_true;
    }
    var sequences = this.options["sequences"];
    this.sequences_limit = sequences == 1 ? 800 : sequences | 0;
    var top_retain = this.options["top_retain"];
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
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
        def(AST_Accessor, function(tw, descend, compressor) {
        });
        def(AST_Assign, function(tw, descend, compressor) {
            if (!(sym instanceof AST_SymbolRef)) {
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
        function collapse(statements, compressor) {
            function extract_candidates(expr) {
                } else if (expr instanceof AST_Assign) {
                    if (expr.left instanceof AST_SymbolRef) {
                    }
                } else if (expr instanceof AST_Binary) {
            }
        }
    }
    function convert_to_predicate(obj) {
    }
    var native_fns = convert_to_predicate({
    });
    (function(def) {
        function modified(node) {
        }
        def(AST_UnaryPostfix, function(compressor, ignore_side_effects, cached, depth) {
            var e = this.expression;
            modified(e);
        });
        var non_converting_binary = makePredicate("&& || === !==");
        def(AST_Binary, function(compressor, ignore_side_effects, cached, depth) {
            if (!non_converting_binary[this.operator]) depth++;
            var left = this.left._eval(compressor, ignore_side_effects, cached, depth);
            var right = this.right._eval(compressor, ignore_side_effects, cached, depth);
            var result;
            switch (this.operator) {
              case "&&" : result = left &&  right; break;
              case "||" : result = left ||  right; break;
              case "|"  : result = left |   right; break;
              case "&"  : result = left &   right; break;
              case "^"  : result = left ^   right; break;
              case "+"  : result = left +   right; break;
              case "*"  : result = left *   right; break;
              case "/"  : result = left /   right; break;
              case "%"  : result = left %   right; break;
              case "-"  : result = left -   right; break;
              case "<<" : result = left <<  right; break;
              case ">>" : result = left >>  right; break;
              case ">>>": result = left >>> right; break;
              case "==" : result = left ==  right; break;
              case "===": result = left === right; break;
              case "!=" : result = left !=  right; break;
              case "!==": result = left !== right; break;
              case "<"  : result = left <   right; break;
              case "<=" : result = left <=  right; break;
              case ">"  : result = left >   right; break;
              case ">=" : result = left >=  right; break;
            }
        });
    })(function(node, func) {
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var self = this;
        var drop_vars = !(self instanceof AST_Toplevel) || compressor.toplevel.vars;
        var assign_as_unused = /keep_assign/.test(compressor.option("unused")) ? return_false : function(node, props) {
        };
        var assign_in_use = Object.create(null);
        var in_use_ids = Object.create(null); // avoid expensive linear scans of in_use
        if (self instanceof AST_Toplevel && compressor.top_retain) {
            self.variables.each(function(def) {
                if (compressor.top_retain(def) && !(def.id in in_use_ids)) {
                    in_use_ids[def.id] = true;
                }
            });
        }
        var assignments = new Dictionary();
        var tw = new TreeWalker(function(node, descend) {
            if (node instanceof AST_Lambda && node.uses_arguments && !tw.has_directive("use strict")) {
                node.argnames.forEach(function(argname) {
                    var def = argname.definition();
                    if (!(def.id in in_use_ids)) {
                        in_use_ids[def.id] = true;
                    }
                });
            }
            if (node instanceof AST_Defun) {
                var node_def = node.name.definition();
                if (!drop_funcs && scope === self) {
                    if (!(node_def.id in in_use_ids)) {
                        in_use_ids[node_def.id] = true;
                    }
                }
            }
            if (node instanceof AST_Definitions && scope === self) {
                node.definitions.forEach(function(def) {
                    var node_def = def.name.definition();
                    if (!drop_vars) {
                        if (!(node_def.id in in_use_ids)) {
                            in_use_ids[node_def.id] = true;
                        }
                    }
                });
            }
        });
        tw = new TreeWalker(scan_ref_scoped);
        Object.keys(assign_in_use).forEach(function(id) {
            var in_use = (assignments.get(id) || []).filter(function(node) {
            });
            if (assigns.length == in_use.length) {
                assign_in_use[id] = in_use;
            } else {
        });
        var tt = new TreeTransformer(function(node, descend, in_list) {
            var parent = tt.parent();
            if (drop_vars) {
                var props = [], sym = assign_as_unused(node, props);
                if (sym) {
                    var def = sym.definition();
                }
            }
            if (node instanceof AST_Lambda) {
                if (drop_funcs && node !== self && node instanceof AST_Defun) {
                    var def = node.name.definition();
                    if (!(def.id in in_use_ids)) {
                        def.eliminated++;
                    }
                }
                if (!(node instanceof AST_Accessor)) {
                    for (var a = node.argnames, i = a.length; --i >= 0;) {
                        var sym = a[i];
                        if (!(sym.definition().id in in_use_ids)) {
                            sym.__unused = true;
                        } else {
                    }
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForIn && parent.init === node)) {
                var body = [], head = [], tail = [];
                var side_effects = [];
                var duplicated = 0;
                node.definitions.forEach(function(def) {
                    if (def.value) def.value = def.value.transform(tt);
                    var sym = def.name.definition();
                    if (!drop_vars || sym.id in in_use_ids) {
                        if (def.value && indexOf_assign(sym, def) < 0) {
                            def.value = def.value.drop_side_effect_free(compressor);
                            if (def.value) def.value.tail_node().write_only = false;
                        }
                        if (!def.value) {
                            if (var_defs.length > 1) {
                                sym.eliminated++;
                            } else {
                        } else if (compressor.option("functions")
                        } else {
                            if (var_defs.length > 1 && sym.orig.indexOf(def.name) > sym.eliminated) {
                                duplicated++;
                            }
                            if (side_effects.length > 0) {
                                if (tail.length > 0) {
                                    side_effects.push(def.value);
                                    def.value = make_sequence(def.value, side_effects);
                                } else {
                                    body.push(make_node(AST_SimpleStatement, node, {
                                        body: make_sequence(node, side_effects)
                                    }));
                                }
                                side_effects = [];
                            }
                        }
                    } else if (sym.orig[0] instanceof AST_SymbolCatch) {
                        if (var_defs.length > 1) {
                            sym.eliminated++;
                        } else {
                            def.value = null;
                        }
                    } else {
                        sym.eliminated++;
                    }
                });
                if (head.length == 0 && tail.length == duplicated) {
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
                } else if (head.length > 0 || tail.length > 0) {
            }
        });
    });
})(function(node, optimizer) {
