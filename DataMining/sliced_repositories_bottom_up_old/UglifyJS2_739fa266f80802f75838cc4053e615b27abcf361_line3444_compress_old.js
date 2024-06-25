(function(OPT) {
    function is_arguments(def) {
    }
    (function(def) {
        def(AST_SymbolRef, function(compressor) {
            var def = this.definition();
            if (is_arguments(def) && all(def.scope.argnames, function(argname) {
            })) return def.scope.uses_arguments > 2;
        });
    })(function(node, func) {
})(function(node, optimizer) {
