var objFilter = require('./obj-filter')
// bad implications, custom checks.
module.exports = function (yargs, usage, y18n) {
  var __ = y18n.__
  var __n = y18n.__n
  var self = {}

  self.nonOptionCount = function (argv) {
    var demanded = yargs.getDemanded()
    var _s = argv._.length

    if (demanded._ && (_s < demanded._.count || _s > demanded._.max)) {
      if (demanded._.msg !== undefined) {
        usage.fail(demanded._.msg)
      } else if (_s < demanded._.count) {
        usage.fail(
          __('Not enough non-option arguments: got %s, need at least %s', argv._.length, demanded._.count)
        )
      } else {
        usage.fail(
          __('Too many non-option arguments: got %s, maximum of %s', argv._.length, demanded._.max)
        )
      }
    }
  }
  self.positionalCount = function (required, observed) {
    if (observed < required) {
      usage.fail(
        __('Not enough non-option arguments: got %s, need at least %s', observed, required)
      )
    }
  }
  self.missingArgumentValue = function (argv) {
    var defaultValues = [true, false, '']
    var options = yargs.getOptions()

    if (options.requiresArg.length > 0) {
      var missingRequiredArgs = []

      options.requiresArg.forEach(function (key) {
        var value = argv[key]

        // if a value is explicitly requested,
        // flag argument as missing if it does not
        // look like foo=bar was entered.
        if (~defaultValues.indexOf(value) ||
          (Array.isArray(value) && !value.length)) {
          missingRequiredArgs.push(key)
        }
      })

      if (missingRequiredArgs.length > 0) {
        usage.fail(__n(
          'Missing argument value: %s',
          'Missing argument values: %s',
          missingRequiredArgs.length,
          missingRequiredArgs.join(', ')
        ))
      }
    }
  }
  self.requiredArguments = function (argv) {
    var demanded = yargs.getDemanded()
    var missing = null

    Object.keys(demanded).forEach(function (key) {
      if (!argv.hasOwnProperty(key)) {
        missing = missing || {}
        missing[key] = demanded[key]
      }
    })

    if (missing) {
      var customMsgs = []
      Object.keys(missing).forEach(function (key) {
        var msg = missing[key].msg
        if (msg && customMsgs.indexOf(msg) < 0) {
          customMsgs.push(msg)
        }
      })

      var customMsg = customMsgs.length ? '\n' + customMsgs.join('\n') : ''

      usage.fail(__n(
        'Missing required argument: %s',
        'Missing required arguments: %s',
        Object.keys(missing).length,
        Object.keys(missing).join(', ') + customMsg
      ))
    }
  }
  self.unknownArguments = function (argv, aliases) {
    var aliasLookup = {}
    var descriptions = usage.getDescriptions()
    var demanded = yargs.getDemanded()
    var commandKeys = yargs.getCommandInstance().getCommands()
    var unknown = []

    Object.keys(aliases).forEach(function (key) {
      aliases[key].forEach(function (alias) {
        aliasLookup[alias] = key
      })
    })

    Object.keys(argv).forEach(function (key) {
      if (key !== '$0' && key !== '_' &&
        !descriptions.hasOwnProperty(key) &&
        !demanded.hasOwnProperty(key) &&
        !aliasLookup.hasOwnProperty(key)) {
        unknown.push(key)
      }
    })

    argv._.forEach(function (key) {
      if (!commandKeys.hasOwnProperty(key)) {
        unknown.push(key)
      }
    })

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
