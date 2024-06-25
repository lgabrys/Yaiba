(function(OPT) {
    (function(def) {
        def(AST_Assign, function(compressor) {
            var left = this.left;
            if (left instanceof AST_PropAccess) {
                var expr = left.expression;
                if (expr instanceof AST_Assign && expr.operator == "=" && !expr.may_throw_on_access(compressor)) {
                }
            }
        });
    })(function(node, func) {
})(function(node, optimizer) {
