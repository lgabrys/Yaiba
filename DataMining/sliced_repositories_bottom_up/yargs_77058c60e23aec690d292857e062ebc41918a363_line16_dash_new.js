var test = require('tap').test;
test('-', function (t) {
    t.deepEqual(
        { n: '-', _: [] }
    );
    t.deepEqual(
        { _: [ '-' ] }
    );
    t.deepEqual(
        { f: '-', _: [] }
    );
});
