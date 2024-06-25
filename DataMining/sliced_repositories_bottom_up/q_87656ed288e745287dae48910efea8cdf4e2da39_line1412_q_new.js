})(function () {
var nextTick;
if (typeof process !== "undefined") {
    nextTick = process.nextTick;
} else if (typeof setImmediate === "function") {
    if (typeof window !== "undefined") {
        nextTick = setImmediate.bind(window);
    } else {
        nextTick = setImmediate;
    }
} else (function(){
function uncurryThis(f) {
};
var array_slice = uncurryThis(Array.prototype.slice);
var array_reduce = uncurryThis(
    Array.prototype.reduce || function (callback, basis) {
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
    }
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
function promise(makePromise) {
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
Q.reject = reject;
function reject(exception) {
}
Q.fulfill = fulfill;
function fulfill(object) {
    return makePromise({
        "set": function (name, value) {
            object[name] = value;
        },
    });
}
Q.resolve = resolve;
function resolve(value) {
    value = valueOf(value);
}
Q.master = master;
function master(object) {
}
Q.when = when;
function when(value, fulfilled, rejected, progressed) {
}
Q.spread = spread;
function spread(promise, fulfilled, rejected) {
}
Q.async = async;
function async(makeGenerator) {
}
Q['return'] = _return;
function _return(value) {
}
Q.promised = promised;
function promised(callback) {
}
Q.dispatch = dispatch;
function dispatch(object, op, args) {
}
Q.dispatcher = dispatcher;
function dispatcher(op) {
}
Q.get = dispatcher("get");
Q.set = dispatcher("set");
Q["delete"] = // XXX experimental
Q.del = dispatcher("delete");
var post = Q.post = dispatcher("post");
Q.send = send;
Q.invoke = send; // synonyms
function send(value, name) {
}
Q.fapply = fapply;
function fapply(value, args) {
}
Q["try"] = fcall; // XXX experimental
Q.fcall = fcall;
function fcall(value) {
}
Q.fbind = fbind;
function fbind(value) {
}
Q.keys = dispatcher("keys");
Q.all = all;
function all(promises) {
}
Q.allResolved = allResolved;
function allResolved(promises) {
}
Q["catch"] = // XXX experimental
Q.fail = fail;
function fail(promise, rejected) {
}
Q.progress = progress;
function progress(promise, progressed) {
}
Q["finally"] = // XXX experimental
Q.fin = fin;
function fin(promise, callback) {
}
Q.done = done;
function done(promise, fulfilled, rejected, progress) {
}
Q.timeout = timeout;
function timeout(promise, ms) {
}
Q.delay = delay;
function delay(promise, timeout) {
    if (timeout === void 0) {
        timeout = promise;
        promise = void 0;
    }
}
Q.nfapply = nfapply;
function nfapply(callback, args) {
}
Q.nfcall = nfcall;
function nfcall(callback/*, ...args */) {
}
Q.nfbind = nfbind;
function nfbind(callback/*, ...args */) {
}
Q.npost = npost;
function npost(object, name, args) {
    var nodeArgs = array_slice(args || []);
}
});
