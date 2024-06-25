make_sequences_4: {
    input: {
        x = 5;
        if (y) z();
        x = 5;
        for (i = 0; i < 5; i++) console.log(i);
        x = 5;
        for (; i < 5; i++) console.log(i);
        x = 5;
        switch (y) {}
        x = 5;
    }
    expect: {
        if (x = 5, y) z();
        for (x = 5, i = 0; i < 5; i++) console.log(i);
        for (x = 5; i < 5; i++) console.log(i);
        switch (x = 5, y) {}
        with (x = 5, obj);
    }
}
lift_sequences_1: {
    input: {
        var foo, x, y, bar;
        foo = !(x(), y(), bar());
    }
    expect: {
        var foo, x, y, bar;
        x(), y(), foo = !bar();
    }
}
lift_sequences_2: {
    input: {
        var foo, bar;
        foo.x = (foo = {}, 10);
        bar = (bar = {}, 10);
    }
    expect: {
        var foo, bar;
        foo.x = (foo = {}, 10),
        bar = {}, bar = 10;
    }
}
lift_sequences_3: {
    input: {
        var x, foo, bar, baz;
        x = (foo(), bar(), baz()) ? 10 : 20;
    }
    expect: {
        var x, foo, bar, baz;
        foo(), bar(), x = baz() ? 10 : 20;
    }
}
lift_sequences_4: {
    input: {
        var x, foo, bar, baz;
        x = (foo, bar, baz);
    }
    expect: {
        var x, foo, bar, baz;
        x = baz;
    }
}
for_sequences: {
    input: {
        for (x = 5; false;);
        x = (foo in bar);
        x = (foo in bar);
        for (y = 5; false;);
    }
    expect: {
        for (foo(), bar(); false;);
        for (foo(), bar(), x = 5; false;);
        x = (foo in bar);
        x = (foo in bar);
        for (y = 5; false;);
    }
}
}
negate_iife_for: {
    input: {
        for (i = 0; i < 5; i++) console.log(i);
        (function() {})();
        for (; i < 5; i++) console.log(i);
    }
    expect: {
        for (!function() {}(), i = 0; i < 5; i++) console.log(i);
        for (function() {}(); i < 5; i++) console.log(i);
    }
}
iife: {
    input: {
        x = 42;
    }
    expect: {
        x = 42, function a() {}(), function b() {}(), function c() {}(),
        function d() {}(), function e() {}(), function f() {}(), function g() {}();
    }
}
