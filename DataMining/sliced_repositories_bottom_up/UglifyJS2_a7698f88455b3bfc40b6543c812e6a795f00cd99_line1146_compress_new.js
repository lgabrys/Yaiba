function Compressor(options, false_by_default) {
}
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    exposed: function(def) {
    },
    compress: function(node) {
        node = node.resolve_defines(this);
        for (var pass = 0; pass < passes; pass++) {
            node = node.transform(this);
        }
    },
    before: function(node, descend, in_list) {
    }
});
(function(OPT) {
    (function(def) {
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            var fn = this;
            var def = fn.name.definition();
            var parent = tw.parent();
            if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) def.single_use = false;
            if (tw.defun_visited[def.id]) return true;
            if (def.init === fn && tw.defun_ids[def.id] !== tw.safe_ids) return true;
        });
    })(function(node, func) {
})(function(node, optimizer) {
