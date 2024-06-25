})(function (serverSideRequire, exports) {
var nextTick;
try {
    nextTick = serverSideRequire("event-queue").enqueue;
} catch (e) {
    if (typeof MessageChannel !== "undefined") {
        var channel = new MessageChannel();
        channel.port1.onmessage = function () {
        };
        nextTick = function (task) {
            channel.port2.postMessage();
        };
    } else {
}
});
