redefine_arguments_1: {
    options = {
        toplevel: false,
        unused: true,
    }
    input: {
        function f([ arguments ]) {}
    }
    expect: {
        function f([]) {}
    }
    expect_stdout: true
    node_version: ">=8"
}

redefine_arguments_1_toplevel: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        function f([ arguments ]) {}
    }
    expect: {}
    expect_stdout: true
    node_version: ">=8"
}

redefine_arguments_2: {
    options = {
        side_effects: true,
    }
    input: {
        (function([], arguments) {});
    }
}
redefine_arguments_3: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        (function([], arguments) {})([]);
    }
}
redefine_arguments_4: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        function f() {
            (function({}, arguments) {});
        }
    }
    node_version: ">=8"
}
uses_arguments_1_merge_vars: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(typeof function({}) {
            return arguments;
        }(42));
    }
}
uses_arguments_1_unused: {
    options = {
        unused: true,
    }
    input: {
        console.log(typeof function({}) {
            return arguments;
        }(42));
    }
}
uses_arguments_2: {
    options = {
        collapse_vars: true,
        reduce_vars: true,
    }
    input: {
        console.log(typeof function({ a }) {
            a[1] = 2;
        }({ a: 42 }));
    }
}
funarg_merge_vars_1: {
    options = {
        merge_vars: true,
    }
    input: {
        function f(a, {
            [a]: b
        }) {
            console.log(b);
        }
    }
}
funarg_merge_vars_2: {
    options = {
        merge_vars: true,
    }
    input: {
        var a = 0;
    }
    expect: {
        var a = 0;
    }
}
funarg_side_effects_1: {
    options = {
        side_effects: true,
    }
    input: {
        try {
            (function({}) {})();
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
funarg_side_effects_2: {
    options = {
        side_effects: true,
    }
    input: {
        try {
            (function({
                [(a, 0)]: a,
            }) {})(1);
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
funarg_side_effects_3: {
    options = {
        side_effects: true,
    }
    input: {
        try {
            (function({
                p: {
                    [(a, 0)]: a,
                },
            }) {})({
                p: 1,
            });
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
funarg_unused_1: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        (function([]) {})([ console.log("PASS") ]);
    }
}
funarg_unused_2: {
    options = {
        unused: true,
    }
    input: {
        function f([ a, b, c ]) {
            console.log(b);
        }
    }
}
funarg_unused_3: {
    options = {
        objects: true,
        evaluate: true,
        unused: true,
    }
    input: {
        function f({
            [0]: a,
        }) {
            return "PASS";
        }
    }
    expect_stdout: "PASS"
    node_version: ">=6"
}
funarg_unused_4: {
    options = {
        keep_fargs: false,
        pure_getters: "strict",
        unused: true,
    }
    input: {
        console.log(function([ a ], { b }, c) {
            return "PASS";
        }([ 1 ], { b: 2 }, 3));
    }
    expect: {
        console.log(function() {
            return "PASS";
        }());
    }
}
funarg_unused_5: {
    options = {
        unused: true,
    }
    input: {
        try {
            (function({
                [c = 0]: c
            }) {})(1);
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
funarg_unused_6_inline: {
    options = {
        inline: true,
        pure_getters: "strict",
        unused: true,
    }
    input: {
        (function(a) {
            var {} = (a = console, 42);
        })();
        console.log(typeof a);
    }
}
funarg_unused_6_keep_fargs: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        (function(a) {
            var {} = (a = console, 42);
        })();
    }
    expect: {
        (function() {
            var {} = 42;
        })();
    }
}

funarg_collapse_vars_1: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        console.log(function(a, {}) {
            return typeof a;
        }(console, {}));
    }
}
funarg_collapse_vars_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function([ a ], { b }, c) {
            return a + b + c;
        }([ "P" ], { b: "A" }, "SS"));
    }
    expect: {
        console.log(function([ a ], { b }) {
            return a + b + "SS";
        }([ "P" ], { b: "A" }));
    }
}
funarg_collapse_vars_3: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a = "FAIL";
        try {
            a = "PASS";
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a = "FAIL";
        try {
            a = "PASS";
        } catch (e) {
            console.log(a);
        }
    }
}
funarg_collapse_vars_4: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
    }
}
funarg_collapse_vars_5: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        A = "FAIL";
        B = "PASS";
        try {
            console.log(function({}, a) {
            }(null, A = B));
        } catch (e) {}
        console.log(A);
    }
    expect: {
        A = "FAIL";
        B = "PASS";
        try {
            console.log(function({}, a) {
            }(null, A = B));
        } catch (e) {}
        console.log(A);
    }
}
funarg_collapse_vars_6: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        A = "FAIL";
        B = "PASS";
        function f() {
            console.log(function({}, a) {
            }(null, A = B));
        }
        try {
        } catch (e) {
            console.log(A);
        }
    }
    expect: {
        A = "FAIL";
        B = "PASS";
        function f() {
            console.log(function({}, a) {
            }(null, A = B));
        }
        try {
        } catch (e) {
            console.log(A);
        }
    }
}
funarg_reduce_vars_1: {
    options = {
        reduce_vars: true,
        unused: true,
    }
    input: {
        try {
            (function({
                [a]: b,
            }, a) {
                console.log("FAIL");
            })({});
        } catch (e) {
            console.log("PASS");
        }
    }
    expect: {
        try {
            (function({
                [a]: b,
            }, a) {
                console.log("FAIL");
            })({});
        } catch (e) {
            console.log("PASS");
        }
    }
}
funarg_reduce_vars_2: {
    options = {
        evaluate: true,
        keep_fargs: false,
        pure_getters: "strict",
        reduce_vars: true,
        unsafe: true,
        unused: true,
    }
    input: {
        console.log(function([ a ], { b }, c) {
            return a + b + c;
        }([ "P" ], { b: "A" }, "SS"));
    }
    expect_stdout: "PASS"
}
funarg_reduce_vars_3: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        var a = 0;
        (function({
            [a++]: b
        }) {})(0);
    }
    expect: {
        var a = 0;
        (function({
            [a++]: b
        }) {})(0);
    }
}
funarg_reduce_vars_4: {
    options = {
        evaluate: true,
        reduce_vars: true,
    }
    input: {
        try {
            (function f({
                [a = 1]: a,
            }) {})(2);
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
funarg_computed_key_scope_1: {
    rename = true
    input: {
        var b = 0;
    }
    expect: {
        var b = 0;
    }
}
funarg_computed_key_scope_2: {
    options = {
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function({
            [function() {
                console.log(typeof f);
            }()]: a
        }) {
            function f() {}
        })(0);
    }
}
funarg_computed_key_scope_3: {
    options = {
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function({
            [function() {
                (function({
                    [function() {
                        console.log(typeof f, typeof g, typeof h);
                    }()]: a
                }) {
                    function f() {}
                })(1);
                function g() {}
            }()]: b
        }) {
            function h() {}
        })(2);
    }
}
funarg_inline: {
    options = {
        inline: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        try {
            function f({}) {
                return 42;
            }
            var a = f();
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
process_returns: {
    options = {
        booleans: true,
    }
    input: {
        console.log(function({ length }) {
            return length ? "FAIL" : "PASS";
        }));
    }
}
simple_const: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
        varify: true,
    }
    input: {
        const [ a ] = [ "PASS" ];
    }
}
simple_let: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
        varify: true,
    }
    input: {
        let [ a ] = [ "PASS" ];
    }
}
simple_var: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var [ a ] = [ "PASS" ];
    }
}
drop_catch: {
    options = {
        dead_code: true,
    }
    input: {
        try {} catch ({
            [console.log("FAIL")]: e,
        }) {} finally {
            console.log("PASS");
        }
    }
}
drop_catch_var: {
    options = {
        unused: true,
    }
    input: {
        try {
            throw new Error("PASS");
        } catch ({ name, message }) {
    }
    expect: {
        try {
        } catch ({ message }) {
        }
    }
}
collapse_vars_1: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a = "PASS";
        var {
            [a.p]: a,
        } = !console.log(a);
    }
    expect: {
        var a = "PASS";
        var {
            [a.p]: a,
        } = !console.log(a);
    }
}
collapse_vars_2: {
    options = {
        collapse_vars: true,
    }
    input: {
        console.log(function() {
            [] = [];
        }());
    }
}
collapse_vars_3: {
    options = {
        collapse_vars: true,
    }
    input: {
        console.log(function(a) {
            [ a ] = (a = "FAIL", [ "PASS" ]);
        }());
    }
}
collapse_vars_4: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a;
        try {
            a = 42;
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a;
        try {
            a = 42;
        } catch (e) {
            console.log(a);
        }
    }
}
collapse_vars_5: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a;
        try {
            [] = (a = 42, null);
            a = 42;
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a;
        try {
            [] = (a = 42, null);
            a = 42;
        } catch (e) {
            console.log(a);
        }
    }
}
collapse_vars_6: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a;
        try {
            var [] = (a = 42, null);
            a = 42;
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a;
        try {
            var [] = (a = 42, null);
            a = 42;
        } catch (e) {
            console.log(a);
        }
    }
}
collapse_vars_7: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a = "FAIL";
        try {
            (function() {
                [] = (a = "PASS", null);
            })();
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a = "FAIL";
        try {
            (function() {
                [] = (a = "PASS", null);
            })();
        } catch (e) {
            console.log(a);
        }
    }
}
collapse_vars_8: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a = "FAIL";
        try {
            (function() {
                var {} = (a = "PASS", null);
            })();
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a = "FAIL";
        try {
            (function() {
                var {} = (a = "PASS", null);
            })();
        } catch (e) {
            console.log(a);
        }
    }
    expect_stdout: "PASS"
}
collapse_vars_9: {
    options = {
        collapse_vars: true,
    }
    input: {
        console.log(function(a) {
            try {
                var b = function([ c ]) {
                    if (c)
                        return "FAIL 1";
                }();
                a = "FAIL 2";
            } catch (e) {
        }("PASS"));
    }
}
conditionals: {
    options = {
        conditionals: true,
    }
    input: {
        if (console.log("PASS")) {
            var [] = 0;
        }
    }
}
dead_code: {
    options = {
        conditionals: true,
        dead_code: true,
        evaluate: true,
    }
    input: {
        if (0) {
            let [] = 42;
            var { a, b: [ c ] } = null;
        }
    }
    expect: {
        var a, c;
    }
}
drop_unused_1: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        switch (0) {
          case console.log(a, a):
            try {
                throw 42;
            } catch (a) {
                var [ a ] = [];
            }
        }
    }
    expect: {
        switch (0) {
            try {
            } catch (a) {
                var a = [][0];
            }
        }
    }
}
drop_unused_2: {
    options = {
        merge_vars: true,
        pure_getters: "strict",
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        function f(a) {
            var b = [ console.log("PASS"), a ], {
                p: a,
            } = 0;
        }
    }
}
drop_hole: {
    options = {
        unused: true,
    }
    input: {
        var [ a ] = [ , ];
    }
    expect: {
        var a = [][0];
    }
}
keep_key_1: {
    options = {
        evaluate: true,
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = {
            [(console.log("PASS"), 42)]: null,
        });
    }
}
keep_key_2: {
    options = {
        evaluate: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var { 42: a } = { [(console.log("PASS"), 42)](){} };
    }
}
keep_key_2_pure_getters: {
    options = {
        evaluate: true,
        pure_getters: "strict",
        toplevel: true,
        unused: true,
    }
    input: {
        var { 42: a } = { [(console.log("PASS"), 42)](){} };
    }
}
keep_reference: {
    options = {
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = [ {}, 42 ];
        var [ b, c ] = a;
    }
    expect: {
        var a = [ {}, 42 ];
        var b = a[0];
    }
}
