  var debug = null,
      sourceIDs = {},
  function breakEvent(obj) {
    if(!sourceIDs[obj.body.script.id]) {
      var args = { arguments: { includeSource: true, types: 4, ids: [obj.script.id] }};
      debug.request('scripts', args, parsedScripts);
    }
  }
