evaluate: {
    options = {
        evaluate: true,
        side_effects: true,
    }
    input: {
        void console.log("foo" ?? "bar") ?? console.log("baz");
    }
}
conditional_assignment_1: {
    options = {
        collapse_vars: true,
    }
    input: {
        console.log(function(a, b) {
            b ?? (a = "FAIL");
        }("PASS", !console));
    }
    expect: {
        console.log(function(a, b) {
            b ?? (a = "FAIL");
        }("PASS", !console));
    }
}
conditional_assignment_2: {
    options = {
        conditionals: true,
    }
    input: {
        var a, b = false;
        a = "PASS",
        b ?? (a = "FAIL"),
        console.log(a);
    }
    expect: {
        var a, b = false;
        a = "PASS",
        b ?? (a = "FAIL"),
        console.log(a);
    }
}
conditional_assignment_3: {
    options = {
        conditionals: true,
        join_vars: true,
    }
    input: {
        var a, b = false;
        a = "PASS",
        b ?? (a = "FAIL"),
        console.log(a);
    }
    expect: {
        var a, b = false, a = "PASS";
        b ?? (a = "FAIL"),
        console.log(a);
    }
    node_version: ">=14"
}
conditional_assignment_4: {
    options = {
        side_effects: true,
    }
    input: {
        console.log(function(a) {
            !console ?? (a = "FAIL");
        }("PASS"));
    }
    expect: {
        console.log(function(a) {
            !console ?? (a = "FAIL");
        }("PASS"));
    }
}
de_morgan_1: {
    options = {
        booleans: true,
    }
    input: {
        function f(a) {
            return a ?? a;
        }
    }
    expect: {
        function f(a) {
            return a;
        }
    }
}
de_morgan_2a: {
    options = {
        booleans: true,
        conditionals: true,
        evaluate: true,
    }
    input: {
        function f(a, b) {
            return a || (a ?? b);
        }
    }
    expect: {
        function f(a, b) {
            return a || (a ?? b);
        }
    }
}
de_morgan_2b: {
    options = {
        booleans: true,
        evaluate: true,
    }
    input: {
        function f(a, b) {
            return a && (a ?? b);
        }
    }
    expect: {
        function f(a, b) {
            return a;
        }
    }
}
de_morgan_2c: {
    options = {
        booleans: true,
        evaluate: true,
        side_effects: true,
    }
    input: {
        function f(a, b) {
            return a ?? (a || b);
        }
    }
    expect: {
        function f(a, b) {
            return a ?? b;
        }
    }
}
de_morgan_2d: {
    options = {
        booleans: true,
        evaluate: true,
    }
    input: {
        function f(a, b) {
            return a ?? (a && b);
        }
    }
    expect: {
        function f(a, b) {
            return a;
        }
    }
}
de_morgan_2e: {
    options = {
        booleans: true,
        conditionals: true,
    }
    input: {
        function f(a, b) {
            return a ?? (a ?? b);
        }
    }
    expect: {
        function f(a, b) {
            return a ?? b;
        }
    }
}
issue_4679: {
    options = {
        comparisons: true,
        ie: true,
    }
    input: {
        var a;
    }
}
