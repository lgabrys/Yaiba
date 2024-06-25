(function(){
    function PARENS(nodetype, func) {
    };
    PARENS([ AST_Unary, AST_Undefined ], function(output){
        var p = output.parent();
            || p instanceof AST_Call && p.expression === this;
    });
})();
