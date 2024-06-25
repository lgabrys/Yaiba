keep_properties: {
    options = {
    };
    input: {
        a["foo"] = "bar";
    }
    expect: {
        a["foo"] = "bar";
    }
}
dot_properties: {
    options = {
    };
    input: {
        a["foo"] = "bar";
        a["if"] = "if";
        a["*"] = "asterisk";
        a["\u0EB3"] = "unicode";
        a[""] = "whitespace";
        a["1_1"] = "foo";
    }
    expect: {
        a.foo = "bar";
        a["if"] = "if";
        a["*"] = "asterisk";
        a["\u0EB3"] = "unicode";
        a[""] = "whitespace";
        a["1_1"] = "foo";
    }
}
dot_properties_es5: {
    options = {
    };
    input: {
        a["foo"] = "bar";
        a["if"] = "if";
        a["*"] = "asterisk";
        a["\u0EB3"] = "unicode";
        a[""] = "whitespace";
    }
    expect: {
        a.foo = "bar";
        a.if = "if";
        a["*"] = "asterisk";
        a["\u0EB3"] = "unicode";
        a[""] = "whitespace";
    }
}
sub_properties: {
    options = {
    };
    input: {
        a[0] = 0;
        a["0"] = 1;
        a[3.14] = 2;
        a["3" + ".14"] = 3;
        a["i" + "f"] = 4;
        a["foo" + " bar"] = 5;
        a[0 / 0] = 6;
        a[null] = 7;
        a[undefined] = 8;
    }
    expect: {
        a[0] = 0;
        a[0] = 1;
        a[3.14] = 2;
        a[3.14] = 3;
        a.if = 4;
        a["foo bar"] = 5;
        a[NaN] = 6;
    }
}
}
