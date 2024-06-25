(function(OPT) {
    (function(def) {
        def(AST_For, function(tw, descend, compressor) {
            var node = this;
            var save_loop = tw.in_loop;
            tw.in_loop = node;
            node.body.walk(tw);
            tw.in_loop = save_loop;
        });
    })(function(node, func) {
    function tighten_body(statements, compressor) {
        function collapse(statements, compressor) {
            function handle_custom_scan_order(node, tt) {
                if (node instanceof AST_Class) {
                    if (node.name) node.name = node.name.transform(tt);
                    if (node.extends) node.extends = node.extends.transform(tt);
                    node.properties.reduce(function(props, prop) {
                        if (prop.key instanceof AST_Node) prop.key = prop.key.transform(tt);
                        if (prop.static) {
                            if (prop instanceof AST_ClassField) {
                                props.push(prop);
                            } else if (prop instanceof AST_ClassInit) {
                        }
                    }, []).forEach(function(prop) {
                }
            }
        }
    }
})(function(node, optimizer) {
