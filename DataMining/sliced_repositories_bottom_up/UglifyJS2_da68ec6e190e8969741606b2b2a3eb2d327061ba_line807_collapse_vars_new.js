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
collapse_vars_switch_1: {
    options = {
    }
}
collapse_vars_switch_2: {
    options = {
    }
}
collapse_vars_assignment: {
    options = {
    }
    expect: {
        function f0(c) {
            var a = 3 / c;
            return a = a;
        }
    }
}
