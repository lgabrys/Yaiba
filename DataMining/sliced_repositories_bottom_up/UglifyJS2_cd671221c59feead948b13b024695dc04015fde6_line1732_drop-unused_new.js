unused_funarg_1: {
    options = {
    }
}
unused_funarg_2: {
    options = {
    }
}
unused_nested_function: {
    options = {
    }
}
unused_circular_references_1: {
    options = {
    }
}
unused_circular_references_2: {
    options = {
    }
    expect: {
        function f(x, y) {
            return x + y;
        }
    }
}
unused_circular_references_3: {
    options = {
    }
}
unused_keep_setter_arg: {
    options = {
    }
}
unused_var_in_catch: {
    options = {
    }
}
used_var_in_catch: {
    options = {
    }
}
keep_fnames: {
    options = {
    }
}
drop_assign: {
    options = {
    }
}
keep_assign: {
    options = {
    }
}
drop_toplevel_funcs: {
    options = {
    }
}
drop_toplevel_vars: {
    options = {
    }
}
drop_toplevel_vars_fargs: {
    options = {
    }
}
drop_toplevel_all: {
    options = {
    }
}
drop_toplevel_retain: {
    options = {
    }
}
drop_toplevel_retain_array: {
    options = {
    }
}
drop_toplevel_retain_regex: {
    options = {
    }
}
drop_toplevel_all_retain: {
    options = {
    }
}
drop_toplevel_funcs_retain: {
    options = {
    }
}
drop_toplevel_vars_retain: {
    options = {
    }
}
drop_toplevel_keep_assign: {
    options = {
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
    }
}
iife: {
    options = {
    }
}
issue_1539: {
    options = {
    }
}
vardef_value: {
    options = {
    }
}
assign_binding: {
    options = {
    }
}
assign_chain: {
    options = {
    }
}
issue_1583: {
    options = {
    }
}
issue_1656: {
    options = {
    }
}
issue_1709: {
    options = {
    }
}
issue_1715_1: {
    options = {
    }
}
issue_1715_2: {
    options = {
    }
}
issue_1715_3: {
    options = {
    }
}
issue_1715_4: {
    options = {
    }
}
delete_assign_1: {
    options = {
    }
}
delete_assign_2: {
    options = {
    }
}
drop_var: {
    options = {
    }
}
issue_1830_1: {
    options = {
    }
}
issue_1830_2: {
    options = {
    }
}
issue_1838: {
    options = {
    }
}
var_catch_toplevel: {
    options = {
    }
}
issue_2105_1: {
    options = {
    }
}
issue_2105_2: {
    options = {
    }
}
issue_2105_3: {
    options = {
    }
}
issue_2226_1: {
    options = {
    }
}
issue_2226_2: {
    options = {
    }
}
issue_2226_3: {
    options = {
    }
}
issue_2288: {
    options = {
    }
}
issue_2516_1: {
    options = {
    }
}
issue_2516_2: {
    options = {
    }
}
defun_lambda_same_name: {
    options = {
    }
}
issue_2660_1: {
    options = {
    }
}
issue_2660_2: {
    options = {
    }
}
issue_2665: {
    options = {
    }
}
double_assign_1: {
    options = {
    }
}
double_assign_2: {
    options = {
    }
}
double_assign_3: {
    options = {
    }
}
cascade_drop_assign: {
    options = {
    }
}
chained_3: {
    options = {
    }
    expect: {
        console.log(function(a, b) {
            var c = b;
        }(0, 2));
    }
}
