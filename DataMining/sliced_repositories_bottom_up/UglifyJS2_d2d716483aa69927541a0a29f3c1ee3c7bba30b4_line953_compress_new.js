function Compressor(options, false_by_default) {
};
Compressor.prototype = new TreeTransformer;
merge(Compressor.prototype, {
    option: function(key) { return this.options[key] },
    warn: function() {
    },
    before: function(node, descend, in_list) {
        if (node instanceof AST_Scope) {
            node = node.hoist_declarations(this);
        }
        node = node.optimize(this);
        node._squeezed = true;
    }
});
(function(){
    function aborts(thing) {
    };
    (function(def){
        def(AST_If, function(){
            return this.alternative && aborts(this.body) && aborts(this.alternative) && this;
        });
    })(function(node, func){
})();
