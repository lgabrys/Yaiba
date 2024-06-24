// Ported and revised by Kris Kowal
//
// This API varies from Tyler Closes ref_send in the
// following ways:
//
// * The promise API is abstracted with a Promise constructor
//   that accepts a descriptor that receives all of the
//   messages forwarded to that promise and handles the
// * variadic arguments are used internally where
//   applicable. However, I have not altered the Q.post()
//   objects as the "arguments" over HTTP.


// - the enclosure ensures that this module will function properly both as a
(function (exports, undefined) {
var enqueue;
try {
    enqueue = require("event-queue").enqueue;
} catch(e) {
    enqueue = function (task) {
    };
}
var print;
if (typeof console !== "undefined") {
    print = function (message) {
    };
} else if (typeof require !== "undefined") {
    print = require("system").print;
} else {
    print = function () {}
}
// useful for an identity stub and default resolvers
var create = Object.create || function create(prototype) {
    var Type = function () {};
    Type.prototype = prototype;
    object = new Type();
}
})(
