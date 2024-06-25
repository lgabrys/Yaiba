(function(){
    function OPT(node, optimizer) {
    };
    OPT(AST_SymbolRef, function(self, compressor){
        function isLHS(symbol, parent) {
        }
        if (self.undeclared() && !isLHS(self, compressor.parent())) {
            var defines = compressor.option("global_defs");
            if (defines && HOP(defines, self.name)) {
            }
        }
    });
})();
