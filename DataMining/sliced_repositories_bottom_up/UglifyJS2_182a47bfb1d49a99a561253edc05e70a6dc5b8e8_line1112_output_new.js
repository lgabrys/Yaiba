(function(){
    function DEFPRINT(nodetype, generator) {
    };
    DEFPRINT(AST_Call, function(self, output){
        if (self.expression instanceof AST_Call || self.expression instanceof AST_Lambda) {
        }
    });
})();
