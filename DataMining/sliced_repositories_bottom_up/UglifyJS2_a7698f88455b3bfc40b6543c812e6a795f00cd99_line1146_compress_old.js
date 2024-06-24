(function(OPT) {
    (function(def) {
        def(AST_LambdaDefinition, function(tw, descend, compressor) {
            var fn = this;
            var def = fn.name.definition();
            var parent = tw.parent();
            if (parent instanceof AST_ExportDeclaration || parent instanceof AST_ExportDefault) def.single_use = false;
            if (tw.defun_ids[def.id] !== tw.safe_ids) return true;
        });
    })(function(node, func) {
})(function(node, optimizer) {
