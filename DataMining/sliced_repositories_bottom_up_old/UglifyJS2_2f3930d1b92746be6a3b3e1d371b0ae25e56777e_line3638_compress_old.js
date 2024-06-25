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
        function reset_def(tw, compressor, def) {
            def.assignments = 0;
            def.chained = false;
            def.cross_loop = false;
            def.direct_access = false;
            def.escaped = [];
            def.fixed = !def.scope.pinned()
            })) {
                tw.defun_ids[def.id] = false;
            }
            def.recursive_refs = 0;
            def.references = [];
            def.should_replace = undefined;
            def.single_use = undefined;
        }
    })(function(node, func) {
    (function(def) {
        function any(list, compressor) {
            for (var i = list.length; --i >= 0;)
        }
        def(AST_Try, function(compressor) {
            return this.bcatch ? this.bcatch.may_throw(compressor) : any(this.body, compressor)
        });
    })(function(node, func) {
})(function(node, optimizer) {
