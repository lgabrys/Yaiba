arrow_1: {
    input: {
        console.log.apply(console, ((...a) => a)("PASS", 42));
    }
}
arrow_2: {
    input: {
        console.log.apply(console, ((a, ...b) => b)("FAIL", "PASS", 42));
    }
}
arrow_destructured_array_1: {
    input: {
        console.log.apply(console, (([ ...a ]) => a)("PASS"));
    }
}
arrow_destructured_array_2: {
    input: {
        console.log.apply(console, (([ a, ...b ]) => b)([ "FAIL", "PASS", 42 ]));
    }
}
arrow_destructured_array_3: {
    input: {
        console.log((([ [ ...a ] = "FAIL" ]) => a)([ "PASS" ]).join("|"));
    }
}
arrow_destructured_object_1: {
    input: {
        var f = ({ ...a }) => a, o = f({ PASS: 42 });
        for (var k in o)
            console.log(k, o[k]);
    }
}
arrow_destructured_object_2: {
    input: {
        var f = ({ FAIL: a, ...b }) => b, o = f({ PASS: 42, FAIL: null });
        for (var k in o)
            console.log(k, o[k]);
    }
}
arrow_destructured_object_3: {
    input: {
        var f = ([ { ...a } = [ "FAIL" ] ]) => a;
        var o = f([ "PASS" ]);
        for (var k in o)
            console.log(k, o[k]);
    }
}
funarg_1: {
    input: {
        console.log.apply(console, function(...a) {
            return a;
        }("PASS", 42));
    }
}
funarg_2: {
    input: {
        console.log.apply(console, function(a, ...b) {
            return b;
        }("FAIL", "PASS", 42));
    }
}
destructured_array_1: {
    input: {
        var [ ...a ] = [ "PASS", 42 ];
    }
}
destructured_array_2: {
    input: {
        var [ a, ...b ] = [ "FAIL", "PASS", 42 ];
    }
}
destructured_object_2: {
    input: {
        var { 0: a, ...b } = [ "FAIL", "PASS", 42 ];
    }
}
drop_fargs: {
    options = {
        keep_fargs: false,
        rests: true,
        unused: true,
    }
    input: {
        console.log(function(a, ...b) {
            return b[0];
        }("FAIL", "PASS"));
    }
    expect: {
        console.log(function(b) {
            return b[0];
        }([ "PASS" ]));
    }
}
inline: {
    options = {
        inline: true,
        toplevel: true,
    }
    input: {
        console.log(function(a, ...[ b, c ]) {
            return c + b + a;
        }("SS", "A", "P"));
    }
    expect: {
        var a, b, c;
    }
}
retain_var: {
    options = {
        unused: true,
    }
    input: {
        var [ ...a ] = [ "PASS" ];
    }
    expect: {
        var [ ...a ] = [ "PASS" ];
    }
    node_version: ">=6"
}
reduce_destructured_array: {
    options = {
        reduce_vars: true,
        rests: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var [ ...a ] = [ "PASS" ];
    }
}
reduce_destructured_object: {
    options = {
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var { ...a } = [ "PASS" ];
    }
}
retain_destructured_array: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        var [ a, ...b ] = [ "FAIL", "PASS", 42 ];
    }
    expect: {
        var [ ...b ] = [ "PASS", 42 ];
    }
}
retain_destructured_object_1: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        var { 0: a, ...b } = [ "FAIL", "PASS", 42 ];
        for (var k in b)
            console.log(k, b[k]);
    }
    expect: {
        var { 0: a, ...b } = [ "FAIL", "PASS", 42 ];
        for (var k in b)
            console.log(k, b[k]);
    }
}
retain_destructured_object_2: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        var { foo: [ a ], ...b } = { foo: [ "FAIL" ], bar: "PASS", baz: 42 };
        for (var k in b)
            console.log(k, b[k]);
    }
    expect: {
        var { foo: {}, ...b } = { foo: 0, bar: "PASS", baz: 42 };
        for (var k in b)
            console.log(k, b[k]);
    }
    expect_stdout: [
        "bar PASS",
    ]
}

