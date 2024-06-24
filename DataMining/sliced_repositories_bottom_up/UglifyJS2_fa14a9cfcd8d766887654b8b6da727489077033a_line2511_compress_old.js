(function(OPT) {
    (function(def) {

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
    function tighten_body(statements, compressor) {
        function trim_assigns(name, value, exprs) {
            do {
                var node = exprs[0];
                if (!node.right.is_constant_expression(scope)) break;
                var prop = node.left.property;
                if (prop instanceof AST_Node) {
                    prop = prop.evaluate(compressor);
                }
                if (prop instanceof AST_Node) break;
                prop = "" + prop;
                var diff = compressor.has_directive("use strict") ? function(node) {
                    return node.key != prop && node.key.name != prop;
                } : function(node) {
            } while (exprs.length);
        }
    }
})(function(node, optimizer) {
