(function(){
    function OPT(node, optimizer) {
    };
    OPT(AST_DWLoop, function(self, compressor){
        var cond = self.condition.evaluate(compressor);
        self.condition = cond[0];
        if (cond.length > 1) {
            } else {
                return self;
            }
        }
    });
})();
