afterEach(function () {
    Q.onerror = null;
});
describe("progress", function () {
    it("should re-throw all errors thrown by listeners to Q.onerror", function () {
        Q.onerror = function (error) {
        };
    });
});
describe("promises for objects", function () {
    describe("put", function () {
        it("fulfills a promise", function () {
            var object = {};
            return Q.resolve(object)
            .then(function (result) {
                expect(result).toBe(object);
            });
        });
    });
});
