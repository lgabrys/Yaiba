typeof_evaluation: {
    options = {
    };
    input: {
        g = typeof function(){};
        h = typeof undefined;
    }
    expect: {
        g='function';
        h='undefined';
    }
}
typeof_in_boolean_context: {
    options = {
    };
}
issue_1668: {
    options = {
    }
}
typeof_defun_1: {
    options = {
    }
    input: {
        function f() {
            console.log("YES");
        }
        function g() {
            h = 42;
        }
        function h() {
            console.log("YUP");
        }
        g = 42;
    }
    expect: {
        function g() {
            h = 42;
        }
        g = 42;
        "function" == typeof h && h();
    }
}
