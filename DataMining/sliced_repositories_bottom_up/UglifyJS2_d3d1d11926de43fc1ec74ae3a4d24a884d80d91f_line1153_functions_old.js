iifes_returning_constants_keep_fargs_true: {
    options = {
    }
}
iifes_returning_constants_keep_fargs_false: {
    options = {
    }
}
issue_485_crashing_1530: {
    options = {
        inline: true,
    }
}
issue_1841_1: {
    options = {
    }
}
issue_1841_2: {
    options = {
    }
}
function_returning_constant_literal: {
    options = {
    }
}
hoist_funs: {
    options = {
    }
}
issue_203: {
    options = {
    }
}
issue_2084: {
    options = {
    }
    input: {
        var c = 0;
    }
    expect: {
        var c = 0;
    }
}
issue_2097: {
    options = {
    }
}
issue_2101: {
    options = {
    }
}
inner_ref: {
    options = {
    }
}
issue_2107: {
    options = {
    }
    input: {
        var c = 0;
        !function() {
            c++;
        }(c++ + new function() {
            var a = (c = c + 1) + (c = 1 + c);
            return c++ + a;
        }());
    }
    expect: {
        var c = 0;
        c++, new function() {
            this.a = 0, c = 1 + (c += 1), c++;
        }(), c++, console.log(c);
    }
}
issue_2114_1: {
    options = {
    }
    input: {
        var c = 0;
        }([ {
            0: c = c + 1,
            length: c = 1 + c
        }, typeof void function a() {
            var b = function f1(a) {
            }(b && (b.b += (c = c + 1, 0)));
        }() ]);
    }
    expect: {
        var c = 0;
        c = 1 + (c += 1), function() {
            var b = void (b && (b.b += (c += 1, 0)));
        }();
    }
}
issue_2114_2: {
    options = {
    }
    input: {
        var c = 0;
        }([ {
            0: c = c + 1,
            length: c = 1 + c
        }, typeof void function a() {
            var b = function f1(a) {
            }(b && (b.b += (c = c + 1, 0)));
        }() ]);
    }
    expect: {
        var c = 0;
        c = 1 + (c += 1), function() {
            var b = void (b && (b.b += (c += 1, 0)));
        }();
    }
}
issue_2428: {
    options = {
    }
}
issue_2531_1: {
    options = {
    }
}
issue_2531_2: {
    options = {
    }
}
issue_2531_3: {
    options = {
    }
}
empty_body: {
    options = {
    }
}
inline_loop_1: {
    options = {
    }
        for (;;) x();
}
inline_loop_2: {
    options = {
    }
        for (;;) x();
}
inline_loop_3: {
    options = {
    }
        for (;;) x();
}
inline_loop_4: {
    options = {
    }
}
issue_2476: {
    options = {
    }
        for (var sum = 0, i = 0; i < 10; i++)
}
issue_2601_1: {
    options = {
    }
    input: {
        var a = "FAIL";
    }
    expect: {
        var a = "FAIL";
    }
}
issue_2601_2: {
    rename = true
    options = {
        evaluate: true,
        inline: true,
        passes: 3,
        reduce_vars: true,
        sequences: true,
        side_effects: true,
        unused: true,
    }
    mangle = {}
    input: {
        var a = "FAIL";
    }
    expect: {
        var a = "FAIL";
    }
}
issue_2604_1: {
    options = {
    }
    input: {
        var a = "FAIL";
    }
    expect: {
        var a = "FAIL";
    }
}
issue_2604_2: {
    rename = true
    options = {
        evaluate: true,
        inline: true,
        passes: 3,
        reduce_vars: true,
        side_effects: true,
        unused: true,
    }
    mangle = {}
    input: {
        var a = "FAIL";
    }
    expect: {
        var a = "FAIL";
    }
}
unsafe_apply_1: {
    options = {
    }
}
unsafe_apply_2: {
    options = {
    }
}
unsafe_call_1: {
    options = {
    }
}
unsafe_call_2: {
    options = {
    }
}
unsafe_call_3: {
    options = {
    }
}
issue_2616: {
    options = {
    }
    input: {
        var c = "FAIL";
        (function() {
            function f() {
                function g(NaN) {
                    (true << NaN) - 0/0 || (c = "PASS");
                }
            }
        })();
    }
    expect: {
        var c = "FAIL";
        !function(NaN) {
            (true << NaN) - 0/0 || (c = "PASS");
        }([]);
    }
}
issue_2620_1: {
    options = {
    }
    input: {
        var c = "FAIL";
        (function() {
            function f(a) {
                if (a) {
                    var d = c = "PASS";
                }
            }
        })();
    }
    expect: {
        var c = "FAIL";
        !function(a) {
            if (function(a) {
            }(), a) c = "PASS";
        }(1),
    }
}
issue_2620_2: {
    options = {
    }
    input: {
        var c = "FAIL";
        (function() {
            function f(a) {
                if (a) {
                    var d = c = "PASS";
                }
            }
        })();
    }
    expect: {
        var c = "FAIL";
        c = "PASS",
    }
}
issue_2620_3: {
    options = {
    }
    input: {
        var c = "FAIL";
        (function() {
            function f(a, NaN) {
                function g() {
                    switch (a) {
                      case c = "PASS", NaN:
                    }
                }
            }
        })();
    }
    expect: {
        var c = "FAIL";
        !function(a, NaN) {
            (function() {
                switch (a) {
                    case c = "PASS", NaN:
                }
            })();
        }(NaN);
    }
}
issue_2620_4: {
    rename = true,
    options = {
        dead_code: true,
        evaluate: true,
        inline: true,
        passes: 2,
        reduce_vars: true,
        side_effects: true,
        switches: true,
        unused: true,
    }
    input: {
        var c = "FAIL";
    }
}
