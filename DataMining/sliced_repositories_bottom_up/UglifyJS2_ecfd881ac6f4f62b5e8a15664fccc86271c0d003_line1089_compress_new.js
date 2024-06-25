(function(){
    AST_Scope.DEFMETHOD("drop_unused", function(compressor){
           ) {
            var tt = new TreeTransformer(
                function before(node, descend, in_list) {
                    if (node instanceof AST_Lambda && !(node instanceof AST_Accessor)) {
                        if (compressor.option("unsafe") && !compressor.option("keep_fargs")) {
                        }
                    }
                }
            );
        }
    });
})();
