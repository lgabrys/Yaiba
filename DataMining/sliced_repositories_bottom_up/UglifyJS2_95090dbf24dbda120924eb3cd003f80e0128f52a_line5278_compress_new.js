(function(OPT) {
    function can_drop_symbol(ref, compressor, keep_lambda) {
        var def = ref.definition();
        return all(def.orig, function(sym) {
        });
    }
    (function(def) {
        def(AST_SymbolRef, function(compressor) {
            return !this.is_declared(compressor) || !can_drop_symbol(this, compressor);
        });
    })(function(node, func) {
})(function(node, optimizer) {
