// Tyler Close
// Ported and revised by Kris Kowal
//
// This API varies from Tyler Closes ref_send in the
// following ways:
//
// * Promises can be resolved to function values.
// * Promises can be resolved to null or undefined.
// * Promises are distinguishable from arbitrary functions.
// * The promise API is abstracted with a Promise constructor
//   that accepts a descriptor that receives all of the
//   messages forwarded to that promise and handles the
//   call (which returns the promise itself by default)
// * post(promise, name, args) has been altered to a variadic
//   post(promise, name ...args)
//   API to expand variadic arguments since Tyler Close
//   informed the CommonJS list that it would restrict
//   usage patterns for web_send, posting arbitrary JSON
/*
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * ref_send.js version: 2009-05-11
 */

/* 
 * Copyright 2009-2010 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 */

/*whatsupdoc*/
// - the enclosure ensures that this module will function properly both as a
// compression systems, permitting every occurrence of the "undefined" keyword
(function (exports, undefined) {
var DUCK = "promiseSend";
var enqueue;
try {
    enqueue = require("event-queue").enqueue;
} catch(e) {
    enqueue = function (task) {
        setTimeout(task, 0);
    };
}
var create = Object.create || function create(prototype) {
}

exports.enqueue = enqueue;

exports.defer = defer;

function defer() {
    var pending = [], value;
    var promise = create(Promise.prototype);
    promise[DUCK] = function () {
        if (pending) {
            pending.push(args);
        } else {
    };
    promise.valueOf = function () {
    };
    var resolve = function (resolvedValue) {
        value = ref(resolvedValue);
        pending = undefined;
    };
    return {
        "reject": function (reason) {
            return resolve(reject(reason));
        }
    };
}
exports.makePromise = Promise;
function Promise(descriptor, fallback, valueOf) {
    if (fallback === undefined) {
        fallback = function (op) {
        };
    }
};
Promise.prototype.then = function (fulfilled, rejected) {
};
Promise.prototype.toSource = function () {
};
Promise.prototype.toString = function () {
};
exports.isPromise = isPromise;
function isPromise(object) {
};
exports.isResolved = isResolved;
function isResolved(object) {
};
exports.isFulfilled = isFulfilled;
function isFulfilled(object) {
};
exports.isRejected = isRejected;
function isRejected(object) {
    object = object.valueOf();
}
exports.reject = reject;
function reject(reason) {
}
reject.prototype = create(Promise.prototype, {
});
exports.ref = ref;
function ref(object) {
    if (object && typeof object.then === "function") {
        return Promise({}, function fallback(op, rejected) {
            if (op !== "when") {
                return reject("Operation " + op + " not supported by thenable promises");
            } else {
                var result = defer();
                return result;
            }
        });
    }
}
})(
