(function(OPT) {
    function tighten_body(statements, compressor) {
        var in_loop, in_try, scope;
        function find_loop_scope_try() {
            var node = compressor.self(), level = 0;
            do {
                if (node instanceof AST_Catch || node instanceof AST_Finally) {
                    level++;
                } else if (node instanceof AST_IterationStatement) {
                    in_loop = true;
                } else if (node instanceof AST_Scope) {
                    scope = node;
                } else if (node instanceof AST_Try) {
                    if (!in_try) in_try = node;
                }
            } while (node = compressor.parent(level++));
        }
        function collapse(statements, compressor) {
            if (scope.pinned()) return statements;
            var args;
            function is_last_node(node, parent) {
                if (node.TYPE == "Binary") return node.operator == "in" && !is_object(node.right.tail_node());
                if (node instanceof AST_Call) {
                    var fn = node.expression;
                    if (fn instanceof AST_SymbolRef) {
                        if (recursive_ref(compressor, fn.definition())) return true;
                    }
                }
            }
        }
    }
})(function(node, optimizer) {
