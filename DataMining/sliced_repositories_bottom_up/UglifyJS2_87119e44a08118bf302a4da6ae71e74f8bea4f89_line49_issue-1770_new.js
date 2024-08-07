mangle_props: {
    mangle = {
        properties: true,
    }
    input: {
        var obj = {
            undefined: 1,
            NaN: 2,
            Infinity: 3,
            "-Infinity": 4,
            null: 5,
        };
    }
    expect: {
        var obj = {
            undefined: 1,
            NaN: 2,
            Infinity: 3,
            "-Infinity": 4,
            null: 5,
        };
        console.log(
            obj[void 0],
            obj[void 0],
            obj["undefined"],
            obj[0/0],
            obj[NaN],
            obj["NaN"],
            obj[1/0],
            obj[1/0],
            obj["Infinity"],
            obj[-1/0],
            obj[-(1/0)],
            obj["-Infinity"],
            obj[null],
            obj["null"]
        );
    }
}
