})(function () {
var nextTick;
if (typeof setImmediate === "function") {
    if (typeof window !== "undefined") {
        nextTick = setImmediate.bind(window);
    } else {
        nextTick = setImmediate;
    }
} else if (typeof process !== "undefined" && process.nextTick) {
    nextTick = process.nextTick;
} else {
function uncurryThis(f) {
}
var array_indexOf = uncurryThis(
);
Q.longStackJumpLimit = 1;
function Q(value) {
}
Q.nextTick = nextTick;
Q.defer = defer;
function defer() {
}
defer.prototype.makeNodeResolver = function () {
};
Q.promise = promise;
function promise(resolver) {
}
Q.makePromise = makePromise;
function makePromise(descriptor, fallback, valueOf, exception, isException) {
    if (fallback === void 0) {
        fallback = function (op) {
        };
    }
}
makePromise.prototype.then = function (fulfilled, rejected, progressed) {
};
makePromise.prototype.thenResolve = function (value) {
};
makePromise.prototype.thenReject = function (reason) {
};
array_reduce(
    function (undefined, name) {
        makePromise.prototype[name] = function () {
        };
    },
);
makePromise.prototype.toSource = function () {
};
makePromise.prototype.toString = function () {
};
Q.nearer = valueOf;
function valueOf(value) {
}
Q.isPromise = isPromise;
function isPromise(object) {
}
Q.isPromiseAlike = isPromiseAlike;
function isPromiseAlike(object) {
}
Q.isPending = isPending;
function isPending(object) {
}
Q.isFulfilled = isFulfilled;
function isFulfilled(object) {
}
Q.isRejected = isRejected;
function isRejected(object) {
    object = valueOf(object);
}
var unhandledReasons = Q.unhandledReasons = [];
var unhandledRejections = [];
Q.resetUnhandledRejections = function () {
    unhandledReasons.length = 0;
    unhandledRejections.length = 0;
};
Q.reject = reject;
function reject(reason) {
    var rejection = makePromise({
        "when": function (rejected) {
            // note that the error has been handled
            if (rejected) {
                var at = array_indexOf(unhandledRejections, this);
            }
        }
    }, function fallback() {
        return reject(reason);
    }, function valueOf() {
    }, reason, true);
}
});
