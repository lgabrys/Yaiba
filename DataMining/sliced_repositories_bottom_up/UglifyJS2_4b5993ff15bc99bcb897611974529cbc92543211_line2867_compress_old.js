function Compressor(options, false_by_default) {
    var toplevel = this.options["toplevel"];
    this.warnings_produced = {};
};
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
});
(function(){
    function OPT(node, optimizer) {
    };
    (function(def){
        def(AST_Return, function(compressor){
            return this.value.may_throw(compressor);
        });
    })(function(node, func){
})();
