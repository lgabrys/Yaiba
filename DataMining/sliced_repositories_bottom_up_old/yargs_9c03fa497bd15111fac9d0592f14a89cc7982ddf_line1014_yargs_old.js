var yargs
describe('yargs dsl tests', function () {
  beforeEach(function () {
    yargs = require('../')
  })
  describe('locale', function () {
    function loadLocale (locale) {
      yargs = require('../')
    }
    it('handles os-locale throwing an exception', function () {
      yargs = require('../')
    })
  })
  context('function passed as second argument to parse', function () {
    describe('commands', function () {
      it('overwrites the prior context object, when parse is called multiple times', function () {
        var argv = null
        var parser = yargs()
        parser.parse('batman robin --what', {
        }, function (_err, _argv, _output) {
          argv = _argv
        })
        argv.state.should.equal('the hero we need')
      })
    })
  })
})
