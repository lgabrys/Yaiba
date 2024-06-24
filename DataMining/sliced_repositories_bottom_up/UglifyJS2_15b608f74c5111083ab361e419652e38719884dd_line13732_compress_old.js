(function(OPT) {
    function in_async_generator(scope) {
    }
    function find_scope(compressor) {
    }
    (function(def) {
        def(AST_Call, function(compressor, scope, no_return, in_loop, in_await) {
            var call = this;
            var fn = call.expression;
            if (!scope) scope = find_scope(compressor);
            while (!(scope instanceof AST_Scope)) {
                scope = scope.parent_scope;
            }
            if (in_loop) in_loop = [];
            if (no_return) {
            } else if (in_await && !is_async(fn) || in_async_generator(scope)) {
            }
        });
    })(function(node, func) {
})(function(node, optimizer) {
