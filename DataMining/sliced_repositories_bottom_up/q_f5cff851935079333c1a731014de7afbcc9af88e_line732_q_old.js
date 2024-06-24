})(function (serverSideRequire, exports) {
var nextTick;
try {
    nextTick = serverSideRequire("event-queue").enqueue;
} catch (e) {
    if (typeof MessageChannel !== "undefined") {
        nextTick = function (task) {
        };
    } else {
        nextTick = function (task) {
        };
    }
}
var shim = function (object, name, shim) {
        object[name] = shim;
};
var create = shim(Object, "create", function (prototype) {
});
var valueOf = function (value) {
};
exports.nextTick = nextTick;
exports.defer = defer;
function defer() {
}
defer.prototype.node = function () {
};
exports.makePromise = Promise;
function Promise(descriptor, fallback, valueOf) {
    if (fallback === void 0) {
        fallback = function (op) {
        };
    }
};
Promise.prototype.then = function (fulfilled, rejected) {
};
reduce.call(
    function (prev, name) {
        Promise.prototype[name] = function () {
        };
    },
)
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
    object = valueOf(object);
}
exports.reject = reject;
function reject(reason) {
}
reject.prototype = create(Promise.prototype, {
});
exports.ref = ref;
function ref(object) {
    if (object && typeof object.then === "function") {
        var result = defer();
    }
    return Promise({
        "when": function (rejected) {
        },
        "get": function (name) {
        },
        "put": function (name, value) {
            return object[name] = value;
        },
        "del": function (name) {
        },
        "post": function (name, value) {
        },
        "apply": function (self, args) {
        },
        "viewInfo": function () {
        },
        "keys": function () {
        }
    }, void 0, function valueOf() {
    });
}
exports.master = master;
function master(object) {
}
exports.viewInfo = viewInfo;
function viewInfo(object, info) {
    object = ref(object);
}
exports.view = view;
function view(object) {
}
exports.when = when;
function when(value, fulfilled, rejected) {
}
exports.spread = spread;
function spread(promise, fulfilled, rejected) {
}
exports.async = async;
function async(makeGenerator) {
}
exports.Method = Method;
function Method (op) {
}
exports.send = send;
function send(object, op) {
    object = ref(object);
}
exports.get = Method("get");
exports.put = Method("put");
exports.del = Method("del");
var post = exports.post = Method("post");
exports.invoke = function (value, name) {
};
var apply = exports.apply = Method("apply");
var call = exports.call = function (value, context) {
};
exports.keys = Method("keys");
exports.all = all;
function all(promises) {
    return when(promises, function (promises) {
            return ref(values);
    });
}
});
