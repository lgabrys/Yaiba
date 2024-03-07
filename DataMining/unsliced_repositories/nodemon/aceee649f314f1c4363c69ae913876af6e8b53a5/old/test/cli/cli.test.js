/*global describe:true, it: true */
var cli = require('../../lib/cli/'),
    pkg = require('../../package'),
    assert = require('assert'),
    fs = require('fs'),
    cwd = process.cwd();

function asCLI(cmd) {
  return ('node nodemon ' + cmd).trim();
}

describe('nodemon CLI parser', function () {
  it('should support stand alone `nodemon` command', function () {
    var settings = cli.parse(asCLI(''));

    assert(settings.userScript === pkg.main);
  });

  it('should parse `nodemon lib/index.js`', function () {
    var settings = cli.parse(asCLI('lib/index.js'));

    assert(settings.userScript === 'lib/index.js');
  });

  it('should parse `nodemon test/fixtures/app.coffee`', function () {
    var settings = cli.parse(asCLI('test/fixtures/app.coffee'));

    assert(settings.userScript === 'test/fixtures/app.coffee');
    assert(settings.execOptions.exec === 'coffee');
  });

  it('should parse `nodemon --watch src/ -e js,coffee test/fixtures/app.js`', function () {
    var settings = cli.parse(asCLI('--watch src/ -e js,coffee test/fixtures/app.js'));

    assert(settings.userScript === 'test/fixtures/app.js');
    assert(settings.execOptions.exec === 'node');
  });

  it('should pass --debug to node', function () {
    var settings = cli.parse(asCLI('--debug test/fixtures/app.js'));

    assert(settings.userScript === 'test/fixtures/app.js');
    assert(settings.execOptions.exec === 'node');
    assert(settings.nodeArgs[0] === '--debug');
  });


});