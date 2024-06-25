this_binding_conditionals: {
    options = {
        conditionals: true,
        evaluate: true,
        side_effects: true,
    }
    input: {
        "use strict";
    }
}
this_binding_collapse_vars: {
    options = {
        collapse_vars: true,
        toplevel: true,
        unused: true,
    }
    input: {
        "use strict";
        var c = a; c();
        var d = a.b; d();
        var e = eval; e();
    }
}
this_binding_side_effects: {
    options = {
        side_effects: true,
    }
    input: {
        (function(foo) {
            (0, foo)();
        }());
    }
}
