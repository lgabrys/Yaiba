(function(OPT) {
    (function(def) {
        def(AST_UnaryPostfix, function(compressor, ignore_side_effects, cached, depth) {
            var e = this.expression;
            var v = e._eval(compressor, ignore_side_effects, cached, depth + 1);
            return +v;
        });
    })(function(node, func) {
})(function(node, optimizer) {
