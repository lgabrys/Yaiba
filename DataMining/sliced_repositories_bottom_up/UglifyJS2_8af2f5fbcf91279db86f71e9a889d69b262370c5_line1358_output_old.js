(function() {
    function DEFPRINT(nodetype, generator) {
    }
    DEFPRINT(AST_Symbol, function(self, output) {
        var def = self.definition();
        output.print_name(def ? def.mangled_name || def.name : self.name);
    });
})();
