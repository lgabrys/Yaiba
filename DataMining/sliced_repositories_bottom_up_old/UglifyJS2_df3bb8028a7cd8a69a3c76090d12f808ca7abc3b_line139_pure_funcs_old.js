array: {
    options = {
    }
}
func: {
    options = {
    }
}
side_effects: {
    options = {
    }
}
unused: {
    options = {
        pure_funcs: [ "pure" ],
        side_effects: true,
        unused: true,
    }
    input: {
        function foo() {
            var u = pure(1);
            var x = pure(2);
            var y = pure(x);
            var z = pure(pure(side_effects()));
        }
    }
}
babel: {
    options = {
    }
}
conditional: {
    options = {
    }
}
relational: {
    options = {
        pure_funcs: [ "foo" ],
        side_effects :true,
    }
    input: {
        foo() in foo();
    }
}
