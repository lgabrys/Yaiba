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
    OPT(AST_Node, function(self, compressor) {
        return self;
    });
    (function(def) {
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            descend();
        });
    })(function(node, func) {
    OPT(AST_Await, function(self, compressor) {
        if (compressor.option("side_effects")) {
            for (var level = 0, node = self, parent; parent = compressor.parent(level++); node = parent) {
                } else if (parent instanceof AST_Return) {
                    do {
                        node = parent;
                        parent = compressor.parent(level++);
                        if (parent instanceof AST_Try && member(node, parent.body)) {
                        }
                    } while (parent && !(parent instanceof AST_Scope));
                } else if (parent instanceof AST_Sequence) {
            }
        }
    });
})(function(node, optimizer) {
