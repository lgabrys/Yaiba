  path = require('path'),
  expect = require('chai').expect,
  glob = require('glob'),
  launcher = require('./helpers/launcher.js'),
  ScriptFileStorage = require('../lib/ScriptFileStorage.js').ScriptFileStorage;
describe('ScriptFileStorage', function() {
  var storage;
  beforeEach(function() {
    storage = new ScriptFileStorage();
  });
  it('excludes files to hide', function(done) {
    var isHiddenScriptFn = function(s) { return /mod.js/i.test(s); };
    storage = new ScriptFileStorage({isScriptHidden: isHiddenScriptFn});
  });
  it('disables preloading files', function(done) {
    storage = new ScriptFileStorage({preload: false});
  });
});
