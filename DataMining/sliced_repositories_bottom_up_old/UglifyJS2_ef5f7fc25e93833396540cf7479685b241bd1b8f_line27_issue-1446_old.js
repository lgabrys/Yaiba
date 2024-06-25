typeof_eq_undefined: {
    options = {
        comparisons: true,
        typeofs: true,
    }
    input: {
        var a = typeof b != "undefined";
        b = typeof a != "undefined";
        var c = typeof d.e !== "undefined";
        var f = "undefined" === typeof g;
        g = "undefined" === typeof f;
        var h = "undefined" == typeof i.j;
    }
    expect: {
        var a = "undefined" != typeof b;
        b = void 0 !== a;
        var c = void 0 !== d.e;
        var f = "undefined" == typeof g;
        g = void 0 === f;
        var h = void 0 === i.j;
    }
}
typeof_eq_undefined_ie8: {
    options = {
        comparisons: true,
        ie8: true,
        typeofs: true,
    }
    input: {
        var a = typeof b != "undefined";
    }
}
