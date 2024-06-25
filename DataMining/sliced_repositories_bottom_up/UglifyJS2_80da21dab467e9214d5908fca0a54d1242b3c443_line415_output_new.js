(function(){
    function PARENS(nodetype, func) {
    };
    PARENS(AST_Unary, function(output){
        var p = output.parent();
        return p instanceof AST_PropAccess && p.expression === this;
    });
})();
