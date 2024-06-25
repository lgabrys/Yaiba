function test(options) {
    var args = options.args || [];
    if (options.valid) {
        options.valid.forEach(function (valid) {
            args[0] = valid;
        });
    }
    if (options.invalid) {
        options.invalid.forEach(function (invalid) {
            args[0] = invalid;
        });
    }
}
describe('Validators', function () {
    it('should validate a string that is in another object', function () {
        test({ validator: 'isIn', args: [{'foo':1, 'bar':2, 'foobar':3}], valid: ['foo', 'bar', 'foobar'],
            invalid: ['foobarbaz', 'barfoo', ''] });
        test({ validator: 'isIn', args: [{'foo':1, 'bar':2, 'foobar':3}], valid: ['1', '2', 3],
            invalid: ['foobarbaz', 'barfoo', ''] });
    });
});
