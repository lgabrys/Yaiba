unused_funarg_1: {
    options = { unused: true, keep_fargs: false };
}
unused_funarg_2: {
    options = { unused: true, keep_fargs: false };
}
unused_nested_function: {
    options = { unused: true };
}
unused_circular_references_1: {
    options = { unused: true };
}
unused_circular_references_2: {
    options = { unused: true };
}
unused_circular_references_3: {
    options = { unused: true };
}
unused_keep_setter_arg: {
    options = { unused: true };
}
unused_var_in_catch: {
    options = { unused: true };
}
used_var_in_catch: {
    options = { unused: true };
}
keep_fnames: {
    options = { unused: true, keep_fnames: true, unsafe: true };
}
drop_assign: {
    options = { unused: true };
}
keep_assign: {
    options = { unused: "keep_assign" };
}
drop_toplevel_funcs: {
    options = { toplevel: "funcs", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, b = 1, c = g;
        a = 2;
        function g() {}
        console.log(b = 3);
    }
}
drop_toplevel_vars: {
    options = { toplevel: "vars", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
    }
}
drop_toplevel_vars_fargs: {
    options = { keep_fargs: false, toplevel: "vars", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var c = g;
        function f() {
            return function() {
                c = 2;
            }
        }
    }
}
drop_toplevel_all: {
    options = { toplevel: true, unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
}
drop_toplevel_retain: {
    options = { top_retain: "f,a,o", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
    }
}
drop_toplevel_retain_array: {
    options = { top_retain: [ "f", "a", "o" ], unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
    }
}
drop_toplevel_retain_regex: {
    options = { top_retain: /^[fao]$/, unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
    }
}
drop_toplevel_all_retain: {
    options = { toplevel: true, top_retain: "f,a,o", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
    }
}
drop_toplevel_funcs_retain: {
    options = { toplevel: "funcs", top_retain: "f,a,o", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        console.log(b = 3);
    }
}
drop_toplevel_vars_retain: {
    options = { toplevel: "vars", top_retain: "f,a,o", unused: true };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
    }
}
drop_toplevel_keep_assign: {
    options = { toplevel: true, unused: "keep_assign" };
    input: {
        var a, b = 1, c = g;
        function f(d) {
            return function() {
                c = 2;
            }
        }
        a = 2;
        function g() {}
        function h() {}
        console.log(b = 3);
    }
    expect: {
        var a, b = 1;
        a = 2;
        console.log(b = 3);
    }
}
drop_fargs: {
    options = {
    }
}
drop_fnames: {
    options = {
    }
}
global_var: {
    options = {
        side_effects: true,
        unused: true,
    }
    input: {
        var a;
    }
    expect: {
        var a;
    }
}
iife: {
    options = {
    }
    expect: {
        function f() {
            b;
        }
    }
}
