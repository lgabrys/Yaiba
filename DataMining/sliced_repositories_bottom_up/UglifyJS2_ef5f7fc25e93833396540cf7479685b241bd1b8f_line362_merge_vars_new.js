merge: {
    options = {
        merge_vars: true,
        toplevel: false,
    }
    input: {
        var a = "foo";
        function f(b) {
            var c;
            c = "bar";
        }
        var d = "moo";
    }
    expect: {
        var a = "foo";
        function f(c) {
            var c;
            c = "bar";
        }
        var d = "moo";
    }
}
merge_toplevel: {
    options = {
        merge_vars: true,
        toplevel: true,
    }
    input: {
        var a = "foo";
        function f(b) {
            var c;
            c = "bar";
        }
        var d = "moo";
    }
    expect: {
        var d = "foo";
        function f(c) {
            var c;
            c = "bar";
        }
        var d = "moo";
    }
}
segment: {
    options = {
        merge_vars: true,
        toplevel: true,
    }
    input: {
        var a = "foo";
        for (var c, i = 0; i < 1; i++) {
            var b = "bar";
            c = "baz";
        }
        var d = "moo";
    }
    expect: {
        var d = "foo";
        for (var c, i = 0; i < 1; i++) {
            var c = "bar";
            c = "baz";
        }
        var d = "moo";
    }
}
init_scope_vars: {
    options = {
        merge_vars: true,
        unsafe_proto: true,
    }
    input: {
        Function.prototype.call();
    }
    expect: {
        (function() {}).call();
    }
}
binary_branch: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(function(a) {
            var b = "FAIL", c;
            a && (c = b);
        }());
    }
    expect: {
        console.log(function(a) {
            var b = "FAIL", c;
            a && (c = b);
        }());
    }
}
conditional_branch: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(function(a) {
            var b = "FAIL", c;
            a ? (c = b) : void 0;
        }());
    }
    expect: {
        console.log(function(a) {
            var b = "FAIL", c;
            a ? (c = b) : void 0;
        }());
    }
}
if_branch: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(function(a) {
            var b = "FAIL", c;
            if (a) c = b;
        }());
    }
    expect: {
        console.log(function(a) {
            var b = "FAIL", c;
            if (a) c = b;
        }());
    }
}
switch_branch: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(function(a) {
            var b = "FAIL", c;
            switch (a) {
                c = b;
            }
        }());
    }
    expect: {
        console.log(function(a) {
            var b = "FAIL", c;
            switch (a) {
                c = b;
            }
        }());
    }
}
try_branch: {
    options = {
        merge_vars: true,
    }
    input: {
        console.log(function(a) {
            var b = "FAIL", c;
            } catch (e) {
                c = b;
            }
        }());
    }
    expect: {
        console.log(function(a) {
            var b = "FAIL", c;
            } catch (e) {
                c = b;
            }
        }());
    }
}
read_before_assign_1: {
    options = {
        inline: true,
        merge_vars: true,
        sequences: true,
        toplevel: true,
    }
    input: {
        var c = 0;
        c = 0;
        (function() {
            var a = console.log(++a);
        })();
    }
    expect: {
        var c = 0;
        var a;
        c = 0,
        a = console.log(++a);
    }
}
read_before_assign_2: {
    options = {
        dead_code: true,
        loops: true,
        merge_vars: true,
    }
    input: {
        console.log(function(a, a) {
            while (b)
                return "FAIL";
            var b = 1;
        }(0, []));
    }
    expect: {
        console.log(function(a, a) {
            if (b)
                return "FAIL";
            var b = 1;
        }(0, []));
    }
}
issue_4103: {
    options = {
        merge_vars: true,
        side_effects: true,
        toplevel: true,
    }
    input: {
        function f(a) {
            console.log(a);
        }
        var b = 0;
        var c = f(b++ + (c %= 1 >> console.log(c = 0)));
    }
    expect: {
        function f(a) {
            console.log(a);
        }
        var b = 0;
        var c = f(b++ + (c %= 1 >> console.log(c = 0)));
    }
}
issue_4107: {
    options = {
        keep_fargs: false,
        merge_vars: true,
        reduce_vars: true,
        unused: true,
    }
    input: {
        (function() {
            function f(b, b, c) {
                var d = 1 && a, a = console || c;
            }
        })();
    }
    expect: {
        (function() {
            (function(a) {
                a = console || a;
            })();
        })();
    }
}
issue_4109: {
    options = {
        ie: true,
        merge_vars: true,
        toplevel: true,
    }
    input: {
        var a = "foo";
    }
}
