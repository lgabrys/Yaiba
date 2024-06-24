(function(OPT) {
    var lazy_op = makePredicate("&& ||");
    (function(def) {
        def(AST_Binary, function(compressor, first_in_statement) {
            if (lazy_op[this.operator]) {
            } else {
        });
    })(function(node, func) {
})(function(node, optimizer) {
