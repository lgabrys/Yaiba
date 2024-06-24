arrow_1: {
    input: {
        console.log(((a = "PASS") => a)());
    }
}
arrow_2: {
    input: {
        console.log((([ a = "FAIL" ]) => a)([ "PASS" ]));
    }
}
arrow_3: {
    input: {
        (([ a = console ] = null) => a.log("PASS"))("");
    }
}
assign: {
    input: {
        [ a = "PASS" ] = [];
    }
}
declaration_var: {
    input: {
        var [ a = "PASS" ] = [ , ];
    }
}
declaration_const: {
    input: {
        const [ a = "FAIL" ] = [ "PASS" ];
    }
}
declaration_let: {
    input: {
        let [ a = "PASS" ] = [ void 42 ];
    }
}
object_shorthand_assign: {
    input: {
        ({ a = "PASS" } = 42);
    }
}
object_shorthand_declaration: {
    input: {
        var { a = "PASS" } = 42;
    }
}
object_shorthand_function: {
    input: {
        (function({ a = "PASS" }) {
            console.log(a);
        })(42);
    }
}
retain_arguments_1: {
    options = {
        arguments: true,
    }
    input: {
        console.log(function(a = "FAIL") {
            return arguments[0];
        }() || "PASS");
    }
    expect: {
        console.log(function(a = "FAIL") {
            return arguments[0];
        }() || "PASS");
    }
}
retain_arguments_2: {
    options = {
        arguments: true,
    }
    input: {
        console.log(function(a, b = null) {
            a = "FAIL";
        }("PASS", 42));
    }
    expect: {
        console.log(function(a, b = null) {
            a = "FAIL";
        }("PASS", 42));
    }
}
process_boolean_returns: {
    options = {
        booleans: true,
        evaluate: true,
        reduce_vars: true,
    }
    input: {
        console.log(function(a = console.log("FAIL 1")) {
            return a() ? "PASS" : "FAIL 2";
        }(function() {
            return 42;
        }));
    }
    expect: {
        console.log(function(a = console.log("FAIL 1")) {
            return 42 ? "PASS" : "FAIL 2";
        }(function() {
            return 1;
        }));
    }
}
collapse_value_1: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function(a = "PASS") {
            return a;
        }());
    }
    expect: {
        console.log(function() {
            return "PASS";
        }());
    }
}
collapse_value_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        (function(a = console) {
            return a;
        })().log("PASS");
    }
    expect: {
        (function() {
            return console;
        })().log("PASS");
    }
    node_version: ">=6"
}
flatten_if: {
    options = {
        conditionals: true,
    }
    input: {
        if (console.log("PASS")) {
            var [
                a = function b() {
                    for (c in b);
                },
            ] = 0;
        }
    }
    expect: {
        var a;
        console.log("PASS") && ([
            a = function b() {
                for (c in b);
            },
        ] = 0);
    }
}
maintain_if: {
    options = {
        conditionals: true,
    }
    input: {
        if (a)
            for (;;);
        else
            var [ a = "PASS" ] = [];
    }
    expect: {
        else
            var [ a = "PASS" ] = [];
    }
}
reduce_funarg: {
    options = {
        evaluate: true,
        keep_fargs: false,
        reduce_vars: true,
        unused: true,
    }
    input: {
        console.log(...function(a = "foo", b = "bar", c = "baz") {
            return [ a, b, c ];
        }(void 0, null));
    }
    expect: {
        console.log(...function() {
            return [ "foo", null, "baz" ];
        }());
    }
}
reduce_array: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var [ a = "foo", b = "bar", c = "baz" ] = [ void 0, null ];
    }
    expect: {
        var [ c = "baz" ] = [];
    }
}
reduce_object: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unsafe: true,
        unused: true,
    }
    input: {
        var { a = "foo", b = "bar", c = "baz" } = { a: void 0, b: null };
    }
    expect: {
        var { c = "baz" } = {};
    }
}
evaluate_iife: {
    options = {
        evaluate: true,
    }
    input: {
        console.log(function(a = "PASS") {
            return a;
        }());
    }
    expect: {
    }
    expect_stdout: "PASS"
}

