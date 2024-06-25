// vim:ts=4:sts=4:sw=4:

})(function (require, exports) {
var nextTick;
if (typeof process !== "undefined") {
    nextTick = process.nextTick;
} else if (typeof msSetImmediate === "function") {
    nextTick = msSetImmediate.bind(window);
} else if (typeof setImmediate === "function") {
    nextTick = setImmediate;
} else if (typeof MessageChannel !== "undefined") {
    nextTick = function (task) {
    };
} else {
    nextTick = function (task) {
    };
}
var object_create = Object.create || function (prototype) {
};
function getStackFrames(objectWithStack) {
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (error, frames) {
    };
    Error.prepareStackTrace = oldPrepareStackTrace;
}
var qFileName;
if (Error.captureStackTrace) {
    qFileName = (function () {
        var oldPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (error, frames) {
        };
        Error.prepareStackTrace = oldPrepareStackTrace;
    })();
}
exports.nextTick = nextTick;
exports.defer = defer;
function defer() {
    var pending = [], value;
    var deferred = object_create(defer.prototype);
    var promise = object_create(makePromise.prototype);
    promise.promiseSend = function () {
    };
    promise.valueOf = function () {
    };
    function become(resolvedValue) {
        value = resolve(resolvedValue);
        pending = void 0;
    }
    deferred.promise = promise;
    deferred.resolve = become;
    deferred.reject = function (exception) {
    };
}
defer.prototype.node = // XXX deprecated
defer.prototype.makeNodeResolver = function () {
};
exports.promise = promise;
function promise(makePromise) {
}
exports.makePromise = makePromise;
function makePromise(descriptor, fallback, valueOf, exception) {
    if (fallback === void 0) {
        fallback = function (op) {
        };
    }
}
makePromise.prototype.then = function (fulfilled, rejected) {
};
array_reduce(
    function (prev, name) {
        makePromise.prototype[name] = function () {
        };
    },
);
makePromise.prototype.toSource = function () {
};
makePromise.prototype.toString = function () {
};
exports.nearer = valueOf;
function valueOf(value) {
}
exports.isPromise = isPromise;
function isPromise(object) {
}
exports.isResolved = isResolved;
function isResolved(object) {
}
exports.isFulfilled = isFulfilled;
function isFulfilled(object) {
}
exports.isRejected = isRejected;
function isRejected(object) {
    object = valueOf(object);
}
exports.reject = reject;
function reject(exception) {
    exception = exception || new Error();
}
exports.begin = resolve; // XXX experimental
exports.resolve = resolve;
exports.ref = resolve; // XXX deprecated, use resolve
function resolve(object) {
    return makePromise({
        "put": function (name, value) {
            return object[name] = value;
        },
    });
}
exports.master = master;
function master(object) {
    return makePromise({
    }, function fallback(op) {
    }, function () {
    });
}
exports.viewInfo = viewInfo;
function viewInfo(object, info) {
    object = resolve(object);
}
exports.view = view;
function view(object) {
}
exports.when = when;
function when(value, fulfilled, rejected) {
}
exports.spread = spread;
function spread(promise, fulfilled, rejected) {
    return when(promise, function (values) {
    }, rejected);
}
exports.async = async;
function async(makeGenerator) {
}
exports['return'] = _return;
function _return(value) {
}
exports.sender = sender; // XXX deprecated, use dispatcher
exports.Method = sender; // XXX deprecated, use dispatcher
function sender(op) {
}
exports.send = send; // XXX deprecated, use dispatch
function send(object, op) {
    object = resolve(object);
}
exports.dispatch = dispatch;
function dispatch(object, op, args) {
    object = resolve(object);
}
exports.dispatcher = dispatcher;
function dispatcher(op) {
}
exports.get = dispatcher("get");
exports.put = dispatcher("put");
exports["delete"] = // XXX experimental
exports.del = dispatcher("del");
var post = exports.post = dispatcher("post");
exports.invoke = function (value, name) {
};
var apply = exports.apply = dispatcher("apply"); // XXX deprecated, use fapply
var fapply = exports.fapply = dispatcher("fapply");
exports.call = call; // XXX deprecated, use fcall
function call(value, thisp) {
}
exports["try"] = fcall; // XXX experimental
exports.fcall = fcall;
function fcall(value) {
}
exports.bind = bind; // XXX deprecated, use fbind
function bind(value, thisp) {
}
exports.fbind = fbind;
function fbind(value) {
}
exports.keys = dispatcher("keys");
exports.all = all;
function all(promises) {
}
exports.allResolved = allResolved;
function allResolved(promises) {
}
exports["catch"] = // XXX experimental
exports.fail = fail;
function fail(promise, rejected) {
}
exports["finally"] = // XXX experimental
exports.fin = fin;
function fin(promise, callback) {
}
exports.end = end; // XXX stopgap
function end(promise) {
    when(promise, void 0, function (error) {
        nextTick(function () {
            if (Error.captureStackTrace && "stack" in error) {
            }
        });
    });
}
});
