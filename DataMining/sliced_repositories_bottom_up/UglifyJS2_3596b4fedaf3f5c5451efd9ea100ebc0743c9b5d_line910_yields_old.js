empty_yield_conditional: {
    expect_stdout: [
    ]
}
nested_yield: {
    input: {
        console.log(function*() {
            function* f() {
            }
        }().next().value || "PASS");
    }
}
pause_resume: {
    expect_stdout: [
    ]
}
collapse_vars_1: {
    options = {
    }
}
collapse_vars_2: {
    options = {
    }
}
collapse_vars_3: {
    options = {
    }
}
collapse_vars_4: {
    options = {
    }
}
collapse_vars_5: {
    options = {
    }
}
collapse_property_lambda: {
    options = {
    }
}
drop_fname: {
    options = {
    }
}
keep_fname: {
    options = {
    }
}
evaluate: {
    options = {
    }
}
functions: {
    options = {
    }
}
functions_use_strict: {
    options = {
    }
}
functions_anonymous: {
    options = {
    }
    expect: {
    }
}
functions_inner_var: {
    options = {
    }
    expect: {
        function* yield() {
        }
    }
}
negate_iife: {
    options = {
    }
}
reduce_iife_1: {
    options = {
    }
}
reduce_iife_2: {
    options = {
    }
}
reduce_single_use_defun: {
    options = {
    }
}
reduce_tagged: {
    options = {
    }
}
reduce_tagged_async: {
    options = {
    }
}
lift_sequence: {
    options = {
    }
}
inline_nested: {
    options = {
    }
}
inline_nested_async: {
    options = {
    }
}
inline_nested_block: {
    options = {
    }
}
dont_inline_nested: {
    options = {
    }
}
drop_body: {
    options = {
    }
    expect: {
        [ [ , [].e = console.log("foo") ] ] = [ [ console.log("baz") ] ];
    }
}