unsafe_evaluate_iife_1: {
    options = {
        evaluate: true,
        unsafe: true,
    }
    input: {
        console.log(function([ a ] = []) {
            return "PASS";
        }());
    }
    expect: {
        console.log(function([ a ] = []) {
            return "PASS";
        }());
    }
}
unsafe_evaluate_iife_2: {
    options = {
        evaluate: true,
        reduce_vars: true,
        unsafe: true,
    }
    input: {
        console.log(function([ a ] = []) {
            return a[0];
        }([ [ "PASS" ] ]));
    }
    expect: {
        console.log(function([ a ] = []) {
            return a[0];
        }([ [ "PASS" ] ]));
    }
}
inline_direct: {
    options = {
        default_values: true,
        inline: true,
        unused: true,
    }
    input: {
        console.log(function(a = "FAIL") {
            return a;
        }("PASS"));
    }
}
inline_constant: {
    options = {
        inline: true,
    }
    input: {
        console.log(function(a = console.log("foo")) {
            return "bar";
        }(void console.log("baz")));
    }
}
inline_destructured: {
    options = {
        inline: true,
    }
    input: {
        console.log(function([ a ] = []) {
            return "PASS";
        }());
    }
}
inline_function: {
    options = {
        default_values: true,
        inline: true,
        sequences: true,
        side_effects: true,
        toplevel: true,
        unused: true,
    }
    input: {
        (function(a = console.log("foo"), b = console.log("bar")) {
            console.log("baz");
        }(void console.log("moo"), 42));
    }
}
inline_loop_1: {
    options = {
        inline: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        while (function f(a = "PASS") {
            console.log(a);
        }());
    }
    expect: {
        while (a = "PASS", void console.log(a));
        var a;
    }
}
inline_loop_2: {
    options = {
        inline: true,
        sequences: true,
        toplevel: true,
        unused: true,
    }
    input: {
        while (function(a = [ "PASS" ]) {
            var a = function f(b) {
                console.log(a[b]);
            }(0);
        }());
    }
    expect: {
        while (a = [ "PASS" ],
            b = void 0,
            b = 0,
            void (a = void console.log(a[b])));
        var a, b;
    }
}
inline_side_effects_1: {
    options = {
        inline: true,
        toplevel: true,
    }
    input: {
        var a = 42;
        (function(b = --a) {})(console);
    }
    expect: {
        var a = 42;
        [ b = --a ] = [ console ],
        void 0;
        var b;
    }
}
inline_side_effects_2: {
    options = {
        side_effects: true,
    }
    input: {
        var a = 42;
        (function(b = --a) {})(console);
    }
    expect: {
        var a = 42;
        [ [].e = --a ] = [ console ];
    }
}
drop_empty_iife: {
    options = {
        side_effects: true,
    }
    input: {
        console.log(function(a = console.log("foo")) {}(void console.log("baz")));
    }
    expect: {
    }
}

