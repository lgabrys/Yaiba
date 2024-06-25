arrow_destructured_object_1: {
    input: {
        var f = ({ ...a }) => a, o = f({ PASS: 42 });
    }
}
arrow_destructured_object_2: {
    input: {
        var f = ({ FAIL: a, ...b }) => b, o = f({ PASS: 42, FAIL: null });
    }
}
arrow_destructured_object_3: {
    input: {
        var f = ([ { ...a } = [ "FAIL" ] ]) => a;
        var o = f([ "PASS" ]);
    }
}
funarg_1: {
    expect_exact: 'console.log.apply(console,function(...a){return a}("PASS",42));'
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
    }
}
inline: {
    options = {
    }
    expect: {
        var a, b, c;
    }
}
retain_var: {
    options = {
    }
    input: {
        var [ ...a ] = [ "PASS" ];
    }
    expect: {
        var [ ...a ] = [ "PASS" ];
    }
}
reduce_destructured_array: {
    options = {
    }
    input: {
        var [ ...a ] = [ "PASS" ];
    }
}
reduce_destructured_object: {
    options = {
    }
}
retain_destructured_array: {
    options = {
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
    }
    input: {
        var { 0: a, ...b } = [ "FAIL", "PASS", 42 ];
    }
    expect: {
        var { 0: a, ...b } = [ "FAIL", "PASS", 42 ];
    }
}
retain_destructured_object_2: {
    options = {
    }
    input: {
        var { foo: [ a ], ...b } = { foo: [ "FAIL" ], bar: "PASS", baz: 42 };
    }
    expect_stdout: [
        "bar PASS",
    ]
}
retain_funarg_destructured_array_1: {
    options = {
    }
}
retain_funarg_destructured_array_2: {
    options = {
        unused: true,
    }
    input: {
    }
}
retain_funarg_destructured_object_1: {
    options = {
    }
    input: {
        console.log((({ ...a }) => a)([ "PASS" ])[0]);
    }
}
retain_funarg_destructured_object_2: {
    options = {
    }
}

drop_unused_call_args_1: {
    options = {
    }
    input: {
        (function(...a) {
        })(42, console.log("PASS"));
    }
}
drop_unused_call_args_2: {
    options = {
        unused: true,
    }
}
maintain_position: {
    options = {
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
    }
    expect: {
        (function(...a) {
            console.log(a);
        })();
    }
}
merge_funarg_destructured_array: {
    options = {
    }
}

merge_funarg_destructured_object: {
    options = {
    }
    input: {
        (function({ ...a }) {
            var b = a[0];
        })([ "PASS" ]);
    }
}
keep_arguments: {
    options = {
    }
}
drop_rest_array: {
    options = {
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
    }
    node_version: ">=6"
}
drop_rest_lambda: {
    options = {
        toplevel: true,
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
    }
}
keep_rest_arrow: {
    options = {
    }
}
keep_rest_lambda_1: {
    options = {
    }
}
keep_rest_lambda_2: {
    options = {
    }
}
drop_new_function: {
    options = {
    }
    expect: {
        void ([ ... {
            [console.log("PASS")]: [].e,
        }] = []);
    }
}
