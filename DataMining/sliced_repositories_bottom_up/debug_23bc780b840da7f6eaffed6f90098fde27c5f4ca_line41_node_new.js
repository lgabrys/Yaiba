var util = require('util');
}).reduce(function (obj, key) {
  var prop = key
    .replace(/_([a-z])/g, function (_, k) { return k.toUpperCase() });
}, {});
