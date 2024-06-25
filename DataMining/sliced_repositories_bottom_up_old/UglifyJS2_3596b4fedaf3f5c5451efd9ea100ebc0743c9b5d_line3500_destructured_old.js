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
            console;
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
        console.log(a);
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
        function f({
            [b]: a
        }) {
            var b = 42;
        }
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
    expect: {
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
        var [ b ] = a;
    }
}
maintain_position_assign: {
    options = {
        unused: true,
    }
    input: {
        console.log(([ , ] = [ , "PASS" ])[1]);
    }
}
maintain_position_var: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        A = "FAIL";
        var [ a, b ] = [ A ];
    }
    expect: {
        A = "FAIL";
        var [ , b ] = [ A ];
    }
}
side_effects_array: {
    options = {
        unused: true,
    }
    input: {
        try {
            var [ a ] = 42;
        } catch (e) {
            console.log("PASS");
        }
    }
    expect: {
        try {
            var [ a ] = 42;
        } catch (e) {
            console.log("PASS");
        }
    }
}
side_effects_object: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        var a = null, b = console, { c } = 42;
        try {
            c[a = "PASS"];
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        var a = null, c = (console, 42["c"]);
        try {
            c[a = "PASS"];
        } catch (e) {
            console.log(a);
        }
    }
}
join_vars: {
    options = {
        conditionals: true,
        join_vars: true,
    }
    input: {
        const [ a ] = [ "PASS" ];
    }
    expect: {
        const [ a ] = [ "PASS" ];
        a,
        console.log(a);
    }
}
keep_fargs: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function f(a) {
            var {} = a;
        }(0));
    }
}
reduce_vars_1: {
    options = {
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a;
    }
    expect: {
        var a;
    }
}
reduce_vars_2: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = "FAIL", b = 42;
        ({
            [console.log(a, b)]: b.p
        } = a = "PASS");
    }
}
computed_key_evaluate: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        var a = 0, {
            [++a]: b,
        } = [ "FAIL 1", a ? "FAIL 2" : "PASS" ];
    }
    expect: {
        var a = 0, {
            [1]: b,
        } = [ "FAIL 1", 0 ? "FAIL 2" : "PASS" ];
    }
}
computed_key_unused: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        var {
            [console.log("bar")]: a,
            [console.log("baz")]: { b },
            [console.log("moo")]: [
                c,
                {
                    [console.log("moz")]: d,
                    e,
                },
            ],
        } = {
            [console.log("foo")]: [ null, 42 ],
        };
    }
    expect: {
        var {
            [console.log("bar")]: a,
            [console.log("baz")]: {},
            [console.log("moo")]: [
                ,
                {
                    [console.log("moz")]: d,
                },
            ],
        } = {
            [console.log("foo")]: [ null, 42 ],
        };
    }
}
for_in_1: {
    options = {
        loops: true,
        toplevel: true,
        unused: true,
    }
    input: {
        for (var { a } in console.log("PASS"));
    }
    expect: {
        for (var { a } in console.log("PASS"));
    }
}
for_in_2: {
    options = {
        join_vars: true,
    }
    input: {
        var a;
        for (var { b } in console.log("PASS"));
    }
    expect: {
        var a, b;
    }
}
for_in_3: {
    options = {
        merge_vars: true,
        reduce_vars: true,
    }
    input: {
        for (var { length: a } in [ 42 ])
            console.log(a);
    }
    expect: {
        for (var { length: a } in [ 42 ])
            console.log(a);
    }
}
fn_name_evaluate: {
    options = {
        evaluate: true,
        objects: true,
        reduce_vars: true,
        typeofs: true,
    }
    input: {
        console.log(function f({
            [typeof f]: a,
        }) {
            var f;
        }({
        }));
    }
}
fn_name_unused: {
    options = {
        unused: true,
    }
    input: {
        console.log(function f({
            [typeof f]: a,
        }) {
            var f;
        }({
        }));
    }
}
hoist_vars: {
    options = {
        hoist_vars: true,
    }
    input: {
        var a = "PASS";
        var [ b ] = [ 42 ];
    }
    expect: {
        var a = "PASS";
        var [ b ] = [ 42 ];
    }
}
singleton_1: {
    options = {
        pure_getters: true,
        side_effects: true,
        unused: true,
    }
    input: {
        var [ a ] = "P", b, o = {};
        [ b = "S" ] = [];
    }
    expect: {
        var b, a = "P"[0], o = {};
        o.p = [ "FAIL"["1"] ][0];
        o.q = { foo: "S"[0] }["foo"];
        [ b = "S" ] = [];
    }
}
singleton_2: {
    options = {
        evaluate: true,
        passes: 2,
        pure_getters: true,
        side_effects: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var [ a ] = "P", b, o = {};
        [ b = "S" ] = [];
    }
    expect: {
        var b, a = "P", o = {};
        o.p = "A";
        o.q = "S";
        [ b = "S" ] = [];
    }
}
singleton_side_effects: {
    options = {
        side_effects: true,
        unused: true,
    }
    input: {
        [ 42[console.log("foo")] ] = [ console.log("bar") ];
    }
}
issue_4280: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var {
            1: a,
        } = 2;
    }
}
issue_4282: {
    options = {
        evaluate: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function(a) {
            ({
                [a = "bar"]: 0[console.log(a)],
            } = 0);
        })("foo");
    }
}
issue_4284_1: {
    options = {
        dead_code: true,
    }
    input: {
        var a, {
            0: b,
        } = a = "foo";
    }
    expect: {
        var a, {
            0: b,
        } = a = "foo";
    }
}
issue_4284_2: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a, {
            [console.log(a)]: b,
        } = (a = "PASS", 0);
        var c = a;
    }
    expect: {
        var a, {
            [console.log(a)]: b,
        } = (a = "PASS", 0);
        var c = a;
    }
}
issue_4284_3: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a, b;
        ({
            [console.log(a)]: b,
        } = (a = "PASS", 0));
        var c = a;
    }
    expect: {
        var a, b;
        ({
            [console.log(a)]: b,
        } = (a = "PASS", 0));
        var c = a;
    }
}
issue_4286_1: {
    options = {
        collapse_vars: true,
        toplevel: true,
    }
    input: {
        var a = "PASS", b;
        (0 && a)[{ a } = b = a];
    }
    expect: {
        var a = "PASS", b;
        (0 && a)[{ a } = b = a];
    }
}
issue_4286_2: {
    options = {
        collapse_vars: true,
        toplevel: true,
    }
    input: {
        a = [ "PASS" ];
        var b, { a } = b = a;
    }
    expect: {
        var b, { a } = b = a = [ "PASS" ];
    }
}
issue_4288: {
    options = {
        merge_vars: true,
    }
    input: {
        function f({
            [new function() {
                console.log(typeof b);
            }()]: a,
        }) {
            var b = a;
            b++;
        }
    }
}
issue_4294: {
    options = {
        merge_vars: true,
    }
    input: {
        A = "PASS";
    }
    expect: {
        A = "PASS";
    }
}
issue_4297: {
    options = {
        reduce_vars: true,
        unused: true,
    }
    input: {
        console.log(typeof function(a) {
            return { a } = a;
        }(function() {}));
    }
}
issue_4298: {
    options = {
        merge_vars: true,
    }
    input: {
        (function() {
            var a = {
                object: "PASS",
            };
        })();
    }
}
issue_4301: {
    options = {
        merge_vars: true,
    }
    input: {
        try {
            console.log(function() {
                var a, b = console;
                return {
                    [a = b]: a.p,
                } = "foo";
            }());
        } catch (e) {
            console.log("bar");
        }
    }
    expect: {
        try {
        } catch (e) {
            console.log("bar");
        }
    }
}
issue_4308: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        var a = "PASS";
        console.log(function({
            [a = "FAIL"]: b
        }, c) {
            return c;
        }(0, a));
    }
    expect: {
        var a = "PASS";
        console.log(function({
            [a = "FAIL"]: b
        }, c) {
            return c;
        }(0, a));
    }
}
issue_4312: {
    options = {
        collapse_vars: true,
        inline: true,
        merge_vars: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a;
        (function f(b, c) {
            return function({
                [a = b]: d,
            }) {}(c && c);
        })("PASS", "FAIL");
    }
    expect: {
        var a;
        b = "PASS",
        c = "FAIL",
        [
            {
                [a = b]: d,
            },
        ] = [ c && c ],
        void 0;
        var b, c, d;
    }
}
issue_4315: {
    options = {
        conditionals: true,
        dead_code: true,
        evaluate: true,
        inline: true,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        side_effects: true,
        toplevel: true,
        unused: true,
    }
    input: {
        function f() {
            console;
        }
        var a = function() {
        }(), b;
        do {
        } while (0 && (b = 0), b && a);
    }
    }
}
issue_4319: {
    options = {
        inline: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        function f(a) {
            while (!a);
        }
    }
}
issue_4321: {
    options = {
        inline: 3,
        keep_fargs: false,
    }
    input: {
        try {
            console.log(function({}) {
                return function() {
                    while (!console);
                }();
            }());
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
issue_4323: {
    options = {
        ie: true,
        inline: true,
        merge_vars: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = 0;
    }
    expect: {
        var a = 0;
        var d;
        e = 1,
        console.log,
        void e.p;
        var e;
    }
}
issue_4355: {
    options = {
        loops: true,
        unused: true,
    }
    input: {
        var a;
    }
    expect: {
        var a;
        (function({
            [function() {
                for (a in "foo");
            }()]: b,
        }) {})(0);
    }
}
issue_4372_1: {
    options = {
        dead_code: true,
    }
    input: {
        var a = "FAIL";
        a += {
            [console.log(a)]: a,
        } = a = "PASS";
    }
    expect: {
        var a = "FAIL";
        a += {
            [console.log(a)]: a,
        } = a = "PASS";
    }
}
issue_4372_2: {
    options = {
        dead_code: true,
    }
    input: {
        var a;
        [ a ] = a = [ "PASS", "FAIL" ];
    }
    expect: {
        var a;
        [ a ] = a = [ "PASS", "FAIL" ];
    }
}
issue_4383: {
    options = {
        evaluate: true,
        reduce_vars: true,
        unsafe: true,
    }
    input: {
        console.log(function(a) {
            [ a[0] ] = [];
        }([]));
    }
}
issue_4386: {
    options = {
        arguments: true,
    }
    input: {
        function f({}) {
            return arguments[0];
        }
    }
}
issue_4395: {
    options = {
        arguments: true,
    }
    input: {
        console.log(function(a, {}) {
            a = "FAIL";
        }("PASS", 42));
    }
}
issue_4399: {
    options = {
        arguments: true,
    }
    input: {
        console.log(function({
            [arguments[1]]: a,
        }, b) {
            return a;
        }([ "PASS" ], 0));
    }
}
issue_4420: {
    options = {
        unused: true,
    }
    input: {
        console.log(function() {
            var a = 1;
            }) {
                let a = 0;
            }
        }());
    }
}
issue_4425: {
    rename = true
    input: {
        var a;
    }
    expect: {
        var a;
    }
}
issue_4436_Infinity: {
    options = {
        unused: true,
    }
    input: {
        console.log(function({
            [delete Infinity]: a,
        }) {
            var Infinity;
        }({
        }));
    }
}
issue_4436_NaN: {
    options = {
        unused: true,
    }
    input: {
        console.log(function({
            [delete NaN]: a,
        }) {
            var NaN;
        }({
        }));
    }
}
issue_4436_undefined: {
    options = {
        unused: true,
    }
    input: {
        console.log(function({
            [delete undefined]: a,
        }) {
            var undefined;
        }({
        }));
    }
}
issue_4446: {
    options = {
        collapse_vars: true,
    }
    input: {
        a = "PASS";
        var a = [ a[0] ] = [ a ];
    }
    expect: {
        a = "PASS";
        var a = [ a[0] ] = [ a ];
    }
}
issue_4456: {
    options = {
        pure_getters: "strict",
        unused: true,
    }
    input: {
        var o = {
            set p(v) {
                console.log(v);
            },
        };
    }
    expect: {
        var o = {
            set p(v) {
                console.log(v);
            },
        };
    }
}
issue_4485_1: {
    options = {
        pure_getters: "strict",
        side_effects: true,
    }
    input: {
        (function([]) {
            var arguments;
        })([]);
    }
}
issue_4485_2: {
    options = {
        pure_getters: "strict",
        side_effects: true,
    }
    input: {
        (function([]) {
            var arguments = null;
        })([]);
    }
}
issue_4485_3: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        (function([]) {
            var arguments;
        })([]);
    }
}
issue_4500: {
    options = {
        evaluate: true,
        keep_fnames: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = function f(b) {
            return [ b ] = [], b;
        }("FAIL");
    }
    expect: {
        var a = function f(b) {
            return [ b ] = [], b;
        }("FAIL");
    }
}
issue_4504: {
    options = {
        inline: true,
        merge_vars: true,
    }
    input: {
        A = "FAIL";
    }
    expect: {
        A = "FAIL";
    }
}
issue_4508: {
    options = {
        inline: true,
        toplevel: true,
        unused: true,
    }
    input: {
        for (var i = 0; i < 2; i++)
            })([ "PASS" ]);
    }
    expect: {
        for (var i = 0; i < 2; i++)
            [ [ a ] ] = [ [ "PASS" ] ],
            b = void 0,
            a = console.log(a) && b,
            b = null,
            void 0;
        var a, b;
    }
}
issue_4512: {
    options = {
        side_effects: true,
    }
    input: {
        console.log(function([ a, b = a ]) {}([]));
    }
}
issue_4519_1: {
    options = {
        arguments: true,
        keep_fargs: false,
    }
    input: {
        try {
            (function() {
                var [ arguments ] = [];
            })();
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
issue_4519_2: {
    options = {
        pure_getters: "strict",
        side_effects: true,
    }
    input: {
        try {
            (function() {
                var [ arguments ] = [];
            })();
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
issue_4554: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        A = "PASS";
        var a = "FAIL";
        try {
            (function({}, b) {
            })(void 0, a = A);
        } catch (e) {
            console.log(a);
        }
    }
    expect: {
        A = "PASS";
        var a = "FAIL";
        try {
            (function({}, b) {
            })(void 0, a = A);
        } catch (e) {
            console.log(a);
        }
    }
}
issue_4584: {
    options = {
        evaluate: true,
        reduce_vars: true,
    }
    input: {
        try {
            (function f({
                [console.log(a = "FAIL")]: a,
            }) {})(0);
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
issue_4608_1: {
    options = {
        arguments: true,
        keep_fargs: false,
    }
    input: {
        (function() {
            [ arguments ] = [ "foo" ];
        })();
    }
}
issue_4608_2: {
    options = {
        arguments: true,
        reduce_vars: true,
    }
    input: {
        (function(a) {
            [ arguments ] = [ "foo" ];
        })();
    }
}
issue_4994: {
    options = {
        loops: true,
        unused: true,
    }
    input: {
        var a = "FAIL";
    }
    expect: {
        var a = "FAIL";
        (function([
            {
                [function() {
                    for (a in { PASS: null });
                }()]: b,
            },
        ]) {})([ 42 ]);
    }
}
issue_5017: {
    options = {
        collapse_vars: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        var a = function() {};
        var b = c = a;
        var c = [ c ] = [ c ];
    }
    expect: {
        var b = a;
        var c = [ c ] = [ c = a ];
    }
}
issue_5071_1: {
    options = {
        unused: true,
    }
    input: {
        var a;
    }
    expect: {
        var a;
    }
}
issue_5071_2: {
    options = {
        pure_getters: "strict",
        unused: true,
    }
    input: {
        var a;
    }
    expect: {
        var a;
    }
}
issue_5074_getter: {
    options = {
        evaluate: true,
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = { get [(console.log("PASS"), 42)]() {} });
    }
}
issue_5074_getter_pure_getters: {
    options = {
        evaluate: true,
        pure_getters: "strict",
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = { get [(console.log("PASS"), 42)]() {} });
    }
}
issue_5074_setter: {
    options = {
        evaluate: true,
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = { set [(console.log("PASS"), 42)](v) {} });
    }
}
issue_5074_setter_pure_getters: {
    options = {
        evaluate: true,
        pure_getters: "strict",
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = { set [(console.log("PASS"), 42)](v) {} });
    }
}
issue_5074_method: {
    options = {
        evaluate: true,
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = { [(console.log("PASS"), 42)]() {} });
    }
}
issue_5074_method_pure_getters: {
    options = {
        evaluate: true,
        pure_getters: "strict",
        side_effects: true,
        unused: true,
    }
    input: {
        ({} = { [(console.log("PASS"), 42)]() {} });
    }
}
issue_5085_1: {
    options = {
        evaluate: true,
        passes: 2,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var a = "PASS";
        var [ b ] = [ 42, a ], c = b ? 0 : a = "FAIL";
    }
    expect: {
        var a = "PASS";
    }
}
issue_5085_2: {
    options = {
        evaluate: true,
        passes: 2,
        reduce_vars: true,
        side_effects: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var a = "PASS";
        (function(b) {
            [ b ] = [ 42, a ];
            var c = b ? 0 : a = "FAIL";
        })();
    }
    expect: {
        var a = "PASS";
    }
}
issue_5087_1: {
    options = {
        collapse_vars: true,
        inline: true,
        properties: true,
        sequences: true,
        side_effects: true,
        unused: true,
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
    }
}
issue_5087_2: {
    options = {
        collapse_vars: true,
        inline: true,
        passes: 2,
        properties: true,
        reduce_vars: true,
        sequences: true,
        side_effects: true,
        unused: true,
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
    }
}
issue_5114_1: {
    options = {
        inline: true,
        unused: true,
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
    }
}
issue_5114_2: {
    options = {
        inline: true,
        pure_getters: "strict",
        reduce_vars: true,
        side_effects: true,
        unused: true,
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
    }
}
issue_5114_3: {
    options = {
        inline: true,
        pure_getters: "strict",
        reduce_vars: true,
        side_effects: true,
        unused: true,
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
    }
}
issue_5153_array_assign: {
    options = {
        dead_code: true,
    }
    input: {
        var a = function*() {
            yield b;
        }(), b;
        [ b ] = b = a;
    }
    expect: {
        var a = function*() {
        }(), b;
        [ b ] = b = a;
    }
}
issue_5153_array_var: {
    options = {
        dead_code: true,
    }
    input: {
        var a = function*() {
            yield b;
        }(), [ b ] = b = a;
    }
    expect: {
        var a = function*() {
        }(), [ b ] = b = a;
    }
}
issue_5153_object_assign: {
    options = {
        dead_code: true,
    }
    input: {
        var a = {
            get p() {
                return b;
            },
        }, b;
        ({
            p: b
        } = b = a);
    }
    expect: {
        var a = {
            get p() {
                return b;
            },
        }, b;
        ({
            p: b
        } = b = a);
    }
}
issue_5153_object_var: {
    options = {
        dead_code: true,
    }
    input: {
        var a = {
            get p() {
                return b;
            },
        }, {
            p: b
        } = b = a;
    }
    expect: {
        var a = {
            get p() {
                return b;
            },
        }, {
            p: b
        } = b = a;
    }
}
issue_5168: {
    options = {
        collapse_vars: true,
    }
    input: {
        (function a({
            [console.log(typeof function() {
                ++a;
            }())]: b,
        }) {
            var a;
        })({});
    }
}
issue_5189_1: {
    options = {
        pure_getters: "strict",
        reduce_vars: true,
        side_effects: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = 42;
        [ a.p ] = a = "PASS";
    }
    expect: {
        var a;
        [ a.p ] = a = "PASS";
    }
}
issue_5189_2: {
    options = {
        pure_getters: "strict",
        reduce_vars: true,
        side_effects: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = 42;
        ({ p: a.q } = a = "PASS");
    }
    expect: {
        var a;
        ({ p: a.q } = a = "PASS");
    }
}
issue_5222: {
    options = {
        hoist_props: true,
        inline: true,
        reduce_vars: true,
        side_effects: true,
        toplevel: true,
        unused: true,
    }
    input: {
        function f() {
            do {
                (function() {
                    var a = {
                        p: [ a ] = [],
                    };
                })();
            } while (console.log("PASS"));
        }
    }
    expect: {
        do {
            a = void 0,
            a = {
                p: [ a ] = [],
            };
        } while (console.log("PASS"));
        var a;
    }
}
issue_5288_1: {
    options = {
        conditionals: true,
        inline: true,
        keep_fargs: false,
        reduce_vars: true,
        toplevel: true,
        unused: true,
        varify: true,
    }
    input: {
        while (function([]) {}([ function f() {
            if (console)
                return console.log("PASS");
        }() ]));
    }
}
issue_5288_2: {
    options = {
        conditionals: true,
        inline: true,
        keep_fargs: false,
        passes: 2,
        reduce_vars: true,
        toplevel: true,
        unused: true,
        varify: true,
    }
    input: {
        while (function([]) {}([ function f() {
            if (console)
                return console.log("PASS");
        }() ]));
    }
        while (console && console.log("PASS"), void 0);
}
issue_5314_1: {
    options = {
        side_effects: true,
    }
    input: {
        A = this;
    }
    expect: {
        A = this;
    }
}
issue_5314_2: {
    options = {
        side_effects: true,
    }
    input: {
        A = this;
    }
    expect: {
        A = this;
        new function() {
            [ {
                [console.log(this === A ? "FAIL" : "PASS")]: [].e,
            } ] = [ 42 ];
        }();
    }
}
