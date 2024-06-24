var assert = require('assert');
var helper = require('../helper');
var intercept = require('intercept-stdout');
describe("The 'blpop' method", function () {
    helper.allTests(function (parser, ip, args) {
        describe('using ' + parser + ' and ' + ip, function () {
            it('pops value immediately if list contains values', function (done) {
                var text = '';
                var unhookIntercept = intercept(function (data) {
                    text += data;
                });
                assert(/^Send 127\.0\.0\.1:6379 id [0-9]+: \*3\r\n\$5\r\nrpush\r\n\$13\r\nblocking list\r\n\$13\r\ninitial value\r\n\n$/.test(text));
            });
        });
    });
});
