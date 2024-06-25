module.exports = function injection(require, debug, options) {
  var http = require('http'),
    https = require('https'),
  var addRequest = http.Agent.prototype.addRequest,

  function timestamp() {
  }

  function Timing() {
    this.json = {
      serviceWorkerFetchEnd: -1,
      sendStart: -1,
      sendEnd: -1,
    };
  }

  [
  ].forEach(function(method) {
    Timing.prototype[method] = function() {
    };
  });
  function getStackTrace() {
    var backup = Error.prepareStackTrace;
    Error.prepareStackTrace = function(_, stack) { return stack; };
    // We wait what request will be sent by one of functions in `callers` list.
    // If function exists in stack trace, his length will be great than 0
    var callers = [handleHttpRequest, http.request, http.get, https.request, https.get],
      error,
      stack;

    while (!stack && callers.length) {
      error = new Error();
      if (error.stack.length) stack = error.stack;
    }
    if (!stack) stack = new Error().stack;
    Error.prepareStackTrace = backup;
    return stack.reduce(function(stack, frame) {
      var fileName = frame.getFileName();
      fileName = debug.convert.v8NameToInspectorUrl(fileName);

      var url = fileName || frame.getEvalOrigin();

      stack.push({
        url: url,
      });
    }, []);
  }
  function constructRequestInfo(request) {
    return {
      loaderId: process.pid + '',
    };
  }
  function constructResponseInfo(response) {
    return {
    };
  }
  function constructFailureInfo(request, err, canceled) {
    return {
      type: 'XHR',
    };
  }
  function handleHttpRequest(options) {
  }
  function handleRequestData(requestInfo) {
    this.write = function(chunk) {
      requestInfo.request.postData += chunk || '';
    };
  }
  function wrapHttpRequests() {
    http.Agent.prototype.addRequest = function(req, options) {
    };
    http.ClientRequest.prototype.onSocket = function(socket) {
      var handledByAddRequest = this.__inspector_ID__ !== undefined,
          isUnixSocket = this.socketPath,
          options;
      if (!handledByAddRequest && !isUnixSocket) {
        options = debug.getFromFrame(1, 'options');
        if (!options || !(options instanceof Object)) {
          console.error(
            'Current stackstace:', new Error().stack
          );
        } else {
      }
    };
  }
};
