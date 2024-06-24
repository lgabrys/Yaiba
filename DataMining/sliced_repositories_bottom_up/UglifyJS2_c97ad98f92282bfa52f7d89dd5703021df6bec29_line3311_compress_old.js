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
    (function(def) {
        def(AST_Assign, function(compressor, ignore_side_effects, cached, depth) {
            var lhs = this.left;
            if (HOP(lhs, "_eval") || !(lhs instanceof AST_SymbolRef) || !lhs.fixed_value()) {
            } else {
        });
    })(function(node, func) {
})(function(node, optimizer) {
