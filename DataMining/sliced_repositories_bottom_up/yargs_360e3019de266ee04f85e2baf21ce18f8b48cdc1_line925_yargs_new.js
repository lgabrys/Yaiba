var checkOutput = require('./helpers/utils').checkOutput
describe('yargs dsl tests', function () {
  context('function passed as second argument to parse', function () {
    describe('commands', function () {
      it('does not invoke command handler if output is populated', function () {
        var err = null
        var r = checkOutput(function () {
            .command('batman <api-token>', 'batman command', function () {}, function () {
            })
            .parse('batman --what', function (_err, argv, output) {
              err = _err
            })
        })
      })
    })
  })
})
