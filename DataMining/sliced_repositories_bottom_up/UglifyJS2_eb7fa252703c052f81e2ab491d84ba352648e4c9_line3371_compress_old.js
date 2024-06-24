(function(OPT) {
    (function(def) {
        def(AST_UnaryPostfix, function(compressor, ignore_side_effects, cached, depth) {
            var e = this.expression;
            if (!(e instanceof AST_SymbolRef)) return this;
        });
    })(function(node, func) {
})(function(node, optimizer) {
