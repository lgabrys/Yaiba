collapse_vars_side_effects_1: {
    options = {
    }
}

collapse_vars_side_effects_2: {
    options = {
    }
}
collapse_vars_issue_721: {
    options = {
    }
}
collapse_vars_properties: {
    options = {
    }
}
collapse_vars_if: {
    options = {
    }
}
collapse_vars_while: {
    options = {
    }
}
collapse_vars_do_while: {
    options = {
    }
}
collapse_vars_do_while_drop_assign: {
    options = {
    }
}
collapse_vars_seq: {
    options = {
    }
}
collapse_vars_throw: {
    options = {
    }
}
collapse_vars_switch: {
    options = {
    }
}
collapse_vars_assignment: {
    options = {
    }
}
collapse_vars_lvalues: {
    options = {
    }
    expect: {
        function f8(x) { var w = e1(); return (w = x) - (e2() - x); }
    }
}
collapse_vars_lvalues_drop_assign: {
    options = {
    }
}
collapse_vars_misc1: {
    options = {
    }
}
collapse_vars_self_reference: {
    options = {
    }
}
collapse_vars_repeated: {
    options = {
    }
}
collapse_vars_closures: {
    options = {
    }
}
collapse_vars_unary: {
    options = {
    }
}
collapse_vars_try: {
    options = {
    }
}
collapse_vars_array: {
    options = {
    }
}
collapse_vars_object: {
    options = {
    }
}
collapse_vars_eval_and_with: {
    options = {
    }
}
collapse_vars_constants: {
    options = {
    }
}
collapse_vars_arguments: {
    options = {
    }
}
collapse_vars_short_circuit: {
    options = {
    }
}
collapse_vars_short_circuited_conditions: {
    options = {
    }
        function i6(x) { var a = foo(), b = bar(); if (baz()) return b; else return a; }
}
collapse_vars_regexp: {
    options = {
    }
            var k = 9;
}
issue_1537: {
    options = {
    }
}
issue_1562: {
    options = {
    }
    input: {
        var v = 1, B = 2;
        for (v in objs) f(B);
        var x = 3, C = 10;
        while(x + 2) bar(C);
        var y = 4, D = 20;
        do bar(D); while(y + 2);
        for (; f(z + 2) ;) bar(E);
    }
    expect: {
        var v = 1;
        for (v in objs) f(2);
        while(5) bar(10);
        do bar(20); while(6);
        for (; f(7) ;) bar(30);
    }
}
issue_1605_1: {
    options = {
    }
    input: {
        var o = new Object;
        o.p = 1;
    }
    expect: {
        var o = new Object;
        o.p = 1;
    }
}
issue_1605_2: {
    options = {
    }
    input: {
        var o = new Object;
        o.p = 1;
    }
}
issue_1631_1: {
    options = {
    }
    input: {
        function f(x) {
        }
    }
}
issue_1631_2: {
    options = {
    }
    input: {
        var a = 0, b = 1;
        function f() {
            a = 2;
        }
        function g() {
            var t = f();
            b = a + t;
        }
    }
    expect: {
        function f() {
            return a = 2, 4;
        }
        function g() {
            var t = f();
            return b = a + t;
        }
        var a = 0, b = 1;
    }
}
issue_1631_3: {
    options = {
    }
}
var_side_effects_1: {
    options = {
    }
}
var_side_effects_2: {
    options = {
    }
}
var_side_effects_3: {
    options = {
    }
}
reduce_vars_assign: {
    options = {
    }
}
iife_1: {
    options = {
    }
}
iife_2: {
    options = {
    }
}
var_defs: {
    options = {
    }
}
assignment: {
    options = {
    }
}
for_init: {
    options = {
    }
}
switch_case_1: {
    options = {
    }
}
switch_case_2: {
    options = {
    }
    input: {
        var a = 1, b = 2;
        switch (b++) {
            var c = a;
            var a;
        }
    }
    expect: {
        var a = 1, b = 2;
        switch (b++) {
            var c = a;
            var a;
        }
    }
}
switch_case_3: {
    options = {
    }
    input: {
        var a = 1, b = 2;
        switch (a) {
            var b;
        }
    }
    expect: {
        var a = 1, b = 2;
        switch (a) {
            var b;
        }
    }
}
issue_27: {
    options = {
    }
}
modified: {
    options = {
    }
}
issue_1858: {
    options = {
    }
}
anonymous_function: {
    options = {
    }
}
side_effects_property: {
    options = {
    }
    input: {
        var a = [];
        var b = 0;
        a[b++] = function() { return 42;};
        var c = a[b++]();
    }
    expect: {
        var a = [];
        var b = 0;
        a[b++] = function() { return 42;};
        var c = a[b++]();
    }
}
undeclared: {
    options = {
    }
    input: {
        function f(x, y) {
            b = y;
        }
    }
    expect: {
        function f(x, y) {
            b = y;
        }
    }
}
ref_scope: {
    options = {
    }
}
chained_1: {
    options = {
    }
    input: {
        var a = 2;
        var a = 3 / a;
    }
    expect: {
        var a = 3 / (a = 2);
    }
}
chained_2: {
    options = {
    }
    input: {
        var a;
        var a = 2;
        a = 3 / a;
    }
    expect: {
        var a;
        a = 3 / (a = 2);
    }
}
chained_3: {
    options = {
    }
}
boolean_binary_1: {
    options = {
    }
    input: {
        var a = 1;
        a++;
    }
    expect: {
        var a = 1;
        a++;
    }
}
boolean_binary_2: {
    options = {
    }
    input: {
        var c = 0;
        c += 1;
        (function() {
            c = 1 + c;
        } || 9).toString();
    }
    expect: {
        var c = 0;
        c += 1;
        (function() {
            c = 1 + c;
        } || 9).toString();
    }
}
inner_lvalues: {
    options = {
    }
    input: {
        var a, b = 10;
        var a = (--b || a || 3).toString(), c = --b + -a;
    }
    expect: {
        var b = 10;
        var a = (--b || a || 3).toString(), c = --b + -a;
    }
}
double_def_1: {
    options = {
    }
    input: {
        var a = x, a = a && y;
    }
    expect: {
        var a;
        (a = (a = x) && y)();
    }
}
double_def_2: {
    options = {
    }
    input: {
        var a = x, a = a && y;
    }
}
toplevel_single_reference: {
    options = {
    }
    input: {
        var a;
        for (var b in x) {
            var a = b;
        }
    }
    expect: {
        for (var b in x) {
            var a;
            b(a = b);
        }
    }
}
unused_orig: {
    options = {
    }
    input: {
        var a = 1;
    }
    expect: {
        var a = 1;
    }
}
issue_315: {
    options = {
    }
}
lvalues_def: {
    options = {
    }
    input: {
        var a = 0, b = 1;
        var a = b++, b = +function() {}();
        a && a[a++];
    }
    expect: {
        var a = 0, b = 1;
        a = b++, b = +void 0;
        a && a[a++];
    }
}
compound_assignment: {
    options = {
    }
    input: {
        var a;
        a = 1;
        a += a + 2;
    }
    expect: {
        var a;
        a = 1;
        a += a + 2;
    }
}
issue_2187_1: {
    options = {
    }
    input: {
        var a = 1;
    }
    expect: {
        var a = 1;
    }
}
issue_2187_2: {
    options = {
    }
    input: {
        var b = 1;
        console.log(function(a) {
            return a && ++b;
        }(b--));
    }
    expect: {
        var b = 1;
        console.log(function(a) {
            return b-- && ++b;
        }());
    }
}
issue_2187_3: {
    options = {
    }
    input: {
        var b = 1;
        console.log(function(a) {
            return a && ++b;
        }(b--));
    }
    expect: {
        var b = 1;
        console.log(b-- && ++b);
    }
}
issue_2203_1: {
    options = {
    }
    input: {
        a = "FAIL";
    }
    expect: {
        a = "FAIL";
    }
}
issue_2203_2: {
    options = {
    }
    input: {
        a = "PASS";
    }
    expect: {
        a = "PASS";
    }
}
duplicate_argname: {
    options = {
    }
}
issue_2298: {
    options = {
    }
}
issue_2313_1: {
    options = {
    }
    input: {
        var a = 0, b = 0;
        var foo = {
            get c() {
                a++;
                return 42;
            },
            set c(c) {
                b++;
            },
            d: function() {
                this.c++;
                if (this.c) console.log(a, b);
            }
        }
    }
    expect: {
        var a = 0, b = 0;
        var foo = {
            get c() {
                a++;
                return 42;
            },
            set c(c) {
                b++;
            },
            d: function() {
                this.c++;
                this.c && console.log(a, b);
            }
        }
    }
}
issue_2313_2: {
    options = {
    }
    input: {
        var c = 0;
        !function a() {
            a && c++;
            var a = 0;
            a && c++;
        }();
    }
    expect: {
        var c = 0;
        !function a() {
            a && c++;
            var a = 0;
            a && c++;
        }();
    }
}
issue_2319_1: {
    options = {
    }
}
issue_2319_2: {
    options = {
    }
}
issue_2319_3: {
    options = {
    }
}
issue_2365: {
    options = {
    }
}
issue_2364_1: {
    options = {
    }
}
issue_2364_2: {
    options = {
    }
}
issue_2364_3: {
    options = {
    }
}
issue_2364_4: {
    options = {
    }
}
issue_2364_5: {
    options = {
    }
}
issue_2364_6: {
    options = {
    }
    input: {
        var o = {
            p: "PASS"
        }
    }
    expect: {
        var o = {
            p: "PASS"
        }
    }
}
issue_2364_7: {
    options = {
    }
    input: {
        var o = {
            p: "PASS",
            f: function() {
                this.p = "FAIL";
            }
        }
    }
    expect: {
        var o = {
            p: "PASS",
            f: function() {
                this.p = "FAIL";
            }
        }
    }
}
issue_2364_8: {
    options = {
    }
    input: {
        var o = {
            f: function() {
                return "FAIL";
            }
        };
    }
    expect: {
        var o = {
            f: function() {
                return "FAIL";
            }
        };
    }
}
issue_2364_9: {
    options = {
    }
    input: {
        var o = {
            f: function() {
                return "FAIL";
            }
        };
        console.log(f(function() {
            o.f = function() {
                return "PASS";
            };
        }, o));
    }
    expect: {
        var o = {
            f: function() {
                return "FAIL";
            }
        };
        console.log(f(function() {
            o.f = function() {
                return "PASS";
            };
        }, o));
    }
}
pure_getters_chain: {
    options = {
    }
}
conditional_1: {
    options = {
    }
}
conditional_2: {
    options = {
    }
}
issue_2425_1: {
    options = {
    }
    input: {
        var a = 8;
        (function(b) {
        })(--a, a |= 10);
    }
    expect: {
        var a = 8;
        (function(b) {
        })(--a, a |= 10);
    }
}
issue_2425_2: {
    options = {
    }
    input: {
        var a = 8;
        (function(b, c) {
        })(--a, a |= 10);
    }
    expect: {
        var a = 8;
        (function(b, c) {
        })(--a, a |= 10);
    }
}
issue_2425_3: {
    options = {
        unused: true,
    }
    input: {
        var a = 8;
        (function(b, b) {
        })(--a, a |= 10);
    }
    expect: {
        var a = 8;
        (function(b, b) {
            (a |= 10).toString();
        })(--a);
    }
}
issue_2437_1: {
    options = {
    }
    input: {
        function bar() {
            if (xhrDesc) {
                var req = new XMLHttpRequest();
                var result = !!req.onreadystatechange;
            } else {
                var req = new XMLHttpRequest();
                var detectFunc = function(){};
                req.onreadystatechange = detectFunc;
                var result = req[SYMBOL_FAKE_ONREADYSTATECHANGE_1] === detectFunc;
                req.onreadystatechange = null;
            }
        }
    }
}
issue_2437_2: {
    options = {
        collapse_vars: true,
        side_effects: true,
    }
}
issue_2436_1: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
    }
    expect: {
        var o = {
            a: 1,
            b: 2,
        };
    }
}
issue_2436_2: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
        console.log(function(c) {
            o.a = 3;
        }(o));
    }
    expect: {
        var o = {
            a: 1,
            b: 2,
        };
        console.log(function(c) {
            o.a = 3;
        }(o));
    }
}
issue_2436_3: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
        console.log(function(c) {
            o = {
                a: 3,
                b: 4,
            };
        }(o));
    }
    expect: {
        var o = {
            a: 1,
            b: 2,
        };
        console.log(function(c) {
            o = {
                a: 3,
                b: 4,
            };
        }(o));
    }
}
issue_2436_4: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
    }
    expect: {
        console.log({
            x: (c = {
        }).a,
        });
        var c;
    }
}
issue_2436_5: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
    }
}
issue_2436_6: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
    }
}
issue_2436_7: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
    }
}
issue_2436_8: {
    options = {
    }
    expect: {
        console.log({
            x: (c = o).a,
        });
        var c;
    }
}
issue_2436_9: {
    options = {
    }
    input: {
        var o = console;
    }
    expect: {
        var o = console;
        console.log({
            x: (c = o).a,
        });
        var c;
    }
}
issue_2436_10: {
    options = {
    }
    input: {
        var o = {
            a: 1,
            b: 2,
        };
        function f(n) {
            o = { b: 3 };
        }
    }
    expect: {
        var o = {
            a: 1,
            b: 2,
        };
        function f(n) {
            o = { b: 3 };
        }
        console.log([
            (c = o).a,
        ].join(" "));
        var c;
    }
}
issue_2436_11: {
    options = {
    }
}
issue_2436_12: {
    options = {
    }
}
issue_2436_13: {
    options = {
    }
    input: {
        var a = "PASS";
    }
    expect: {
        var a = "PASS";
        (function() {
            (function(b) {
                (function(b) {
                    a && (a.null = "FAIL");
                })();
            })();
        })();
    }
}
issue_2436_14: {
    options = {
    }
    input: {
        var a = "PASS";
        var b = {};
    }
    expect: {
        var a = "PASS";
        var b = {};
    }
}
issue_2497: {
    options = {
    }
}
issue_2506: {
    options = {
    }
    input: {
        var c = 0;
        function f0(bar) {
            function f1(Infinity_2) {
                function f13(NaN) {
                    if (false <= NaN & this >> 1 >= 0) {
                        c++;
                    }
                }
                var b_2 = f13(NaN, c++);
            }
        }
    }
    expect: {
        var c = 0;
        function f0(bar) {
            (function(Infinity_2) {
                (function(NaN) {
                        c++;
                })(0, c++);
            })();
        }
    }
}
issue_2571_1: {
    options = {
    }
    input: {
        var b = 1;
        try {
            var a = function f0(c) {
            }(2);
            var d = --b + a;
        } catch (e) {
    }
    expect: {
        var b = 1;
        try {
            var a = function f0(c) {
            }(2);
            var d = --b + a;
        } catch (e) {
    }
}
issue_2571_2: {
    options = {
    }
    input: {
        try {
            var a = A, b = 1;
        } catch (e) {
    }
    expect: {
        try {
            var a = A, b = 1;
        } catch (e) {
    }
}
may_throw_1: {
    options = {
    }
}
may_throw_2: {
    options = {
    }
}
side_effect_free_replacement: {
    options = {
    }
    input: {
        var b;
    }
    expect: {
        var b;
    }
}
recursive_function_replacement: {
    rename = true
    options = {
        collapse_vars: true,
        inline: true,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    mangle = {}
    input: {
        function f(a) {
            return x(g(a));
        }
    }
}
cascade_conditional: {
    options = {
    }
}
cascade_if_1: {
    options = {
    }
    input: {
        var a;
        if (a = x(), a)
            if (a == y()) z();
    }
    expect: {
        var a;
        if (a = x())
            if (a == y()) z();
    }
}
cascade_if_2: {
    options = {
    }
            if (a(), b = x()) return b;
}
cascade_return: {
    options = {
    }
}
cascade_switch: {
    options = {
    }
}
cascade_call: {
    options = {
    }
}
replace_all_var: {
    options = {
    }
    input: {
        var a = "PASS";
        (function() {
            var b = b || c && c[a = "FAIL"], c = a;
        })();
    }
    expect: {
        var a = "PASS";
        (function() {
            var b = b || c && c[a = "FAIL"], c = a;
        })();
    }
}
replace_all_var_scope: {
    rename = true;
}
