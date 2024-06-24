AST_Scope.DEFMETHOD("def_function", function(symbol, init){
    var def = this.def_variable(symbol, init);
    if (!def.init) def.init = init;
});
