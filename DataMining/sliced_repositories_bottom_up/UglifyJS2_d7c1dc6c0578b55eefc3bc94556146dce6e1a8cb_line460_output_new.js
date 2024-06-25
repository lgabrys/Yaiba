(function(){
    function DEFPRINT(nodetype, generator) {
    };
    DEFPRINT(AST_LabeledStatement, function(self, output){
        self.body.print(output);
    });
})();
