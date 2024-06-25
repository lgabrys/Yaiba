(function(){
    AST_Node.DEFMETHOD("reset_opt_flags", function(compressor, rescan){
        var reduce_vars = rescan && compressor.option("reduce_vars");
        var ie8 = !compressor.option("screw_ie8");
        var tw = new TreeWalker(function(node, descend){
            if (!(node instanceof AST_Directive || node instanceof AST_Constant)) {
                node._squeezed = false;
                node._optimized = false;
            }
            if (reduce_vars) {
                if (ie8 && node instanceof AST_SymbolCatch) {
                    node.definition().fixed = false;
                }
                if (node instanceof AST_Catch || node instanceof AST_SwitchBranch) {
                }
            }
        });
    });
})();
