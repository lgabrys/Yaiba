var checkOutput = require('./helpers/utils').checkOutput
describe('yargs dsl tests', function () {
  context('function passed as second argument to parse', function () {
    describe('commands', function () {
      it('invokes command handler normally if no output is populated', function () {
        var output = null
        var r = checkOutput(function () {
            .command('batman <api-token>', 'batman command', function () {}, function (_argv) {
            })
            .parse('batman robin --what', function (_err, argv, _output) {
              output = _output
            })
        })
      })
    })
  })
})
