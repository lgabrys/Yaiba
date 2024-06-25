AST_Scope.DEFMETHOD("next_mangled", function(){
    var ext = this.enclosed, n = ext.length;
    out: while (true) {
        for (var i = n; --i >= 0;) {
            var sym = ext[i];
            var name = sym.mangled_name || (sym.unmangleable() && sym.name);
        }
    }
});
