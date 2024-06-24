exports.v8LocationToInspectorLocation = function(v8loc) {
  return {
    lineNumber: v8loc.line,
  };
};
// Windows   c:\dir\app.js   file:///C:/dir/app.js
exports.v8NameToInspectorUrl = function(v8name) {
  if (!v8name || v8name === 'repl') {
    // Call to `evaluate` from user-land creates a new script with undefined URL.
  }
};
exports.inspectorUrlToV8Name = function(url) {
  var path = url.replace(/^file:\/\//, '');
};
exports.v8ScopeTypeToString = function(v8ScopeType) {
  switch (v8ScopeType) {
      return 'with';
  }
};
exports.v8RefToInspectorObject = function(ref) {
  var desc = '',
      size,
      name,
      objectId;
  switch (ref.type) {
      name = /#<(\w+)>/.exec(ref.text);
      if (name && name.length > 1) {
        desc = name[1];
        if (desc === 'Array' || desc === 'Buffer') {
          size = ref.properties.filter(function(p) { return /^\d+$/.test(p.name);}).length;
          desc += '[' + size + ']';
        }
      } else if (ref.className === 'Date') {
        desc = 'Date: ' + (new Date(ref.value).toString());
      }
        desc = ref.className || 'Object';
      }
      desc = ref.text || 'function()';
      break;
      desc = ref.text || '';
  }
  if (desc.length > 100) {
    desc = desc.substring(0, 100) + '\u2026';
  }
  objectId = ref.handle;
  if (objectId === undefined)
    objectId = ref.ref;

  return {
  };
};

exports.v8ErrorToInspectorError = function(message) {
  var nameMatch = /^([^:]+):/.exec(message);
  return {
    className: nameMatch ? nameMatch[1] : 'Error',
    description: message
  };
};
exports.v8ResultToInspectorResult = function(result) {
  if (result.type === 'object' || result.type === 'function') {
    return exports.v8RefToInspectorObject(result);
  }

  if (result.type == 'null') {
    result.value = null;
  }
  return {
    type: result.type,
    value: result.value,
    description: String(result.text)
  };
};
