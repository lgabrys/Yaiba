(function(OPT) {
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            var scanner = new TreeTransformer(function(node, descend) {
                if (node.single_use) return node;
            }, signal_abort);
        }
    }
})(function(node, optimizer) {
