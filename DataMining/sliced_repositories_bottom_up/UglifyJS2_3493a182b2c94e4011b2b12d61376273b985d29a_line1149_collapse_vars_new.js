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
    expect: {
        function f3(x) {
            var b = x.prop;
            return b + (function() { return -9; })();
        }
    }
}
