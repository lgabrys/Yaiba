// this file handles outputting usage instructions,
const stringWidth = require('string-width')
const setBlocking = require('set-blocking')
const YError = require('./yerror')
module.exports = function (yargs, y18n) {
  const __ = y18n.__
  const self = {}
  var fails = []
  self.failFn = function (f) {
    fails.push(f)
  }
  var failMessage = null
  var showHelpOnFail = true
  self.showHelpOnFail = function (enabled, message) {
    if (typeof enabled === 'string') {
      message = enabled
      enabled = true
    } else if (typeof enabled === 'undefined') {
      enabled = true
    }
    failMessage = message
    showHelpOnFail = enabled
    return self
  }
  var failureOutput = false
  self.fail = function (msg, err) {
    const logger = yargs._getLoggerInstance()

    if (fails.length) {
      for (var i = fails.length - 1; i >= 0; --i) {
        fails[i](msg, err, self)
      }
    } else {
      if (yargs.getExitProcess()) setBlocking(true)

      // don't output failure message more than once
      if (!failureOutput) {
        failureOutput = true
        if (showHelpOnFail) yargs.showHelp('error')
        if (msg) logger.error(msg)
        if (failMessage) {
          if (msg) logger.error('')
          logger.error(failMessage)
        }
      }

      err = err || new YError(msg)
      if (yargs.getExitProcess()) {
        return yargs.exit(1)
      } else if (yargs._hasParseCallback()) {
        return yargs.exit(1, err)
      } else {
        throw err
      }
    }
  }
  var usage
  self.usage = function (msg) {
    usage = msg
  }
  self.getUsage = function () {
    return usage
  }
  var examples = []
  self.example = function (cmd, description) {
    examples.push([cmd, description || ''])
  }
  var commands = []
  self.command = function (cmd, description, isDefault, aliases) {
    // the last default wins, so cancel out any previously set default
    if (isDefault) {
      commands = commands.map(function (cmdArray) {
        cmdArray[2] = false
        return cmdArray
      })
    }
    commands.push([cmd, description || '', isDefault, aliases])
  }
  self.getCommands = function () {
    return commands
  }
  var descriptions = {}
  self.describe = function (key, desc) {
    if (typeof key === 'object') {
      Object.keys(key).forEach(function (k) {
        self.describe(k, key[k])
      })
    } else {
      descriptions[key] = desc
    }
  }
  self.getDescriptions = function () {
    return descriptions
  }
  var epilog
  self.epilog = function (msg) {
    epilog = msg
  }
  var wrapSet = false
  var wrap
  self.wrap = function (cols) {
    wrapSet = true
    wrap = cols
  }
  function getWrap () {
    if (!wrapSet) {
      wrap = windowWidth()
      wrapSet = true
    }
  }
  var deferY18nLookupPrefix = '__yargsString__:'
  self.deferY18nLookup = function (str) {
    return deferY18nLookupPrefix + str
  }
  var defaultGroup = 'Options:'
  self.help = function () {
    normalizeAliases()

    // handle old demanded API
    var demandedOptions = yargs.getDemandedOptions()
    var demandedCommands = yargs.getDemandedCommands()
    var groups = yargs.getGroups()
    var options = yargs.getOptions()
    var keys = Object.keys(
      Object.keys(descriptions)
      .concat(Object.keys(demandedOptions))
      .concat(Object.keys(demandedCommands))
      .concat(Object.keys(options.default))
      .reduce(function (acc, key) {
        if (key !== '_') acc[key] = true
        return acc
      }, {})
    )

    var theWrap = getWrap()
    var ui = require('cliui')({
      width: theWrap,
      wrap: !!theWrap
    })

    // the usage string.
    if (usage) {
      var u = usage.replace(/\$0/g, yargs.$0)
      ui.div(u + '\n')
    }

    // your application's commands, i.e., non-option
    // arguments populated in '_'.
    if (commands.length) {
      ui.div(__('Commands:'))

      commands.forEach(function (command) {
        ui.span(
          {text: command[0], padding: [0, 2, 0, 2], width: maxWidth(commands, theWrap) + 4},
          {text: command[1]}
        )
        var hints = []
        if (command[2]) hints.push('[' + __('default:').slice(0, -1) + ']') // TODO hacking around i18n here
        if (command[3] && command[3].length) {
          hints.push('[' + __('aliases:') + ' ' + command[3].join(', ') + ']')
        }
        if (hints.length) {
          ui.div({text: hints.join(' '), padding: [0, 0, 0, 2], align: 'right'})
        } else {
          ui.div()
        }
      })

      ui.div()
    }

    // perform some cleanup on the keys array, making it
    // only include top-level keys not their aliases.
    var aliasKeys = (Object.keys(options.alias) || [])
      .concat(Object.keys(yargs.parsed.newAliases) || [])

    keys = keys.filter(function (key) {
      return !yargs.parsed.newAliases[key] && aliasKeys.every(function (alias) {
        return (options.alias[alias] || []).indexOf(key) === -1
      })
    })

    // populate 'Options:' group with any keys that have not
    // explicitly had a group set.
    if (!groups[defaultGroup]) groups[defaultGroup] = []
    addUngroupedKeys(keys, options.alias, groups)

    // display 'Options:' table along with any custom tables:
    Object.keys(groups).forEach(function (groupName) {
      if (!groups[groupName].length) return

      ui.div(__(groupName))

      // if we've grouped the key 'f', but 'f' aliases 'foobar',
      // normalizedKeys should contain only 'foobar'.
      var normalizedKeys = groups[groupName].map(function (key) {
        if (~aliasKeys.indexOf(key)) return key
        for (var i = 0, aliasKey; (aliasKey = aliasKeys[i]) !== undefined; i++) {
          if (~(options.alias[aliasKey] || []).indexOf(key)) return aliasKey
        }
        return key
      })

      // actually generate the switches string --foo, -f, --bar.
      var switches = normalizedKeys.reduce(function (acc, key) {
        acc[key] = [ key ].concat(options.alias[key] || [])
          .map(function (sw) {
            return (sw.length > 1 ? '--' : '-') + sw
          })
          .join(', ')

        return acc
      }, {})

      normalizedKeys.forEach(function (key) {
        var kswitch = switches[key]
        var desc = descriptions[key] || ''
        var type = null

        if (~desc.lastIndexOf(deferY18nLookupPrefix)) desc = __(desc.substring(deferY18nLookupPrefix.length))

        if (~options.boolean.indexOf(key)) type = '[' + __('boolean') + ']'
        if (~options.count.indexOf(key)) type = '[' + __('count') + ']'
        if (~options.string.indexOf(key)) type = '[' + __('string') + ']'
        if (~options.normalize.indexOf(key)) type = '[' + __('string') + ']'
        if (~options.array.indexOf(key)) type = '[' + __('array') + ']'
        if (~options.number.indexOf(key)) type = '[' + __('number') + ']'

        var extra = [
          type,
          (key in demandedOptions) ? '[' + __('required') + ']' : null,
          options.choices && options.choices[key] ? '[' + __('choices:') + ' ' +
            self.stringifiedValues(options.choices[key]) + ']' : null,
          defaultString(options.default[key], options.defaultDescription[key])
        ].filter(Boolean).join(' ')

        ui.span(
          {text: kswitch, padding: [0, 2, 0, 2], width: maxWidth(switches, theWrap) + 4},
          desc
        )

        if (extra) ui.div({text: extra, padding: [0, 0, 0, 2], align: 'right'})
        else ui.div()
      })

      ui.div()
    })

    // describe some common use-cases for your application.
    if (examples.length) {
      ui.div(__('Examples:'))

      examples.forEach(function (example) {
        example[0] = example[0].replace(/\$0/g, yargs.$0)
      })

      examples.forEach(function (example) {
        if (example[1] === '') {
          ui.div(
            {
              text: example[0],
              padding: [0, 2, 0, 2]
            }
          )
        } else {
          ui.div(
            {
              text: example[0],
              padding: [0, 2, 0, 2],
              width: maxWidth(examples, theWrap) + 4
            }, {
              text: example[1]
            }
          )
        }
      })

      ui.div()
    }

    // the usage string.
    if (epilog) {
      var e = epilog.replace(/\$0/g, yargs.$0)
      ui.div(e + '\n')
    }

    return ui.toString()
  }
  function maxWidth (table, theWrap) {
    if (!Array.isArray(table)) {
      table = Object.keys(table).map(function (key) {
      })
    }
  }
  function normalizeAliases () {
  }
  function addUngroupedKeys (keys, aliases, groups) {
  }
  self.showHelp = function (level) {
    const logger = yargs._getLoggerInstance()
    if (!level) level = 'error'
    var emit = typeof level === 'function' ? level : logger[level]
    emit(self.help())
  }
  self.functionDescription = function (fn) {
    var description = fn.name ? require('decamelize')(fn.name, '-') : __('generated-value')
    return ['(', description, ')'].join('')
  }
  self.stringifiedValues = function (values, separator) {
    var string = ''
    var sep = separator || ', '
    var array = [].concat(values)

    if (!values || !array.length) return string

    array.forEach(function (value) {
      if (string.length) string += sep
      string += JSON.stringify(value)
    })

    return string
  }
  function defaultString (value, defaultDescription) {
    var string = '[' + __('default:') + ' '
    if (defaultDescription) {
      string += defaultDescription
    } else {
      switch (typeof value) {
          string += '"' + value + '"'
      }
    }
  }
}
