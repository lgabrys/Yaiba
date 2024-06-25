})(function (require, exports) {
var nextTick;
if (typeof process !== "undefined") {
    nextTick = process.nextTick;
} else if (typeof msSetImmediate === "function") {
    nextTick = msSetImmediate;
} else if (typeof setImmediate === "function") {
    nextTick = setImmediate;
} else if (typeof MessageChannel !== "undefined") {
    nextTick = function (task) {
    };
} else {
    nextTick = function (task) {
    };
}
var reduce = Array.prototype.reduce || function (callback, basis) {
    var index = 0,
        length = this.length;
    if (arguments.length === 1) {
        do {
            if (index in this) {
                basis = this[index++];
            }
            if (++index >= length) {
            }
        } while (1);
    }
    for (; index < length; index++) {
        if (index in this) {
            basis = callback(basis, this[index], index);
        }
    }
};
exports.nextTick = nextTick;
exports.defer = defer;
function defer() {
}
defer.prototype.node = // XXX deprecated
defer.prototype.makeNodeResolver = function () {
};
exports.promise = promise;
function promise(makePromise) {
}
exports.makePromise = makePromise;
function makePromise(descriptor, fallback, valueOf, rejected) {
    if (fallback === void 0) {
        fallback = function (op) {
            return reject(new Error("Promise does not support operation: " + op));
        };
    }
}
});
