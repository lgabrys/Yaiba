'use strict'
const argsert = require('./argsert')
const specialKeys = ['$0', '--', '_']
// validation-type-stuff, missing params,
module.exports = function validation (yargs, usage, y18n) {
  const __ = y18n.__
  const __n = y18n.__n
  const self = {}
  // arguments were provided, i.e., '_'.
  self.nonOptionCount = function nonOptionCount (argv) {
    const demandedCommands = yargs.getDemandedCommands()
    // don't count currently executing commands
    const _s = argv._.length - yargs.getContext().commands.length

    if (demandedCommands._ && (_s < demandedCommands._.min || _s > demandedCommands._.max)) {
      if (_s < demandedCommands._.min) {
        if (demandedCommands._.minMsg !== undefined) {
          usage.fail(
            // replace $0 with observed, $1 with expected.
            demandedCommands._.minMsg ? demandedCommands._.minMsg.replace(/\$0/g, _s).replace(/\$1/, demandedCommands._.min) : null
          )
        } else {
          usage.fail(
            __('Not enough non-option arguments: got %s, need at least %s', _s, demandedCommands._.min)
          )
        }
      } else if (_s > demandedCommands._.max) {
        if (demandedCommands._.maxMsg !== undefined) {
          usage.fail(
            // replace $0 with observed, $1 with expected.
            demandedCommands._.maxMsg ? demandedCommands._.maxMsg.replace(/\$0/g, _s).replace(/\$1/, demandedCommands._.max) : null
          )
        } else {
          usage.fail(
            __('Too many non-option arguments: got %s, maximum of %s', _s, demandedCommands._.max)
          )
        }
      }
    }
  }
  self.positionalCount = function positionalCount (required, observed) {
    if (observed < required) {
      usage.fail(
        __('Not enough non-option arguments: got %s, need at least %s', observed, required)
      )
    }
  }
  self.requiredArguments = function requiredArguments (argv) {
    const demandedOptions = yargs.getDemandedOptions()
    let missing = null

    Object.keys(demandedOptions).forEach((key) => {
      if (!argv.hasOwnProperty(key) || typeof argv[key] === 'undefined') {
        missing = missing || {}
        missing[key] = demandedOptions[key]
      }
    })

    if (missing) {
      const customMsgs = []
      Object.keys(missing).forEach((key) => {
        const msg = missing[key]
        if (msg && customMsgs.indexOf(msg) < 0) {
          customMsgs.push(msg)
        }
      })

      const customMsg = customMsgs.length ? `\n${customMsgs.join('\n')}` : ''

      usage.fail(__n(
        'Missing required argument: %s',
        'Missing required arguments: %s',
        Object.keys(missing).length,
        Object.keys(missing).join(', ') + customMsg
      ))
    }
  }
  self.unknownArguments = function unknownArguments (argv, aliases, positionalMap) {
    const commandKeys = yargs.getCommandInstance().getCommands()
    const unknown = []
    const currentContext = yargs.getContext()

    Object.keys(argv).forEach((key) => {
      if (specialKeys.indexOf(key) === -1 &&
        !positionalMap.hasOwnProperty(key) &&
        !yargs._getParseContext().hasOwnProperty(key) &&
        !aliases.hasOwnProperty(key)
      ) {
        unknown.push(key)
      }
    })

    if (commandKeys.length > 0) {
      argv._.slice(currentContext.commands.length).forEach((key) => {
        if (commandKeys.indexOf(key) === -1) {
          unknown.push(key)
        }
      })
    }

    if (unknown.length > 0) {
      usage.fail(__n(
        'Unknown argument: %s',
        'Unknown arguments: %s',
        unknown.length,
        unknown.join(', ')
      ))
    }
  }
}
