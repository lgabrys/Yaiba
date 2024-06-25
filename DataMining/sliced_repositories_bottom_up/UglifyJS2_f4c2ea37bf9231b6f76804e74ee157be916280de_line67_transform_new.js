(function(undefined){
    function _(node, descend) {
        node.DEFMETHOD("transform", function(tw, in_list){
            var x, y;
            if (tw.before) x = tw.before(this, descend, in_list);
            if (x === undefined) {
                if (!tw.after) {
                    x = this;
                } else {
                    tw.stack[tw.stack.length - 1] = x = this;
                }
            }
        });
    };
})();
