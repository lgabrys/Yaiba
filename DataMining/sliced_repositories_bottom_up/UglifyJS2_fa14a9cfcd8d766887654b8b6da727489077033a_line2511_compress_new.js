(function(OPT) {
    (function(def) {

        def(AST_Assign, function(tw, descend, compressor) {
            var node = this;
            var sym = node.left;
            if (sym.fixed) delete sym.fixed;
            var d = sym.definition();
            d.assignments++;
            var eq = node.operator == "=";
            var value = eq ? node.right : node;
            sym.fixed = d.fixed = eq ? function() {
            } : function() {
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
            d.fixed = function() {
            };
            exp.fixed = node instanceof AST_UnaryPrefix ? d.fixed : function() {
            };
        });
    })(function(node, func) {
    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
        function find_loop_scope_try() {
            var node = compressor.self(), level = 0;
            do {
                if (node instanceof AST_Catch || node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                } else if (node instanceof AST_Try) {
                    in_try = node;
                }
            } while (node = compressor.parent(level++));
        }
        function trim_assigns(name, value, exprs) {
            if (!(value instanceof AST_Object)) return;
            var trimmed = false;
            do {
                var node = exprs[0];
                if (!node.right.is_constant_expression(scope)) break;
                var prop = node.left.property;
                if (prop instanceof AST_Node) {
                    prop = prop.evaluate(compressor);
                }
                if (prop instanceof AST_Node) break;
                prop = "" + prop;
                var diff = prop == "__proto__" || compressor.has_directive("use strict") ? function(node) {
                    return node.key != prop && node.key.name != prop;
                } : function(node) {
            } while (exprs.length);
        }
    }
})(function(node, optimizer) {
