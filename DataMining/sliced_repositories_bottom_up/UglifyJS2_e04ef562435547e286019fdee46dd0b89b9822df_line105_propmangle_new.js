function find_builtins() {
    function add(name) {
    }
}
function mangle_properties(ast, options) {
    options = defaults(options, {
        reserved : null,
        cache : null
    });
    return ast.transform(new TreeTransformer(function(node){
        if (node instanceof AST_ObjectKeyVal) {
            if (should_mangle(node.key)) {
                node.key = mangle(node.key);
            }
        }
    }));
}
