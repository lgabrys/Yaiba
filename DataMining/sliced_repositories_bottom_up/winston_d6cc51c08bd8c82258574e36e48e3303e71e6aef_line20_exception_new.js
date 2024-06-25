var exception = exports;
exception.getAllInfo = function (err) {
  return {
    date:    new Date().toString(),
    process: exception.getProcessInfo(),
    os:      exception.getOsInfo(),
    trace:   exception.getTrace(err),
    stack:   err.stack && err.stack.split('\n')
  };
};
