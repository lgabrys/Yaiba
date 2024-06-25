(function(){
    function OPT(node, optimizer) {
    };
    OPT(AST_UnaryPrefix, function(self, compressor){
        self = self.lift_sequences(compressor);
        var e = self.expression;
        if (e instanceof AST_Binary) {
        }
    });
})();
