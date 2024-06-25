reduce_vars: {
    options = {
    }
}
modified: {
    options = {
    }
    input: {
        function f2() {
            var a = 1, b = 2, c = 3;
            b = c;
            console.log(a + c);
        }
    }
}
unsafe_evaluate: {
    options = {
    }
}
unsafe_evaluate_defun: {
    options = {
    }
}
unsafe_evaluate_side_effect_free_1: {
    options = {
    }
}
unsafe_evaluate_side_effect_free_2: {
    options = {
    }
}
unsafe_evaluate_escaped: {
    options = {
    }
}
unsafe_evaluate_modified: {
    options = {
    }
}
unsafe_evaluate_unknown: {
    options = {
    }
}
unsafe_evaluate_object_1: {
    options = {
    }
}
unsafe_evaluate_object_2: {
    options = {
    }
}
unsafe_evaluate_object_3: {
    options = {
    }
}
unsafe_evaluate_array_1: {
    options = {
    }
}
unsafe_evaluate_array_2: {
    options = {
    }
}
unsafe_evaluate_array_3: {
    options = {
    }
}
unsafe_evaluate_array_4: {
    options = {
    }
}
unsafe_evaluate_array_5: {
    options = {
    }
}
unsafe_evaluate_equality_1: {
    options = {
    }
}
unsafe_evaluate_equality_2: {
    options = {
    }
}
passes: {
    options = {
    }
}
iife: {
    options = {
    }
}
iife_new: {
    options = {
    }
}
multi_def_1: {
    options = {
    }
}
multi_def_2: {
    options = {
    }
}
multi_def_3: {
    options = {
    }
}
use_before_var: {
    options = {
    }
}
inner_var_if: {
    options = {
    }
}
inner_var_label: {
    options = {
    }
}
inner_var_for_1: {
    options = {
    }
}
inner_var_for_2: {
    options = {
    }
}
inner_var_for_in_1: {
    options = {
    }
}
inner_var_for_in_2: {
    options = {
    }
}
inner_var_catch: {
    options = {
    }
}
issue_1533_1: {
    options = {
    }
}
issue_1533_2: {
    options = {
    }
}
toplevel_on: {
    options = {
        evaluate: true,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var x = 3;
    }
}
toplevel_off: {
    options = {
        evaluate: true,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: false,
        unused: true,
    }
    input: {
        var x = 3;
    }
    expect: {
        var x = 3;
    }
}
toplevel_on_loops_1: {
    options = {
        evaluate: true,
        loops: true,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        function bar() {
            console.log("bar:", --x);
        }
        var x = 3;
        while (x);
    }
    expect: {
        var x = 3;
        for (;function() {
            console.log("bar:", --x);
        }(), x;);
    }
}
toplevel_off_loops_1: {
    options = {
        evaluate: true,
        loops: true,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: false,
        unused: true,
    }
    input: {
        function bar() {
            console.log("bar:", --x);
        }
        var x = 3;
        while (x);
    }
    expect: {
        function bar() {
            console.log("bar:", --x);
        }
        var x = 3;
        for (;bar(), x;);
    }
}
toplevel_on_loops_2: {
    options = {
    }
    input: {
        var x = 3;
    }
}
toplevel_off_loops_2: {
    options = {
    }
    input: {
        var x = 3;
        while (x);
    }
    expect: {
        var x = 3;
        for (;bar(), x;);
    }
}
toplevel_on_loops_3: {
    options = {
        evaluate: true,
        loops: true,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var x = 3;
    }
        for (;;) bar();
}
toplevel_off_loops_3: {
    options = {
        evaluate: true,
        loops: true,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: false,
        unused: true,
    }
    input: {
        var x = 3;
        while (x) bar();
    }
    expect: {
        var x = 3;
        for (;x;) bar();
    }
}
defun_reference: {
    options = {
    }
}
defun_inline_1: {
    options = {
    }
}
defun_inline_2: {
    options = {
    }
}
defun_inline_3: {
    options = {
    }
}
defun_call: {
    options = {
    }
}
defun_redefine: {
    options = {
    }
}
func_inline: {
    options = {
    }
}
func_modified: {
    options = {
    }
}
unused_modified: {
    options = {
    }
}
defun_label: {
    options = {
    }
}
double_reference_1: {
    options = {
    }
}
double_reference_2: {
    options = {
    }
}
double_reference_3: {
    options = {
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var x = function f() {
            return f;
        };
    }
    expect: {
        var x = function f() {
            return f;
        };
    }
}
double_reference_4: {
    options = {
        comparisons: true,
        functions: true,
        inline: true,
        passes: 2,
        reduce_funcs: true,
        reduce_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        var x = function f() {
            return f;
        };
    }
}
iife_arguments_1: {
    options = {
    }
}
iife_arguments_2: {
    options = {
    }
}
iife_arguments_3: {
    options = {
    }
}
iife_eval_1: {
    options = {
    }
}
iife_eval_2: {
    options = {
    }
}
iife_func_side_effects: {
    options = {
    }
}
issue_1595_1: {
    options = {
    }
}
issue_1595_2: {
    options = {
    }
}
issue_1595_3: {
    options = {
    }
}
issue_1595_4: {
    options = {
    }
}
issue_1606: {
    options = {
    }
    expect: {
        function f() {
            x(2);
        }
    }
}
