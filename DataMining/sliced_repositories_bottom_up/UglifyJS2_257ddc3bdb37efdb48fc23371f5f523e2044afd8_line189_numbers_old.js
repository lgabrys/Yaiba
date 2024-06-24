unary_binary_parenthesis: {
    input: {
        var v = [ 0, 1, NaN, Infinity, null, undefined, true, false, "", "foo", /foo/ ];
    }
    expect: {
        var v = [ 0, 1, 0/0, 1/0, null, void 0, true, false, "", "foo", /foo/ ];
    }
}
