and: {
    options = {
    }
}
or: {
    options = {
    }
}
unary_prefix: {
    options = {
    }
}
negative_zero: {
    options = { evaluate: true }
}
positive_zero: {
    options = { evaluate: true }
}
unsafe_constant: {
    options = {
    }
}
unsafe_object: {
    options = {
    }
}
unsafe_object_nested: {
    options = {
    }
}
unsafe_object_complex: {
    options = {
    }
}
unsafe_object_repeated: {
    options = {
    }
}
unsafe_function: {
    options = {
    }
}
unsafe_integer_key: {
    options = {
    }
}
unsafe_integer_key_complex: {
    options = {
    }
}
unsafe_float_key: {
    options = {
    }
}
unsafe_float_key_complex: {
    options = {
    }
}
unsafe_array: {
    options = {
    }
}
unsafe_string: {
    options = {
    }
}
unsafe_array_bad_index: {
    options = {
    }
}
unsafe_string_bad_index: {
    options = {
    }
}
unsafe_prototype_function: {
    options = {
    }
}
call_args: {
    options = {
    }
    expect: {
        +function(a) {
            return a;
        }(1);
    }
}
