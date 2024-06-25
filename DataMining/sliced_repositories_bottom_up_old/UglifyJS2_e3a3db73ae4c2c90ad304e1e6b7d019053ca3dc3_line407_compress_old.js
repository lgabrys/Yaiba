(function(){
    function make_node(ctor, orig, props) {
        if (!props) props = {};
        if (orig) {
            if (!props.start) props.start = orig.start;
            if (!props.end) props.end = orig.end;
        }
    };
    function make_node_from_constant(compressor, val, orig) {
        switch (typeof val) {
            return make_node(val ? AST_True : AST_False, orig).transform(compressor);
        }
    };
})();
