(function(){
    function extract_declarations_from_unreachable_code(compressor, stat, target) {
        stat.walk(new TreeWalker(function(node){
            if (node instanceof AST_Defun) {
            }
        }));
    };
})();
