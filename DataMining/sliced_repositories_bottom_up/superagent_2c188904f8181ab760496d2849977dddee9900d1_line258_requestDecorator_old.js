function setMethods(request) {
  request.get = request.header = function header(name) {
  };
  request.accepts = function () {
  };
  request.acceptsEncodings = function () {
  };
  request.acceptsCharsets = function () {
  };
  request.acceptsLanguages = function () {
  };
  request.range = function range(size, options) {
  };

  request.is = function is(types) {
    let array = types;
    if (!Array.isArray(types)) {
      array = new Array(arguments.length);
    }
  };
}
