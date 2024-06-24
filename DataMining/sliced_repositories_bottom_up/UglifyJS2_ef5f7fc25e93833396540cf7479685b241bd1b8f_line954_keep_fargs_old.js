keep_fargs_false: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function f(a) {
            return f.length;
        }(), function g(b) {
            return g;
        }().length);
        function h(c) {
            return h.length;
        }
        function i(d) {
            return i;
        }
        function j(e) {}
        console.log(h(), i().length, j.length);
    }
    expect: {
        console.log(function f(a) {
            return f.length;
        }(), function g(b) {
            return g;
        }().length);
        function h(c) {
            return h.length;
        }
        function i(d) {
            return i;
        }
        function j(e) {}
        console.log(h(), i().length, j.length);
    }
}
keep_fargs_true: {
    options = {
        keep_fargs: true,
        unused: true,
    }
    input: {
        console.log(function f(a) {
            return f.length;
        }(), function g(b) {
            return g;
        }().length);
        function h(c) {
            return h.length;
        }
        function i(d) {
            return i;
        }
        function j(e) {}
        console.log(h(), i().length, j.length);
    }
    expect: {
        console.log(function f(a) {
            return f.length;
        }(), function g(b) {
            return g;
        }().length);
        function h(c) {
            return h.length;
        }
        function i(d) {
            return i;
        }
        function j(e) {}
        console.log(h(), i().length, j.length);
    }
}
replace_index_strict: {
    options = {
        arguments: true,
        evaluate: true,
        keep_fargs: false,
        properties: true,
        reduce_vars: true,
    }
    input: {
        "use strict";
        (function() {
            console.log(arguments[1], arguments["1"], arguments["foo"]);
        })("bar", 42);
        (function(a, b) {
            console.log(arguments[1], arguments["1"], arguments["foo"]);
        })("bar", 42);
    }
    expect: {
        (function(argument_0, argument_1) {
            console.log(argument_1, argument_1, arguments.foo);
        })("bar", 42);
        (function(a, b) {
            console.log(b, b, arguments.foo);
        })("bar", 42);
    }
}
issue_1858: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        pure_getters: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        console.log(function(x) {
            var a = {}, b = a.b = x;
        }(1));
    }
    expect: {
        console.log(function() {
            var a = {}, b = a.b = 1;
        }());
    }
}
issue_2187_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        var b = 1;
        console.log(function(a) {
            return a && ++b;
        }(b--));
    }
    expect: {
        var b = 1;
        console.log(function() {
            return b-- && ++b;
        }());
    }
}
issue_2203_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        a = "PASS";
        console.log({
            a: "FAIL",
            b: function() {
                return function(c) {
                    return c.a;
                }((String, (Object, function() {
            }
        }.b());
    }
    expect: {
        a = "PASS";
        console.log({
            a: "FAIL",
            b: function() {
                return function() {
                    return (String, (Object, function() {
                        return this;
                    }())).a;
                }();
            }
        }.b());
    }
}
issue_2298: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        !function() {
            function f() {
                var a = undefined;
                var undefined = a++;
            }
        }();
    }
    expect: {
        !function() {
            (function() {
                try {
                    !function() {
                        (void 0)[1] = "foo";
                    }();
                } catch (e) {
            })();
        }();
    }
}
issue_2319_1: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function(a) {
            return a;
        }(!function() {
            return this;
        }()));
    }
    expect: {
        console.log(function() {
            return !function() {
                return this;
            }();
        }());
    }
}
issue_2319_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        console.log(function(a) {
            "use strict";
        }(!function() {
            return this;
        }()));
    }
    expect: {
        console.log(function(a) {
            "use strict";
        }(!function() {
            return this;
        }()));
    }
}
issue_2319_3: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        "use strict";
        console.log(function(a) {
            return a;
        }(!function() {
            return this;
        }()));
    }
    expect: {
        console.log(function() {
            return !function() {
                return this;
            }();
        }());
    }
}
issue_2425_1: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        var a = 8;
        (function(b) {
            b.toString();
        })(--a, a |= 10);
    }
    expect: {
        var a = 8;
        (function(b) {
            b.toString();
        })(--a, a |= 10);
    }
}
issue_2425_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        var a = 8;
        (function(b, c) {
            b.toString();
        })(--a, a |= 10);
    }
    expect: {
        var a = 8;
        (function(b) {
            b.toString();
        })(--a, a |= 10);
    }
}
issue_2425_3: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        unused: true,
    }
    input: {
        var a = 8;
        (function(b, b) {
            b.toString();
        })(--a, a |= 10);
    }
    expect: {
        var a = 8;
        (function() {
            (a |= 10).toString();
        })(--a);
    }
}
issue_2436_13: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        passes: 2,
        reduce_vars: true,
        unused: true,
    }
    input: {
        var a = "PASS";
        (function() {
            function f(b) {
                (function g(b) {
                    var b = b && (b.null = "FAIL");
                })(a);
            }
            f();
        })();
    }
    expect: {
        var a = "PASS";
        (function() {
            (function() {
                (function() {
                    a && (a.null = "FAIL");
                })();
            })();
        })();
    }
}
issue_2506: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        passes: 2,
        reduce_vars: true,
        unused: true,
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
            (function() {
                (function() {
                    if (false <= 0/0 & this >> 1 >= 0)
                        c++;
                })(c++);
            })();
        }
    }
}
issue_2226_1: {
    options = {
        keep_fargs: false,
        side_effects: true,
        unused: true,
    }
    input: {
        function f1() {
            var a = b;
            a += c;
        }
        function f2(a) {
            a <<= b;
        }
        function f3(a) {
            --a;
        }
        function f4() {
            var a = b;
            return a *= c;
        }
        function f5(a) {
            x(a /= b);
        }
    }
    expect: {
        function f1() {
            b;
        }
        function f2(a) {
            b;
        }
        function f3(a) {
            0;
        }
        function f4() {
            var a = b;
            return a *= c;
        }
        function f5(a) {
            x(a /= b);
        }
    }
}
issue_2226_2: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        sequences: true,
        side_effects: true,
        unused: true,
    }
    input: {
        console.log(function(a, b) {
            a += b;
        }(1, 2));
    }
    expect: {
        console.log(function(a) {
            return a += 2;
        }(1));
    }
}
issue_2226_3: {
    options = {
        collapse_vars: true,
        keep_fargs: false,
        side_effects: true,
        unused: true,
    }
    input: {
        console.log(function(a, b) {
            a += b;
        }(1, 2));
    }
    expect: {
        console.log(function(a) {
            return a += 2;
        }(1));
    }
}
issue_3192: {
    options = {
        keep_fargs: false,
        unused: true,
    }
    input: {
        (function(a) {
            console.log(a = "foo", arguments[0]);
        })("bar");
        (function(a) {
            "use strict";
            console.log(a = "foo", arguments[0]);
        })("bar");
    }
    expect: {
        (function(a) {
            console.log(a = "foo", arguments[0]);
        })("bar");
        (function() {
            "use strict";
        })("bar");
    }
    expect_stdout: [
        "foo foo",
    ]
}
if_increment: {
    options = {
        evaluate: true,
        keep_fargs: false,
        reduce_vars: true,
        unused: true,
    }
    input: {
        console.log(function(a) {
            if (console)
                return ++a;
        }(0));
    }
    expect: {
        console.log(function() {
            if (console)
                return 1;
        }());
    }
}
try_increment: {
    options = {
        evaluate: true,
        keep_fargs: false,
        reduce_vars: true,
        unused: true,
    }
    input: {
        console.log(function(a) {
            try {
                return ++a;
            } catch (e) {}
        }(0));
    }
    expect: {
        console.log(function() {
            try {
                return 1;
            } catch (e) {}
        }());
    }
}
issue_2630_3: {
    options = {
        inline: true,
        keep_fargs: false,
        reduce_vars: true,
        unused: true,
    }
    input: {
        var x = 2, a = 1;
        (function() {
            function f1(a) {
                f2();
                --x >= 0 && f1({});
            }
            f1(a++);
            function f2() {
                a++;
            }
        })();
    }
    expect: {
        var x = 2, a = 1;
        (function() {
            (function f1() {
                f2();
                --x >= 0 && f1();
            })(a++);
            function f2() {
                a++;
            }
        })();
    }
}
issue_3364: {
    options = {
        functions: true,
        keep_fargs: false,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    mangle = {}
    input: {
        var s = 2, a = 100, b = 10, c = 0;
        function f(p, e, r) {
            try {
                for (var i = 1; i-- > 0;)
                    var a = function(x) {
                        function g(y) {
                        }
                        var x = g(--s >= 0 && f(c++));
                    }();
            } catch (e) {
        }
        var r = f();
    }
    expect: {
        var s = 2, c = 0;
        (function o() {
            try {
                for (var r = 1; r-- > 0;)
                    var n = function() {
                        (function(r) {
                        })(--s >= 0 && o(c++));
                    }();
            } catch (r) {
        })();
    }
}
defun_label: {
    options = {
        keep_fargs: false,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        !function() {
            function f(a) {
                L: {
                    if (a) break L;
                }
            }
        }();
    }
    expect: {
        !function() {
            console.log(function() {
                L: {
                    if (2) break L;
                }
            }());
        }();
    }
}
iife_func_side_effects: {
    options = {
        keep_fargs: false,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        function x() {
            console.log("x");
        }
        function y() {
            console.log("y");
        }
        function z() {
            console.log("z");
        }
        (function(a, b, c) {
            function y() {
                console.log("FAIL");
            }
        })(x(), function() {
            return y();
        }, z());
    }
    expect: {
        function x() {
            console.log("x");
        }
        function y() {
            console.log("y");
        }
        function z() {
            console.log("z");
        }
        (function(b) {
            return function() {
                console.log("FAIL");
            } + b();
        })((x(), function() {
            return y();
        }), z());
    }
}
issue_1595_1: {
    options = {
        evaluate: true,
        keep_fargs: false,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function f(a) {
            return f(a + 1);
        })(2);
    }
    expect: {
        (function f(a) {
            return f(a + 1);
        })(2);
    }
}
issue_1595_2: {
    options = {
        evaluate: true,
        keep_fargs: false,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function f(a) {
            return g(a + 1);
        })(2);
    }
    expect: {
        (function(a) {
            return g(a + 1);
        })(2);
    }
}
issue_1595_3: {
    options = {
        evaluate: true,
        keep_fargs: false,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function f(a) {
            return g(a + 1);
        })(2);
    }
    expect: {
        (function() {
            return g(3);
        })();
    }
}
issue_1595_4: {
    options = {
        evaluate: true,
        keep_fargs: false,
        reduce_funcs: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function iife(a, b, c) {
            console.log(a, b, c);
        })(3, 4, 5);
    }
    expect: {
        (function iife(a, b, c) {
            console.log(a, b, c);
        })(3, 4, 5);
    }
}
duplicate_lambda_defun_name_1: {
    options = {
        keep_fargs: false,
        reduce_vars: true,
    }
    input: {
        console.log(function f(a) {
            function f() {}
            return f.length;
        }());
    }
    expect: {
        console.log(function f(a) {
            function f() {}
            return f.length;
        }());
    }
}
duplicate_lambda_defun_name_2: {
    options = {
        keep_fargs: false,
        passes: 2,
        reduce_vars: true,
        unused: true,
    }
    input: {
        console.log(function f(a) {
            function f() {}
            return f.length;
        }());
    }
    expect: {
        console.log(function() {
            return function() {}.length;
        }());
    }
}
function_name_mangle: {
    options = {
        keep_fargs: false,
        keep_fnames: true,
        reduce_vars: true,
        unused: true,
    }
    mangle = {}
    input: {
        (function() {
            function foo(bar) {}
            console.log(typeof foo);
        })();
    }
    expect_stdout: "function"
}
function_name_mangle_ie8: {
    options = {
        keep_fargs: false,
        keep_fnames: true,
        reduce_vars: true,
        unused: true,
    }
    mangle = {
        ie8: true,
        toplevel: true,
    }
    input: {
        (function() {
            function foo(bar) {}
            console.log(typeof foo);
        })();
    }
}
