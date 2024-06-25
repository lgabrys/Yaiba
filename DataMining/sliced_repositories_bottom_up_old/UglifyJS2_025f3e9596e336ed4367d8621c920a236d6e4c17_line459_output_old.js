(function(){
    function PARENS(nodetype, func) {
    };
    PARENS(AST_Unary, function(output){
        var p = output.parent();
            || (p instanceof AST_Unary && p.operator == "+" && this.operator == "+");
    });
})();
