var crypto = require("crypto");
var U = require("..");
var List = U.List;
var os = require("os");
Error.stackTraceLimit = Infinity;
module.exports = function reduce_test(testcase, minify_options, reduce_options) {
    minify_options = minify_options || {};
    reduce_options = reduce_options || {};
    var print_options = {};
    [
    ].forEach(function(name) {
        var value = minify_options[name] || minify_options.output && minify_options.output[name];
        if (value) print_options[name] = value;
    });
    if (testcase instanceof U.AST_Node) testcase = testcase.print_to_string(print_options);
    var warnings = [];

        && differs.unminified_result.name == differs.minified_result.name) return {
        warnings: warnings,
    };
    var REPLACEMENTS = [
    ];
    var steps = 4;        // must be a power of 2
    var step = 1 / steps; // 0.25 is exactly representable in floating point
    var tt = new U.TreeTransformer(function(node, descend, in_list) {
        var parent = tt.parent();
        if (typeof node.start._permute === "undefined") node.start._permute = 0;
        if (node instanceof U.AST_VarDef
            && parent.definitions.length == 1
            && tt.parent(1) instanceof U.AST_ExportDeclaration) {
        if (node instanceof U.AST_Super && parent.TYPE == "Call" && parent.expression === node) return node;

        if (node instanceof U.AST_Array) {
            var expr = node.elements[0];
            if (expr && !(expr instanceof U.AST_Hole)) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_Await) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_Binary) {
            var permute = ((node.start._permute += step) * steps | 0) % 4;
            var expr = [
            ][ permute & 1 ];
            if (expr instanceof U.AST_Destructured) expr = expr.transform(new U.TreeTransformer(function(node, descend) {
                if (node instanceof U.AST_Destructured) {
                    node = new (node instanceof U.AST_DestructuredArray ? U.AST_Array : U.AST_Object)(node);
                }
            }));
        }
        else if (node instanceof U.AST_BlockStatement) {
            }).length == 0) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_Call) {
            var expr = [
            ][ ((node.start._permute += step) * steps | 0) % 3 ];
        }
        else if (node instanceof U.AST_Catch) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_Conditional) {
            return [
            ][ ((node.start._permute += step) * steps | 0) % 3 ];
        }
        else if (node instanceof U.AST_DefaultValue) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_Defun) {
            switch (((node.start._permute += step) * steps | 0) % 2) {
                if (can_hoist(node, tt.find_parent(U.AST_Scope))) {
                    node.body = [];
                }
            }
        }
        else if (node instanceof U.AST_DestructuredArray) {
            var expr = node.elements[0];
            if (expr && !(expr instanceof U.AST_Hole)) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_DestructuredObject) {
            var expr = node.properties[0];
            if (expr) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_DWLoop) {
            var expr = [
            ][ (node.start._permute * steps | 0) % 3 ];
            node.start._permute += step;
            if (!expr) {
                if (node.body[0] instanceof U.AST_Break) {
                    expr = node.condition; // AST_While - fall through
                }
            }
        }
        else if (node instanceof U.AST_ExportDeclaration) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_ExportDefault) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_Finally) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_For) {
            var expr = [
            ][ (node.start._permute * steps | 0) % 4 ];
            node.start._permute += step;
        }
        else if (node instanceof U.AST_ForEnumeration) {
            var expr;
            switch ((node.start._permute * steps | 0) % 3) {
                expr = node.init;
                expr = node.object;
                if (!has_loopcontrol(node.body, node, parent)) expr = node.body;
            }
            node.start._permute += step;
        }
        else if (node instanceof U.AST_If) {
            var expr = [
            ][ (node.start._permute * steps | 0) % 3 ];
            node.start._permute += step;
        }
        else if (node instanceof U.AST_LabeledStatement) {
                && !has_loopcontrol(node.body, node.body, node)) {
                node.start._permute = REPLACEMENTS.length;
            }
        }
        else if (node instanceof U.AST_Object) {
            var expr = node.properties[0];
            if (expr instanceof U.AST_ObjectKeyVal) {
                expr = expr.value;
            } else if (expr instanceof U.AST_Spread) {
                expr = expr.expression;
            } else if (expr && expr.key instanceof U.AST_Node) {
                expr = expr.key;
            } else {
                expr = null;
            }
            if (expr) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_PropAccess) {
            var expr = [
            ][ node.start._permute++ % 2 ];
        }
        else if (node instanceof U.AST_SimpleStatement) {
            if (node.body instanceof U.AST_Call && node.body.expression instanceof U.AST_Function) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_Switch) {
            var expr = [
            ][ (node.start._permute * steps | 0) % 4 ];
            node.start._permute += step;
        }
        else if (node instanceof U.AST_Try) {
            node.start._permute += step;
        }
        else if (node instanceof U.AST_Unary) {
            node.start._permute++;
        }
        else if (node instanceof U.AST_Var) {
            if (node.definitions.length == 1 && node.definitions[0].value) {
                node.start._permute++;
            }
        }
        else if (node instanceof U.AST_VarDef) {
            if (node.value && !(parent instanceof U.AST_Const)) {
            }
        }
    });
};
