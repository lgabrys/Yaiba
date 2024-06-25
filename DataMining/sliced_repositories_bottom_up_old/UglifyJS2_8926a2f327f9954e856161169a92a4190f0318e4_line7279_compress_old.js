function Compressor(options, false_by_default) {
    } else if (typeof pure_funcs == "string") {
        this.pure_funcs = function(node) {
            if (node instanceof AST_Call) {
            } else if (node instanceof AST_Template) {
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
    if (top_retain instanceof RegExp) {
        this.top_retain = function(def) {
        };
    } else if (typeof top_retain == "function") {
}
merge(Compressor.prototype, {
    exposed: function(def) {
        if (def.undeclared) return true;
    },
    compress: function(node) {
        if (this.option("expression")) {
        }
        for (var pass = 0; pass < passes; pass++) {
            if (passes > 1) {
                } else if (stopping) {
                } else {
                }
            }
        }
    },
    before: function(node, descend, in_list) {
        var is_scope = node instanceof AST_Scope;
        if (is_scope) {
        }
        // produced after OPT().
        descend(node, this);
        if (is_scope && opt === node && !this.has_directive("use asm") && !opt.pinned()) {
        }
    }
});
(function(OPT) {
    AST_Toplevel.DEFMETHOD("hoist_exports", function(compressor) {
        var body = this.body, props = [];
        for (var i = 0; i < body.length; i++) {
            var stat = body[i];
            if (stat instanceof AST_ExportDeclaration) {
                body[i] = stat = stat.body;
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
            if (insert && node instanceof AST_SimpleStatement) {
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
        } else if (obj instanceof AST_Lambda) {
            if (key == "length") {
                obj.length_read = true;
            }
        } else if (obj instanceof AST_Object) {
            for (var i = props.length; --i >= 0;) {
            }
        }
    }
    function is_read_only_fn(value, name) {
        if (name == "valueOf") return false;
    }
    function is_modified(compressor, tw, node, value, level, immutable, recursive) {
        var parent = tw.parent(level);
        if (compressor.option("unsafe") && parent instanceof AST_Dot && is_read_only_fn(value, parent.property)) {
        }
        if (parent instanceof AST_Call) {
                && !parent.is_expr_pure(compressor)
        }
        if (parent instanceof AST_PropAccess) {
            var prop = read_property(value, parent);
            return (!immutable || recursive) && is_modified(compressor, tw, parent, prop, level + 1);
        }
    }
    function is_arguments(def) {
    }
    function cross_scope(def, sym) {
        do {
        } while (sym = sym.parent_scope);
    }
    function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.definition();
        return all(def.orig, function(sym) {
            if (sym instanceof AST_SymbolConst || sym instanceof AST_SymbolLet) {
            }
        });
    }
    function has_escaped(d, scope, node, parent) {
        if (parent instanceof AST_Assign) return parent.operator == "=" && parent.right === node;
    }
    (function(def) {
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.bool_fn = 0;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.const_redefs
                && !(def.init instanceof AST_LambdaExpression && def.init !== def.scope)
            def.reassigned = 0;
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }
        function reset_block_variables(tw, compressor, scope) {
            scope.variables.each(function(def) {
                reset_def(tw, compressor, def);
            });
        }
        function pop_scope(tw, scope) {
            delete scope.may_call_this;
        }
        function mark_assignment_to_arguments(node) {
            var expr = node.expression;
            var def = expr.definition();
            def.reassigned++;
        }
        function scan_declaration(tw, compressor, lhs, fixed, visit) {
            var scanner = new TreeWalker(function(node) {
                if (node instanceof AST_DefaultValue) {
                    var save = fixed;
                    if (save) fixed = function() {
                    };
                    fixed = save;
                }
                if (node instanceof AST_DestructuredArray) {
                    var save = fixed;
                    if (node.rest) {
                        if (save) fixed = compressor.option("rests") && function() {
                            var value = save();
                            return value instanceof AST_Array ? make_node(AST_Array, node, {
                            }) : node;
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
            var hit = is_async(fn) || is_generator(fn);
            var aborts = false;
            fn.walk(new TreeWalker(function(node) {
                if (hit) return aborts = true;
                if (node instanceof AST_Return) return hit = true;
            }));
            // So existing transformation rules can work on them.
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
            var ld = left instanceof AST_SymbolRef && left.definition();
            switch (node.operator) {
                if (left.equivalent_to(right) && !left.has_side_effects(compressor)) {
                    node.__drop = true;
                }
                ld.assignments++;
                var fixed = ld.fixed;
                if (is_modified(compressor, tw, node, node, 0)) {
                    ld.fixed = false;
                }
                if (safe && !left.in_arg && safe_to_assign(tw, ld)) {
                    if (ld.single_use) ld.single_use = false;
                    left.fixed = ld.fixed = function() {
                    };
                    left.fixed.assigns = !fixed || !fixed.assigns ? [] : fixed.assigns.slice();
                } else {
                    left.walk(tw);
                    ld.fixed = false;
                }
            }
            function walk_assign() {
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
            var node = this;
            var exp = node.expression;
            if (exp instanceof AST_LambdaExpression) {
                var iife = is_iife_single(node);
                node.args.forEach(function(arg) {
                    if (arg instanceof AST_Spread) iife = false;
                });
                if (iife) exp.reduce_vars = reduce_iife;
            }
            if (node.TYPE == "Call" && tw.in_boolean_context()) {
                if (exp instanceof AST_SymbolRef) {
                    exp.definition().bool_fn++;
                } else if (exp instanceof AST_Assign && exp.operator == "=" && exp.left instanceof AST_SymbolRef) {
                    exp.left.definition().bool_fn++;
                }
            }
        });
        def(AST_Class, function(tw, descend, compressor) {
            var node = this;
            if (node.extends) node.extends.walk(tw);
            if (node.name) {
                var d = node.name.definition();
                var parent = tw.parent();
                if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) d.single_use = false;
                if (safe_to_assign(tw, d, true)) {
                    tw.loop_ids[d.id] = tw.in_loop;
                    d.fixed = function() {
                    };
                    d.fixed.assigns = [ node ];
                    if (!is_safe_lexical(d)) d.single_use = false;
                } else {
                    d.fixed = false;
                }
            }
        });
        def(AST_ForEnumeration, function(tw, descend, compressor) {
            var node = this;
            var init = node.init;
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
            }
        });
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            var fn = this;
            var def = fn.name.definition();
            var parent = tw.parent();
            if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) def.single_use = false;
            fn.inlined = false;
        });
        def(AST_Template, function(tw, descend) {
            node.expressions.forEach(function(exp) {
            });
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
    function is_iife_single(call) {
    }
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            var scanner = new TreeTransformer(function(node, descend) {
                if (node instanceof AST_DefaultValue) {
                    node.name = node.name.transform(scanner);
                    node.value = node.value.transform(scanner);
                }
            }, signal_abort);
            function find_stop(node, level) {
                var parent = scanner.parent(level);
                if (parent instanceof AST_Assign) return node;
            }
            function find_stop_expr(expr, cont, node, parent, level) {
                var stack = scanner.stack;
                scanner.stack = [ parent ];
                scanner.stack = stack;
            }
            function foldable(expr) {
                var lhs_ids = Object.create(null);
                var marker = new TreeWalker(function(node) {
                    if (node instanceof AST_SymbolRef) lhs_ids[node.definition().id] = true;
                });
                while (expr instanceof AST_Assign && expr.operator == "=") {
                    expr = expr.right;
                }
                if (expr instanceof AST_SymbolRef) {
                }
                var circular;
                expr.walk(new TreeWalker(function(node) {
                    if (circular) return true;
                    if (node instanceof AST_SymbolRef && lhs_ids[node.definition().id]) circular = true;
                }));
            }
        }
        function extract_exprs(body) {
        }
        function join_assigns(defn, body, keep) {
            var exprs = extract_exprs(body);
            for (var i = exprs.length - 1; --i >= 0;) {
                var tail = exprs.slice(i + 1);
                exprs = exprs.slice(0, i + 1).concat(tail);
            }
            if (defn instanceof AST_Definitions) {
                keep = keep || 0;
                for (var i = defn.definitions.length; --i >= 0;) {
                    var def = defn.definitions[i];
                    if (!def.value) continue;
                }
            }
        }
        function merge_assigns(prev, defn) {
            if (!(prev instanceof AST_SimpleStatement)) return;
            var definitions = [];
            defn.definitions = definitions.reverse().concat(defn.definitions);
        }
    }
    AST_Scope.DEFMETHOD("drop_unused", function(compressor) {
        var trimmer = new TreeTransformer(function(node) {
            if (node instanceof AST_Destructured && node.rest) node.rest = node.rest.transform(trimmer);
            if (node instanceof AST_DestructuredArray) {
                for (var i = node.elements.length; --i >= 0;) {
                    var element = node.elements[i].transform(trimmer);
                    if (element) {
                        node.elements[i] = element;
                    } else if (trim) {
                    } else {
                        node.elements[i] = make_node(AST_Hole, node.elements[i]);
                    }
                }
            }
            if (node instanceof AST_DestructuredObject) {
                var properties = [];
                node.properties = properties;
            }
        });
        var tt = new TreeTransformer(function(node, descend, in_list) {
            if (node instanceof AST_Lambda) {
                if (!(node instanceof AST_Accessor)) {
                    if (node.rest) {
                        var rest = node.rest.transform(trimmer);
                            && (!node.uses_arguments || tt.has_directive("use strict"))) {
                            if (rest instanceof AST_DestructuredArray) {
                                if (rest.elements.length == 0) rest = null;
                            } else if (rest.properties.length == 0) {
                                rest = null;
                            }
                        }
                        node.rest = rest;
                    }
                }
            }
            if (node instanceof AST_Definitions && !(parent instanceof AST_ForEnumeration && parent.init === node)) {
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
        });
        function trim_default(trimmer, node) {
            node.value = node.value.transform(tt);
            if (!name) {
                var value = node.value.drop_side_effect_free(compressor);
                node.name.__unused = null;
                node.value = value;
            }
        }
        function trim_destructured(node, value, process, drop) {
            var trimmer = new TreeTransformer(function(node) {
                if (node instanceof AST_DefaultValue) {
                    if (compressor.option("default_values") && value && value.is_defined(compressor)) {
                        node = node.name;
                    } else {
                        var save_drop = drop;
                        drop = false;
                        var trimmed = trim_default(trimmer, node);
                        drop = save_drop;
                        if (!trimmed && drop && value) value = value.drop_side_effect_free(compressor);
                    }
                }
                if (node instanceof AST_DestructuredArray) {
                    var save_drop = drop;
                    var save_value = value;
                    if (value instanceof AST_SymbolRef) {
                        drop = false;
                        value = value.fixed_value();
                    }
                    var values = value instanceof AST_Array && value.elements;
                    var elements = [], newValues = drop && [], pos = 0;
                    node.elements.forEach(function(element, index) {
                        value = values && values[index];
                        if (value instanceof AST_Hole) {
                            value = null;
                        } else if (value instanceof AST_Spread) {
                            if (drop) {
                                newValues.length = pos;
                                save_value.elements = newValues;
                            }
                            value = values = false;
                        }
                        element = element.transform(trimmer);
                        if (element) elements[pos] = element;
                        if (drop && value) newValues[pos] = value;
                        if (element || value || !drop || !values) pos++;
                    });
                    value = values && make_node(AST_Array, save_value, {
                    });
                    if (node.rest) {
                        var was_drop = drop;
                        drop = false;
                        node.rest = node.rest.transform(compressor.option("rests") ? trimmer : tt);
                        drop = was_drop;
                        if (node.rest) elements.length = pos;
                    }
                    if (drop) {
                        if (value && !node.rest) value = value.drop_side_effect_free(compressor);
                        if (value instanceof AST_Array) {
                            value = value.elements;
                        } else if (value instanceof AST_Sequence) {
                            value = value.expressions;
                        } else if (value) {
                            value = [ value ];
                        }
                        if (value && value.length) {
                            newValues.length = pos;
                        }
                    }
                    value = save_value;
                    drop = save_drop;
                    if (values && newValues) {
                        value.elements = newValues;
                    }
                        || value && value.is_string(compressor))) switch (elements.length) {
                      case 0:
                        if (drop) value = value.drop_side_effect_free(compressor);
                        return null;
                      case 1:
                        if (!drop) break;
                        var sym = elements[0];
                        if (!(sym instanceof AST_Symbol)) break;
                        value = make_node(AST_Sub, node, {
                            expression: value,
                            property: make_node(AST_Number, node, { value: 0 }),
                        });
                        return sym;
                    }
                    node.elements = elements;
                }
                if (node instanceof AST_DestructuredObject) {
                    var save_drop = drop;
                    var save_value = value;
                    if (value instanceof AST_SymbolRef) {
                        drop = false;
                        value = value.fixed_value();
                    }
                    var prop_keys, prop_map;
                    if (value instanceof AST_Object) {
                        prop_keys = [];
                        prop_map = Object.create(null);
                        value.properties.forEach(function(prop, index) {
                            if (prop instanceof AST_Spread) return prop_map = false;
                            var key = prop.key;
                            if (key instanceof AST_Node) key = key.evaluate(compressor, true);
                            if (key instanceof AST_Node) {
                                prop_map = false;
                            } else if (prop_map && !(prop instanceof AST_ObjectSetter)) {
                                prop_map[key] = prop;
                            }
                            prop_keys[index] = key;
                        });
                    }
                    if (node.rest) {
                        value = false;
                        node.rest = node.rest.transform(compressor.option("rests") ? trimmer : tt);
                    }
                    var can_drop = Object.create(null);
                    var drop_keys = drop && Object.create(null);
                    var properties = [];
                    node.properties.map(function(prop) {
                        var key = prop.key;
                        if (key instanceof AST_Node) {
                            prop.key = key = key.transform(tt);
                            key = key.evaluate(compressor, true);
                        }
                        if (key instanceof AST_Node) {
                            drop_keys = false;
                        } else {
                            can_drop[key] = !(key in can_drop);
                        }
                    }).forEach(function(key, index) {
                        if (key instanceof AST_Node) {
                            drop = false;
                            value = false;
                        } else {
                            drop = drop_keys && can_drop[key];
                            var mapped = prop_map && prop_map[key];
                            if (mapped) {
                                value = mapped.value;
                                if (value instanceof AST_Accessor) value = false;
                            } else {
                                value = false;
                            }
                            if (!trimmed) {
                                if (node.rest || retain_key(prop)) trimmed = retain_lhs(prop.value);
                                if (drop_keys && !(key in drop_keys)) {
                                    if (mapped) {
                                        drop_keys[key] = mapped;
                                        if (value === null) {
                                            prop_map[key] = retain_key(mapped) && make_node(AST_ObjectKeyVal, mapped, {
                                            });
                                        }
                                    } else {
                                        drop_keys[key] = true;
                                    }
                                }
                            } else if (drop_keys) {
                                drop_keys[key] = false;
                            }
                            if (value) mapped.value = value;
                        }
                    });
                    value = save_value;
                    drop = save_drop;
                    if (drop_keys && prop_keys) value.properties = List(value.properties, function(prop, index) {
                        var trimmed = prop.value.drop_side_effect_free(compressor);
                        if (trimmed) {
                            prop.value = trimmed;
                        }
                    });
                    if (value && !node.rest) switch (properties.length) {
                      case 0:
                        if (value.may_throw_on_access(compressor, true)) break;
                        if (drop) value = value.drop_side_effect_free(compressor);
                        return null;
                      case 1:
                        if (!drop) break;
                        var prop = properties[0];
                        if (prop.key instanceof AST_Node) break;
                        if (!(prop.value instanceof AST_Symbol)) break;
                        value = make_node(AST_Sub, node, {
                            expression: value,
                            property: make_node_from_constant(prop.key, prop),
                        });
                        return prop.value;
                    }
                    node.properties = properties;
                }
                if (node instanceof AST_Hole) {
                    node = null;
                } else {
                    node = process(node);
                }
                if (!node && drop && value) value = value.drop_side_effect_free(compressor);
            });
            function retain_key(prop) {
            }
            function retain_lhs(node) {
                if (node instanceof AST_Destructured) {
                    if (value === null) {
                        value = make_node(AST_Number, node, { value: 0 });
                    } else if (value) {
                }
            }
        }
    });
})(function(node, optimizer) {