retain_funarg_destructured_array_1: {
    options = {
        inline: true,
        keep_fargs: false,
        pure_getters: "strict",
        unused: true,
    }
    input: {
        console.log((([ ...a ]) => a)([ "PASS" ])[0]);
    }
    expect: {
        console.log((([ ...a ]) => a)([ "PASS" ])[0]);
    }
}

retain_funarg_destructured_array_2: {
    options = {
        unused: true,
    }
    input: {
        console.log(function([ a, ...b ]) {
            return b;
        }("bar")[1]);
    }
    expect: {
        console.log(function([ , ...b ]) {
            return b;
        }("bar")[1]);
    }
    expect_stdout: "r"
}

retain_funarg_destructured_object_1: {
    options = {
        inline: true,
        keep_fargs: false,
        pure_getters: "strict",
        unused: true,
    }
    input: {
        console.log((({ ...a }) => a)([ "PASS" ])[0]);
    }
    expect: {
        console.log((({ ...a }) => a)([ "PASS" ])[0]);
    }
}
retain_funarg_destructured_object_2: {
    options = {
        unused: true,
    }
    input: {
        console.log(function({ p: a, ... b }) {
            return b;
        }({ p: "FAIL" }).p || "PASS");
    }
    expect: {
        console.log(function({ p: a, ... b }) {
            return b;
        }({ p: "FAIL" }).p || "PASS");
    }
}
drop_unused_call_args_1: {
    options = {
        rests: true,
        unused: true,
    }
    input: {
        (function(...a) {
            console.log(a[0]);
        })(42, console.log("PASS"));
    }
    expect: {
        (function(a) {
            console.log(a[0]);
        })([ 42, console.log("PASS") ]);
    }
}
drop_unused_call_args_2: {
    options = {
        keep_fargs: false,
        rests: true,
        unused: true,
    }
    input: {
        console.log(function(a, ...b) {
            return b;
        }(console).length);
    }
    expect: {
        console.log(function(b) {
            return b;
        }((console, [])).length);
    }
}
maintain_position: {
    options = {
        unused: true,
    }
    input: {
        A = "FAIL";
        var [ , ...a ] = [ A, "PASS" ];
    }
    expect: {
        A = "FAIL";
        var [ , ...a ] = [ A, "PASS" ];
    }
}
merge_funarg: {
    options = {
        merge_vars: true,
    }
    input: {
        (function(...a) {
            var b = a.length;
        })();
    }
    expect: {
        (function(...b) {
            var b = b.length;
        })();
    }
}
merge_funarg_destructured_array: {
    options = {
        merge_vars: true,
    }
    input: {
        (function([ ...a ]) {
            var b = a.length;
        })([]);
    }
    expect: {
        (function([ ...b ]) {
            var b = b.length;
        })([]);
    }
}
merge_funarg_destructured_object: {
    options = {
        merge_vars: true,
    }
    input: {
        (function({ ...a }) {
            var b = a[0];
            console.log(b);
        })([ "PASS" ]);
    }
    expect: {
        (function({ ...b }) {
            var b = b[0];
        })([ "PASS" ]);
    }
}
keep_arguments: {
    options = {
        arguments: true,
        keep_fargs: false,
    }
    input: {
        (function(...[ {} ]) {
            console.log(arguments[0]);
        })("PASS");
    }
    expect: {
        (function(...[ {} ]) {
            console.log(arguments[0]);
        })("PASS");
    }
}
drop_rest_array: {
    options = {
        rests: true,
    }
    input: {
        var [ ...[ a ] ] = [ "PASS" ];
    }
    expect: {
        var [ a ] = [ "PASS" ];
    }
}
drop_rest_arrow: {
    options = {
        arrows: true,
        keep_fargs: false,
        reduce_vars: true,
        rests: true,
    }
    input: {
        console.log(((...[ a ]) => a)("PASS"));
    }
    expect: {
        console.log((a => a)("PASS"));
    }
}
drop_rest_lambda: {
    options = {
        keep_fargs: false,
        reduce_vars: true,
        rests: true,
        toplevel: true,
    }
    input: {
        function f(...[ a ]) {
            return a;
        }
    }
    expect: {
        function f(a) {
            return a;
        }
    }
}
keep_rest_array: {
    options = {
        rests: true,
    }
    input: {
        var [ ...[ ...a ] ] = "PASS";
    }
    expect: {
        var [ ...a ] = "PASS";
        console.log(a.join(""));
    }
}
keep_rest_arrow: {
    options = {
        arrows: true,
        keep_fargs: false,
        reduce_vars: true,
        rests: true,
    }
    input: {
        console.log(((...[ ...a ]) => a.join(""))("PASS"));
    }
    expect: {
        console.log(((...a) => a.join(""))("PASS"));
    }
}
keep_rest_lambda_1: {
    options = {
        keep_fargs: false,
        reduce_vars: true,
        rests: true,
        toplevel: true,
    }
    input: {
        function f(...[ ...a ]) {
            return a.join("");
        }
    }
    expect: {
        function f(...a) {
            return a.join("");
        }
    }
}
keep_rest_lambda_2: {
    options = {
        unused: true,
    }
    input: {
        function f(...[ ...a ]) {
            return a.join("");
        }
        console.log(f("PASS"), f([ 42 ]));
    }
    expect: {
        function f(...[ ...a ]) {
            return a.join("");
        }
    }
}
issue_4525_1: {
    options = {
        arguments: true,
    }
    input: {
        console.log(function(a, ...[]) {
            a = "FAIL";
        }("PASS"));
    }
    expect: {
        console.log(function(a, ...[]) {
            a = "FAIL";
        }("PASS"));
    }
}
issue_4525_2: {
    options = {
        unused: true,
    }
    input: {
        console.log(function(a, ...[]) {
            a = "FAIL";
        }("PASS"));
    }
    expect: {
        console.log(function(a, ...[]) {
            a = "FAIL";
        }("PASS"));
    }
}
issue_4538: {
    options = {
        rests: true,
        unused: true,
    }
    input: {
        console.log(typeof function f(...a) {
            return a.p, f;
        }()());
    }
    expect: {
        console.log(typeof function f(...a) {
            return a.p, f;
        }()());
    }
}
issue_4544_1: {
    options = {
        keep_fnames: true,
        side_effects: true,
    }
    input: {
        try {
            (function f(...[ {} ]) {})();
        } catch (e) {
            console.log("PASS");
        }
    }
    expect: {
        try {
        } catch (e) {
            console.log("PASS");
        }
    }
}
issue_4544_2: {
    options = {
        keep_fnames: true,
        side_effects: true,
    }
    input: {
        try {
            (function f(a, ...[ {} ]) {})([]);
        } catch (e) {
            console.log("PASS");
        }
    }
    expect: {
        try {
        } catch (e) {
            console.log("PASS");
        }
    }
}
issue_4560_1: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        var a = 0;
        (function(...{
            [a++]: {},
        }) {})(2);
    }
    expect: {
        var a = 0;
        (function(...{
            [a++]: {},
        }) {})(2);
    }
}
issue_4560_2: {
    options = {
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = 0;
        (function(...{
            [a++]: {},
        }) {})(2);
    }
    expect: {
        var a = 0;
        (function(...{
            [a++]: {},
        }) {})(2);
    }
}
issue_4560_3: {
    options = {
        collapse_vars: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        var a = 0, b;
        [ ...{
            [a++]: b,
        } ] = [ "PASS" ];
    }
    expect: {
        var a = 0, b;
        [ ...{
            [a++]: b,
        } ] = [ "PASS" ];
    }
}
issue_4562: {
    options = {
        evaluate: true,
        reduce_vars: true,
        rests: true,
        unsafe: true,
    }
    input: {
        console.log((([ ...[ a ] ]) => a)("foo"));
    }
    expect: {
        console.log((([ a ]) => a)("foo"));
    }
}
issue_4575: {
    options = {
        collapse_vars: true,
        ie8: true,
        reduce_vars: true,
        rests: true,
        unused: true,
    }
    input: {
        (function(a) {
            var b = a;
        })();
    }
}