retain_empty_iife: {
    options = {
        side_effects: true,
    }
    input: {
        var a;
        try {
            (function(a = a) {})();
        } catch (e) {
            console.log("PASS");
        }
    }
    expect: {
        var a;
        try {
            (function(a = a) {})();
        } catch (e) {
            console.log("PASS");
        }
    }
}
retain_fargs: {
    options = {
        unused: true,
    }
    input: {
        (function([ a = console.log("PASS") ]) {})([]);
    }
    expect: {
        (function([ a = console.log("PASS") ]) {})([]);
    }
    expect_stdout: "PASS"
}
drop_fargs: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function(a = 42, b = console.log("foo"), c = true) {
            return "bar";
        }(console.log("baz"), "moo", false));
    }
    expect: {
        console.log(function(b = console.log("foo")) {
            return "bar";
        }((console.log("baz"), "moo")));
    }
}
hoist_vars: {
    options = {
        hoist_vars: true,
    }
    input: {
        var a = "PASS";
        var [ b = 42 ] = [];
    }
    expect: {
        var a = "PASS";
        var [ b = 42 ] = [];
    }
    node_version: ">=6"
}
unused_var_1: {
    options = {
        toplevel: true,
        unused: true,
    }
    input: {
        var [ a = 42 ] = [ console.log("PASS") ];
    }
}
unused_var_2: {
    options = {
        pure_getters: "strict",
        toplevel: true,
        unused: true,
    }
    input: {
        var {
            p: [ a ] = "" + console.log("FAIL"),
        } = {
            p: [ console.log("PASS") ],
        };
    }
}
unused_value_assign_1: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        [] = [ console.log("PASS") ];
    }
}
unused_value_assign_2: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        [ a = console.log("FAIL") ] = [ "PASS" ];
    }
}
unused_value_var_1: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        var [] = [ console.log("PASS") ];
    }
}
unused_value_var_2: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        var [ a = console.log("FAIL") ] = [ "PASS" ];
    }
    expect: {
        var a = [ "PASS" ][0];
    }
}
mangle_var_1: {
    mangle = {
        toplevel: false,
    }
    input: {
        var N = 1, [ {
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        } ] = [ {}, {
            x1: "PASS",
        } ];
    }
    expect: {
        var N = 1, [ {
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        } ] = [ {}, {
            x1: "PASS",
        } ];
    }
}
mangle_var_1_toplevel: {
    mangle = {
        toplevel: true,
    }
    input: {
        var N = 1, [ {
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        } ] = [ {}, {
            x1: "PASS",
        } ];
    }
    expect: {
        var o = 1, [ {
            pname: a = "x",
            i: e = o,
        }, {
            [a + e]: l,
        } ] = [ {}, {
            x1: "PASS",
        } ];
    }
}
mangle_var_2: {
    mangle = {
        toplevel: false,
    }
    input: {
        var N = 1, [ {
            pname: p = "x",
            i: n = N,
        } = {}, {
            [p + n]: v,
        } ] = [ , {
            x1: "PASS",
        } ];
    }
    expect: {
        var N = 1, [ {
            pname: p = "x",
            i: n = N,
        } = {}, {
            [p + n]: v,
        } ] = [ , {
            x1: "PASS",
        } ];
    }
}
mangle_var_2_toplevel: {
    mangle = {
        toplevel: true,
    }
    input: {
        var N = 1, [ {
            pname: p = "x",
            i: n = N,
        } = {}, {
            [p + n]: v,
        } ] = [ , {
            x1: "PASS",
        } ];
    }
    expect: {
        var o = 1, [ {
            pname: a = "x",
            i: e = o,
        } = {}, {
            [a + e]: l,
        } ] = [ , {
            x1: "PASS",
        } ];
    }
}
mangle_function_1: {
    mangle = {
        toplevel: false,
    }
    input: {
        var N = 1;
        (function(o, {
            pname: p,
        } = o, {
            [p + N]: v,
        } = o) {
            let N;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
    expect: {
        var N = 1;
        (function(n, {
            pname: e,
        } = n, {
            [e + N]: o,
        } = n) {
            let a;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
}
mangle_function_1_toplevel: {
    mangle = {
        toplevel: true,
    }
    input: {
        var N = 1;
        (function(o, {
            pname: p,
        } = o, {
            [p + N]: v,
        } = o) {
            let N;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
    expect: {
        var l = 1;
        (function(n, {
            pname: e,
        } = n, {
            [e + l]: o,
        } = n) {
            let a;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
}
mangle_function_2: {
    mangle = {
        toplevel: false,
    }
    input: {
        var N = 1;
        (function({
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        }) {
            let N;
        })({}, {
            x1: "PASS",
        });
    }
    expect: {
        var N = 1;
        (function({
            pname: n = "x",
            i: o = N,
        }, {
            [n + o]: e,
        }) {
            let l;
        })({}, {
            x1: "PASS",
        });
    }
}
mangle_function_2_toplevel: {
    mangle = {
        toplevel: true,
    }
    input: {
        var N = 1;
        (function({
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        }) {
            let N;
        })({}, {
            x1: "PASS",
        });
    }
    expect: {
        var a = 1;
        (function({
            pname: n = "x",
            i: o = a,
        }, {
            [n + o]: e,
        }) {
            let l;
        })({}, {
            x1: "PASS",
        });
    }
}
mangle_arrow_1: {
    mangle = {
        toplevel: false,
    }
    input: {
        var N = 1;
        ((o, {
            pname: p,
        } = o, {
            [p + N]: v,
        } = o) => {
            let N;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
    expect: {
        var N = 1;
        ((e, {
            pname: a,
        } = e, {
            [a + N]: l,
        } = e) => {
            let n;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
}
mangle_arrow_1_toplevel: {
    mangle = {
        toplevel: true,
    }
    input: {
        var N = 1;
        ((o, {
            pname: p,
        } = o, {
            [p + N]: v,
        } = o) => {
            let N;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
    expect: {
        var o = 1;
        ((e, {
            pname: a,
        } = e, {
            [a + o]: l,
        } = e) => {
            let n;
        })({
            pname: "x",
            x1: "PASS",
        });
    }
}
mangle_arrow_2: {
    mangle = {
        toplevel: false,
    }
    input: {
        var N = 1;
        (({
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        }) => {
            let N;
        })({}, {
            x1: "PASS",
        });
    }
    expect: {
        var N = 1;
        (({
            pname: e = "x",
            i: l = N,
        }, {
            [e + l]: o,
        }) => {
            let a;
        })({}, {
            x1: "PASS",
        });
    }
}
mangle_arrow_2_toplevel: {
    mangle = {
        toplevel: true,
    }
    input: {
        var N = 1;
        (({
            pname: p = "x",
            i: n = N,
        }, {
            [p + n]: v,
        }) => {
            let N;
        })({}, {
            x1: "PASS",
        });
    }
    expect: {
        var n = 1;
        (({
            pname: e = "x",
            i: l = n,
        }, {
            [e + l]: o,
        }) => {
            let a;
        })({}, {
            x1: "PASS",
        });
    }
}
issue_4444: {
    options = {
        collapse_vars: true,
    }
    input: {
        var a = "PASS";
        console.log(function(b) {
            b = a;
        }());
    }
    expect: {
        var a = "PASS";
        console.log(function(b) {
            b = a;
        }());
    }
    node_version: ">=6"
}
issue_4446_1: {
    options = {
        collapse_vars: true,
    }
    input: {
        a = 42;
        [ b = 42 ] = [ "PASS" ];
        c = 42;
    }
    expect: {
        [ b = 42 ] = [ "PASS" ];
        c = a = 42;
    }
}
issue_4446_2: {
    options = {
        collapse_vars: true,
    }
    input: {
        a = 42;
        var [ b = 42 ] = [ "PASS" ];
        c = 42;
    }
    expect: {
        var [ b = 42 ] = [ "PASS" ];
        c = a = 42;
    }
}
issue_4458: {
    options = {
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var a = "PASS";
        function f(b = a = "FAIL") {
            console.log(a, b);
        }
    }
    expect: {
        var a = "PASS";
        (function(b = a = "FAIL") {
            console.log(a, b);
        })(42);
    }
}
issue_4460: {
    options = {
        collapse_vars: true,
    }
    input: {
        var log = console.log, a = "FAIL";
        var [ b = a ] = (a = "PASS", []);
    }
    expect: {
        var log = console.log, a = "FAIL";
        var [ b = a ] = (a = "PASS", []);
    }
}
issue_4461_1: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        var a = 0;
        (function(b = a && console.log("PASS"), c) {
            return c;
        })(void 0, a++);
    }
    expect: {
        var a = 0;
        (function(b = a && console.log("PASS"), c) {
            return c;
        })(void 0, a++);
    }
}
issue_4461_2: {
    options = {
        collapse_vars: true,
        unused: true,
    }
    input: {
        var a = 0;
        (function([ b = a && console.log("PASS") ], c) {
            return c;
        })([], a++);
    }
    expect: {
        var a = 0;
        (function([ b = a && console.log("PASS") ], c) {
            return c;
        })([], a++);
    }
}
issue_4468: {
    options = {
        evaluate: true,
        keep_fargs: false,
        pure_getters: "strict",
        reduce_vars: true,
        side_effects: true,
        unused: true,
    }
    input: {
        (function(a) {
            var {
                [console.log("PASS")]: b = a && (a.p = 0),
            } = 0;
        })(1234);
    }
    expect: {
        (function() {
            var {
                [console.log("PASS")]: b,
            } = 0;
        })();
    }
}
issue_4483: {
    options = {
        conditionals: true,
        evaluate: true,
        reduce_vars: true,
        toplevel: true,
    }
    input: {
        if (console)
            var [ a = "FAIL" ] = [], b = a = "PASS";
    }
    expect: {
        var a, b;
        console && ([ a = "FAIL" ] = [], b = "PASS");
    }
}
issue_4485_1: {
    options = {
        pure_getters: "strict",
        side_effects: true,
    }
    input: {
        (function(a = null) {
            var arguments;
        })();
    }
    expect: {
        (function(a = null) {
            var arguments;
        })();
    }
}
issue_4485_2: {
    options = {
        pure_getters: "strict",
        side_effects: true,
    }
    input: {
        (function(a = null) {
            var arguments = null;
        })();
    }
    expect: {
        (function(a = null) {
            var arguments = null;
        })();
    }
}
issue_4485_3: {
    options = {
        unused: true,
    }
    input: {
        (function(a = null) {
            var arguments;
        })();
    }
    expect: {
        (function(a = null) {
            var arguments;
        })();
    }
}
issue_4496: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        (function f(a = 0) {
            console.log(function(b) {
                a && b();
            }(f));
        })(42);
    }
    expect: {
        (function f(a = 0) {
            console.log(function(b) {
                a && b();
            }(f));
        })(42);
    }
}
issue_4502_1: {
    options = {
        inline: true,
        unused: true,
    }
    input: {
        (function() {
            var a = "PASS";
        })();
    }
    expect: {
        (function() {
            var a = "PASS";
            a++,
        })();
    }
}
issue_4502_2: {
    options = {
        inline: true,
        unused: true,
    }
    input: {
        (function() {
            var a = "PASS";
            (function(b = a++) {})(void 0, console.log(a));
        })();
    }
    expect: {
        (function() {
            var a = "PASS";
            a++,
        })();
    }
}
issue_4502_3: {
    options = {
        side_effects: true,
    }
    input: {
        (function() {
            var a = "PASS";
            (function(b = a++) {})(void 0, console.log(a));
        })();
    }
    expect: {
        (function() {
            var a = "PASS";
            a++;
        })();
    }
}
issue_4502_4: {
    options = {
        side_effects: true,
    }
    input: {
        (function(a, b = console.log("FAIL")) {})(..."" + console.log(42));
    }
}
issue_4510_1: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        var a = [];
        var [ , b = console.log("PASS") ] = [ ...a, null ];
    }
    expect: {
        var a = [];
        var [ , b = console.log("PASS") ] = [ ...a, null ];
    }
}
issue_4510_2: {
    options = {
        default_values: true,
        unused: true,
    }
    input: {
        var o = {
            p: void 0,
        };
        var {
            p: a = console.log("PASS"),
        } = {
            p: null,
            ...o,
        };
    }
    expect: {
        var o = {
            p: void 0,
        };
        var {
            p: a = console.log("PASS"),
        } = {
            p: null,
            ...o,
        };
    }
}
issue_4523: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(function() {
            var a, b;
            [ a = b = false ] = [ "FAIL" ];
        }());
    }
    expect: {
        console.log(function() {
            var a, b;
            [ a = b = false ] = [ "FAIL" ];
        }());
    }
}
issue_4540: {
    options = {
        reduce_vars: true,
        side_effects: true,
    }
    input: {
        console.log(function() {
            function f([ a = 0 ]) {}
            f([]);
        }());
    }
    expect: {
        console.log(function() {
            function f([ a = 0 ]) {}
            f([]);
        }());
    }
}
issue_4548: {
    options = {
        merge_vars: true,
        toplevel: true,
    }
    input: {
        A = "foo";
        var a = A;
        [ b = c = "bar" ] = [ console, console.log(a) ];
        var c;
    }
    expect: {
        A = "foo";
        var a = A;
        [ b = c = "bar" ] = [ console, console.log(a) ];
        var c;
    }
}
issue_4588_1_unused: {
    options = {
        unused: true,
    }
    input: {
        console.log(function(a = 42) {}.length);
    }
    expect: {
        console.log(function(a = 0) {}.length);
    }
}
issue_4588_2_unused: {
    options = {
        unused: true,
    }
    input: {
        console.log(function(a, b = void 0, c, d = "foo") {}.length);
    }
    expect: {
        console.log(function(a, b = 0, c, d) {}.length);
    }
}
issue_4588_1_evaluate: {
    options = {
        evaluate: true,
        unsafe: true,
    }
    input: {
        console.log(function(a = 42) {}.length);
    }
}
issue_4588_2_evaluate: {
    options = {
        evaluate: true,
        unsafe: true,
    }
    input: {
        console.log(function(a, b = void 0, c, d = "foo") {}.length);
    }
}
issue_4817: {
    options = {
        ie8: true,
        inline: true,
        unused: true,
    }
    input: {
        (function f(a = console.log(typeof f)) {
            return 42;
        })();
    }
}
