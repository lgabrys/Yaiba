(function() {
    function DEFPRINT(nodetype, generator) {
    }
    DEFPRINT(AST_Var, function(self, output) {
        var p = output.parent();
        if (p && p.init !== self || !(p instanceof AST_For || p instanceof AST_ForIn)) output.semicolon();
    });
})();
