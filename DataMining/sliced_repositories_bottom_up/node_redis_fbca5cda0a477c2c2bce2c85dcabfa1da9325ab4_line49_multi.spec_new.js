var zlib = require('zlib');
describe("The 'multi' method", function () {
    describe('regression test', function () {
        it('saved buffers with charsets different than utf-8 (issue #913)', function (done) {
            function run () {
                var test_arr = [];
                var json = JSON.stringify(test_arr);
                zlib.deflate(Buffer.from(json), function (err, buffer) {
                });
            }
        });
    });
});
