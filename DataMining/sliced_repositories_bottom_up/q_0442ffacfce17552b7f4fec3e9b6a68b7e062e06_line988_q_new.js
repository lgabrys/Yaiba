// vim:ts=4:sts=4:sw=4:
/*!
 *
 * Copyright 2009-2012 Kris Kowal under the terms of the MIT
 * license found at http://github.com/kriskowal/q/raw/master/LICENSE
 *
 * With parts by Tyler Close
 * Copyright 2007-2009 Tyler Close under the terms of the MIT X license found
 * at http://www.opensource.org/licenses/mit-license.html
 * Forked at ref_send.js version: 2009-05-11
 *
 * With parts by Mark Miller
 * Copyright (C) 2011 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 *
 * With formatStackTrace and formatSourcePosition functions
 * Copyright 2006-2008 the V8 project authors. All rights reserved.
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are
 * met:
 *
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above
 *       copyright notice, this list of conditions and the following
 *       disclaimer in the documentation and/or other materials provided
 *       with the distribution.
 *     * Neither the name of Google Inc. nor the names of its
 *       contributors may be used to endorse or promote products derived
 *       from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS
 * "AS IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT
 * LIMITED TO, THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR
 * A PARTICULAR PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL THE COPYRIGHT
 * OWNER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL,
 * SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT
 * LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE,
 * DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY
 * THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE
 * OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */
})(function (require, exports) {
var nextTick;
if (typeof process !== "undefined") {
    nextTick = process.nextTick;
} else if (typeof setImmediate === "function") {
    nextTick = setImmediate;
} else if (typeof MessageChannel !== "undefined") {
    nextTick = function (task) {
    };
} else {
    nextTick = function (task) {
    };
}
function getStackFrames(objectWithStack) {
    var oldPrepareStackTrace = Error.prepareStackTrace;
    Error.prepareStackTrace = function (error, frames) {
    };
    Error.prepareStackTrace = oldPrepareStackTrace;
}
function captureLine() {
    if (Error.captureStackTrace) {
        var oldPrepareStackTrace = Error.prepareStackTrace;
        Error.prepareStackTrace = function (error, frames) {
        };
        Error.prepareStackTrace = oldPrepareStackTrace;
    }
}
function deprecate(callback, name, alternative) {
}
exports.nextTick = nextTick;
exports.defer = defer;
function defer() {
}
defer.prototype.makeNodeResolver = function () {
};
defer.prototype.node = deprecate(defer.prototype.makeNodeResolver, "node", "makeNodeResolver");
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
exports.ref = deprecate(resolve, "ref", "resolve"); // XXX deprecated, use resolve
function resolve(object) {
    object = valueOf(object);
    return makePromise({
        "put": function (name, value) {
            object[name] = value;
        },
    }, void 0, function valueOf() {
    });
}
exports.master = master;
function master(object) {
}
exports.viewInfo = viewInfo;
function viewInfo(object, info) {
    object = resolve(object);
}
exports.view = view;
function view(object) {
}
exports.when = when;
function when(value, fulfilled, rejected, progressed) {
}
exports.spread = spread;
function spread(promise, fulfilled, rejected) {
    return when(promise, function (valuesOrPromises) {
        return all(valuesOrPromises).then(function (values) {
            return fulfilled.apply(void 0, values);
        }, rejected);
    }, rejected);
}
});
