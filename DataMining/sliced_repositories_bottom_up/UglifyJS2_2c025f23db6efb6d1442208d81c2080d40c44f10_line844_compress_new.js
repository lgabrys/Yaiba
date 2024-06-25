(function(undefined){
    AST_Scope.DEFMETHOD("drop_unused", function(compressor){
           ) {
            var in_use = [];
            for (var i = 0; i < in_use.length; ++i) {
                in_use[i].orig.forEach(function(decl){
                    // undeclared globals will be instanceof AST_SymbolRef
                    if (decl instanceof AST_SymbolDeclaration) {
                        decl.init.forEach(function(init){
                            var tw = new TreeWalker(function(node){
                                if (node instanceof AST_SymbolRef
                                    && !(node instanceof AST_LabelRef)) {
                                    push_uniq(in_use, node.definition());
                                }
                            });
                            init.walk(tw);
                        });
                    }
                });
            }
        }
    });
})();
