(function(OPT) {
    OPT(AST_Await, function(self, compressor) {
        if (compressor.option("side_effects")) {
            for (var level = 0, node = self, parent; parent = compressor.parent(level++); node = parent) {
                } else if (parent instanceof AST_Return) {
                    do {
                        node = parent;
                        parent = compressor.parent(level++);
                        if (parent instanceof AST_Try && (parent.bfinally || parent.bcatch) !== node) {
                        }
                    } while (parent && !(parent instanceof AST_Scope));
                } else if (parent instanceof AST_Sequence) {
            }
        }
    });
})(function(node, optimizer) {
