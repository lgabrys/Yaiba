function DEFNODE(type, props, methods, base) {
    if (typeof base === "undefined") base = AST_Node;
    props = props ? props.split(/\s+/) : [];
    var self_props = props;
    if (base && base.PROPS) props = props.concat(base.PROPS);
    var code = [
    ];
    props.forEach(function(prop) {
    });
    var proto = base && new base;
    var ctor = new Function(code.join(""))();
    if (proto) {
        ctor.prototype = proto;
        ctor.BASE = base;
    }
    ctor.prototype.CTOR = ctor;
    ctor.PROPS = props || null;
    ctor.SELF_PROPS = self_props;
    ctor.SUBCLASSES = [];
    if (type) {
        ctor.prototype.TYPE = ctor.TYPE = type;
    }
    if (methods) for (var name in methods) if (HOP(methods, name)) {
        if (/^\$/.test(name)) {
            ctor[name.substr(1)] = methods[name];
        } else {
            ctor.prototype[name] = methods[name];
        }
    }
    ctor.DEFMETHOD = function(name, method) {
    };
}
var AST_Token = DEFNODE("Token", "type value line col pos endline endcol endpos nlb comments_before comments_after file raw", {
}, null);
var AST_Node = DEFNODE("Node", "start end", {
    _clone: function(deep) {
        if (deep) {
            var self = this.clone();
        }
    },
}, null);
AST_Node.warn = function(txt, props) {
    if (AST_Node.warn_function) AST_Node.warn_function(string_template(txt, props));
};
var AST_Statement = DEFNODE("Statement", null, {
    $documentation: "Base class of all statements",
});
var AST_Debugger = DEFNODE("Debugger", null, {
    $documentation: "Represents a debugger statement",
}, AST_Statement);
var AST_Directive = DEFNODE("Directive", "value quote", {
    $documentation: "Represents a directive, like \"use strict\";",
    $propdoc: {
    },
}, AST_Statement);
var AST_PropAccess = DEFNODE("PropAccess", "expression property", {
    $documentation: "Base class for property access expressions, i.e. `a.foo` or `a[\"foo\"]`",
    $propdoc: {
        expression: "[AST_Node] the “container” expression",
        property: "[AST_Node|string] the property to access.  For AST_Dot this is always a plain string, while for AST_Sub it's an arbitrary AST_Node"
    }
});
var AST_Dot = DEFNODE("Dot", null, {
    $documentation: "A dotted property access expression",
    _walk: function(visitor) {
        return visitor._visit(this, function() {
            this.expression._walk(visitor);
        });
    }
}, AST_PropAccess);
var AST_Sub = DEFNODE("Sub", null, {
    $documentation: "Index-style property access, i.e. `a[\"foo\"]`",
    _walk: function(visitor) {
    }
}, AST_PropAccess);
var AST_Symbol = DEFNODE("Symbol", "scope name thedef", {
});
var AST_SymbolRef = DEFNODE("SymbolRef", null, {
    $documentation: "Reference to some symbol (not definition/declaration)",
}, AST_Symbol);
