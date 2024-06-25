constant_join: {
    options = {
    };
    input: {
        var f = [].join("");
    }
    expect: {
        var f = "";
    }
}
constant_join_2: {
    options = {
    };
    input: {
        var f = [ "str", "str" + variable, "foo", "bar", "moo" + foo ].join("");
    }
    expect: {
        var f = "strstr" + variable + "foobar" + ("moo" + foo);
    }
}
