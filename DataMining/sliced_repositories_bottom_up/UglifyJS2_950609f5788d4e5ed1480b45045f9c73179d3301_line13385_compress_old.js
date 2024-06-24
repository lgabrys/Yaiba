(function(OPT) {
    function find_scope(compressor) {
    }
    (function(def) {
        def(AST_Call, function(compressor, scope, no_return, in_loop) {
            var call = this;
            var fn = call.expression;
            if (!scope) scope = find_scope(compressor);
            while (!(scope instanceof AST_Scope)) {
                scope = scope.parent_scope;
            }
            if (in_loop) in_loop = [];
            fn.variables.each(function(def, name) {
                if (name == "arguments") return;
            });
        });
    })(function(node, func) {
})(function(node, optimizer) {
