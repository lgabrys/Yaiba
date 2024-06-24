reduce_merge_const: {
    options = {
    }
}
reduce_merge_let: {
    options = {
    }
}
reduce_block_const: {
    options = {
    }
}
reduce_block_let: {
    options = {
    }
}
hoist_props_const: {
    options = {
        hoist_props: true,
        passes: 2,
        reduce_vars: true,
        toplevel: true,
        varify: true,
    }
    input: {
        {
            const o = {
                p: "PASS",
            };
        }
    }
    expect: {
        var o = 0, o_p = "PASS";
    }
}
