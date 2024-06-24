var checkOutput = require('./helpers/utils').checkOutput
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
      it('allows nested sub-commands to be invoked multiple times', function () {
        var context = {counter: 0}
        checkOutput(function () {
          var parser = yargs()
          parser.parse('dream within-a-dream --what', {context: context}, function (_err, argv, _output) {})
          parser.parse('dream within-a-dream --what', {context: context}, function (_err, argv, _output) {})
        })
      })
    })
  })
})
