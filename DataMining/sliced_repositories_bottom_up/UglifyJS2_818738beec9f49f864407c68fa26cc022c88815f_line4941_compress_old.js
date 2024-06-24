(function(OPT) {
    function make_sequence(orig, expressions) {
        return make_node(AST_Sequence, orig, {
            expressions: expressions.reduce(merge_sequence, [])
        });
    }
    function merge_sequence(array, node) {
    }
    (function(def) {
        def(AST_Conditional, function(compressor) {
            var exprs;
            if (compressor.option("ie8")) {
                exprs = [];
            }
            return make_sequence(this, exprs);
        });
    })(function(node, func) {
})(function(node, optimizer) {
