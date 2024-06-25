function DEFNODE(type, props, methods, base) {
    if (typeof base === "undefined") base = AST_Node;
    props = props ? props.split(/\s+/) : [];
    if (base && base.PROPS) props = props.concat(base.PROPS);
}
var AST_Node = DEFNODE("Node", "start end", {
}, null);
AST_Node.warn_function = null;
AST_Node.warn = function(txt, props) {
};
var AST_Scope = DEFNODE("Scope", "variables functions uses_with uses_eval parent_scope enclosed cname", {
}, AST_Block);
var AST_Toplevel = DEFNODE("Toplevel", "globals", {
    wrap_commonjs: function(name) {
        var wrapped_tl = "(function(exports){'$ORIG';})(typeof " + name + "=='undefined'?(" + name + "={}):" + name + ");";
        wrapped_tl = parse(wrapped_tl);
        wrapped_tl = wrapped_tl.transform(new TreeTransformer(function(node) {
        }));
    },
}, AST_Scope);
