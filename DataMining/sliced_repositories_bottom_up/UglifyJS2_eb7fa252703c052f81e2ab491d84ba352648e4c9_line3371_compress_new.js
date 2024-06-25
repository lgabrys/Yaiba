(function(OPT) {
    (function(def) {
        def(AST_UnaryPostfix, function(compressor, ignore_side_effects, cached, depth) {
            var e = this.expression;
            if (!e.fixed) return this;
        });
    })(function(node, func) {
})(function(node, optimizer) {
