function Compressor(options, false_by_default) {
    var toplevel = this.options["toplevel"];
    this.toplevel = typeof toplevel == "string" ? {
        funcs: /funcs/.test(toplevel),
    } : {
};

Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
});
(function(){
    function OPT(node, optimizer) {
    };
    (function(def){
        function is_immutable(value) {
        }
    })(function(node, func){
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function tighten_body(statements, compressor) {
        function handle_if_return(statements, compressor) {
            var self = compressor.self();
            var in_lambda = self instanceof AST_Lambda;
            for (var i = statements.length; --i >= 0;) {
                var stat = statements[i];
                var next = statements[i + 1];
                if (in_lambda && !next && stat instanceof AST_Return) {
                    if (!stat.value) {
                        statements.length--;
                    }
                    if (stat.value instanceof AST_UnaryPrefix && stat.value.operator == "void") {
                        statements[i] = make_node(AST_SimpleStatement, stat, {
                        });
                    }
                }
                if (stat instanceof AST_If) {
                    var ab = aborts(stat.body);
                    if (can_merge_flow(ab)) {
                        stat = stat.clone();
                        stat.condition = stat.condition.negate(compressor);
                        stat.body = make_node(AST_BlockStatement, stat, {
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat, {
                        });
                        statements[i] = stat.transform(compressor);
                    }
                    var ab = aborts(stat.alternative);
                    if (can_merge_flow(ab)) {
                        stat = stat.clone();
                        stat.body = make_node(AST_BlockStatement, stat.body, {
                        });
                        stat.alternative = make_node(AST_BlockStatement, stat.alternative, {
                        });
                        statements[i] = stat.transform(compressor);
                    }
                }
                if (stat instanceof AST_If && stat.body instanceof AST_Return) {
                    var value = stat.body.value;
                        && (in_lambda && !next || next instanceof AST_Return && !next.value)) {
                        statements[i] = make_node(AST_SimpleStatement, stat.condition, {
                        });
                    }
                    if (value && !stat.alternative && next instanceof AST_Return && next.value) {
                        stat = stat.clone();
                        stat.alternative = next;
                    }
                        && (!next || next instanceof AST_Return)) {
                        stat = stat.clone();
                        stat.alternative = next || make_node(AST_Return, stat, {
                        });
                    }
                        && i + 2 == statements.length && next instanceof AST_SimpleStatement) {
                        stat = stat.clone();
                        stat.alternative = make_node(AST_BlockStatement, next, {
                        });
                    }
                }
            }
            function can_merge_flow(ab) {
            }
            function extract_functions() {
                statements.length = i + 1;
            }
        }
    }
    function aborts(thing) {
    };
    OPT(AST_Call, function(self, compressor){
        var exp = self.expression;
        var fn = exp;
        if (compressor.option("reduce_vars") && fn instanceof AST_SymbolRef) {
            fn = fn.fixed_value();
        }
            && !fn.uses_eval) {
            var pos = 0, last = 0;
            for (var i = 0, len = self.args.length; i < len; i++) {
                var trim = i >= fn.argnames.length;
                if (trim || fn.argnames[i].__unused) {
                    var node = self.args[i].drop_side_effect_free(compressor);
                    if (node) {
                        self.args[pos++] = node;
                    } else if (!trim) {
                        self.args[pos++] = make_node(AST_Number, self.args[i], {
                        });
                    }
                } else {
                    self.args[pos++] = self.args[i];
                }
                last = pos;
            }
            self.args.length = last;
        }
        if (compressor.option("unsafe")) {
            } else if (exp instanceof AST_Dot) switch(exp.property) {
                if (exp.expression instanceof AST_Array) EXIT: {
                    var elements = [];
                    var node = self.clone();
                    node.expression = node.expression.clone();
                    node.expression.expression = node.expression.expression.clone();
                    node.expression.expression.elements = elements;
                }
            }
        }
            && exp.name == "Function") {
            })) {
                try {
                    self.args = [
                    ];
                } catch (ex) {
            }
        }
        var stat = fn instanceof AST_Function && fn.body[0];
        if (compressor.option("inline") && stat instanceof AST_Return) {
            var value = stat.value;
        }
        if (fn instanceof AST_Function) {
            var def, value, scope, level = -1;
            if (compressor.option("inline")
                && (exp === fn ? !fn.name
                        && (def = exp.definition()).references.length == 1
                        && fn.is_constant_expression(exp.scope))
                && (value = flatten_body(stat))) {
            }
        }
        function can_flatten_args(fn) {
            do {
                scope = compressor.parent(++level);
                if (scope instanceof AST_SymbolRef) {
                    scope = scope.fixed_value();
                } else if (scope instanceof AST_Catch) {
            } while (!(scope instanceof AST_Scope));
        }
    });
})();
