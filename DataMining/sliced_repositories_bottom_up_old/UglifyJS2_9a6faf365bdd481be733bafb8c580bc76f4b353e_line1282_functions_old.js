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
}
issue_2097: {
    options = {
    }
}
issue_2101: {
    options = {
    }
    input: {
        a = {};
    }
    expect: {
        a = {};
    }
}
inner_ref: {
    options = {
    }
}
issue_2107: {
    options = {
    }
}
issue_2114_1: {
    options = {
    }
    input: {
        }([ {
        }, typeof void function a() {
        }() ]);
    }
}
issue_2114_2: {
    options = {
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
}
inline_loop_2: {
    options = {
    }
}
inline_loop_3: {
    options = {
    }
}
inline_loop_4: {
    options = {
    }
}
issue_2476: {
    options = {
    }
}
issue_2601_1: {
    options = {
    }
    input: {
        (function() {
            function f(b) {
                (function() {
                    b && (a = "PASS");
                })();
            }
        })();
    }
    expect: {
        (function() {
            var b;
            b = "foo",
            b && (a = "PASS");
        })(),
    }
}
issue_2601_2: {
    options = {
    }
    input: {
        (function() {
            function f(b) {
                (function() {
                    b && (a = "PASS");
                })();
            }
        })();
    }
    expect: {
        a = "PASS",
    }
}
issue_2604_1: {
    options = {
    }
    input: {
        (function() {
            try {
            } catch (b) {
                b && (a = "PASS");
            }
        })();
    }
    expect: {
        (function() {
            try {
            } catch (b) {
                b && (a = "PASS");
            }
        })();
    }
}
issue_2604_2: {
    options = {
    }
    input: {
        (function() {
            try {
            } catch (b) {
                b && (a = "PASS");
            }
        })();
    }
    expect: {
        (function() {
            try {
            } catch (o) {
                o && (a = "PASS");
            }
        })();
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
}
issue_2620_1: {
    options = {
    }
}
issue_2620_2: {
    options = {
    }
}
issue_2620_3: {
    options = {
    }
}
issue_2620_4: {
    options = {
    }
}
issue_2630_1: {
    options = {
    }
}
issue_2630_2: {
    options = {
    }
}
issue_2630_3: {
    options = {
    }
    expect: {
        (function() {
            (function f1() {
            })(a++);
        })();
    }
}
